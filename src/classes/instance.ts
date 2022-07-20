import { InstanceConfig, InstanceMeta, InstanceType, InstanceStatus, InstancePowerState } from "../types/configs/instance"
import { Client, HTTP, UNIX } from ".."
import { TypedEmitter } from "tiny-typed-emitter";
import { BackupEvents, InstanceIP } from "../types/types";
import { ExecEmitter } from "./exec";
import { InstanceUsage } from "../types/responses/instance/usage";
import { parseBytes } from "../util/bytesparser";
import { RawData } from "ws";
import { Backup } from "./backup";
export class Instance {
    private client: UNIX | HTTP;
    meta: InstanceMeta;
    private root: Client;
    constructor(root: Client, client: UNIX | HTTP, data: InstanceMeta) {
        this.client = client;
        this.meta = data;
        this.root = root;
    }
    /**
     * Get instance name
     */
    name(): string {
        return this.meta.name
    }
    /**
     * Get instance config
     */
    fetchConfig(): InstanceConfig {
        return this.meta.config;
    }
    /**
     * Get instance profiles
     */
    fetchProfiles(): string[] {
        return this.meta.profiles
    }
    /**
     * Get instance type
     */
    fetchType(): InstanceType {
        return this.meta.type;
    }
    /**
     * Get instance type
     */
    fetchStatus(): InstanceStatus {
        return this.meta.status;
    }
    fetchLogs(name?: string): Promise<string> {
        if (!name) name = 'lxc.log';
        return new Promise((resolve,reject) => {
            this.client.get("/1.0/instances/"+  this.name() + "/logs/" + name).then(data => {
                
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    }
    listLogs(): Promise<string[]> {
        return new Promise((resolve,reject) => {
            this.client.get("/1.0/instances/"+  this.name() + "/logs").then(data => {
                
                var response = JSON.parse(data)
                resolve(response.metadata.map((str: string) => {
                    return (str.split('/')[str.split('/').length - 1])
                }))
            }).catch(error => {
                reject(error)
            })
        })
    }
    createBackup(name: string, options?: {
        compression_algorithm?: string,
        container_only?: boolean,
        expires_at?: string,
        instance_only?: boolean,
        name?: string,
        optimized_storage?: boolean
      }): Promise<TypedEmitter<BackupEvents>> {
        return new Promise((resolve,reject) => {
            this.client.post('/1.0/instances/'+this.meta.name+'/backups', {
                "compression_algorithm": "gzip",
                "container_only": false,
                "instance_only": false,
                "name": name,
                "optimized_storage": true
              }).then(data => {
                              
            var res = JSON.parse(data)
            if (res.type == "error") {
                return reject(res.error)
            }
            var waiter = new TypedEmitter<BackupEvents>()
            var events = this.root.connectEvents("operation")
            var operationID = res.metadata.id
            var self = this
            var backup_done = false;
            async function listener(d: RawData) {
                var data = JSON.parse(d.toString())
                if (data.metadata.id == operationID) {
                    console.log(data)
                    if (data.metadata.status == "Failure") {
                        waiter.emit("error", new Error(data.metadata.err))
                        events.removeAllListeners()
                        events.close()
                    }
                    if (data.metadata.status == "Success") {
                        backup_done = true;
                        console.log(data.metadata.resources.backups[0].replace('/1.0/', '/1.0/instances/hah1s/'))
                        var backup = await self.client.get(data.metadata.resources.backups[0].replace('/1.0/', '/1.0/instances/hah1s/'))
                        
                        var s = new Backup(self.client, self, JSON.parse(backup).metadata)
                        waiter.emit("finished", s)
                        events.removeAllListeners()
                        events.close()
                    }
                    console.log(JSON.stringify(data))
                    if (!data.metadata.metadata) return;
                    if (data.metadata.metadata.create_backup_progress  && backup_done == false) {
                        var done = data.metadata.metadata.create_backup_progress.match(/(.*)B /)[0].replace(' ','')
                        var speed = data.metadata.metadata.create_backup_progress.match(/B ((.*))/)[1].replace('(','').replace(')','')
                        waiter.emit("progress", {speed,done})
                    }
                }
            }
            events.on('message', listener)
            resolve(waiter)
              }).catch(error => {
                reject(error)
            })

        })
    }
    fetchIP(version?: "v4"|"v6", interfaceName?: string): Promise<InstanceIP> {
        return new Promise((resolve,reject) => {
            if (!version) version = "v4";
            if (!interfaceName) interfaceName = "eth0"
            this.client.get('/1.0/instances/' + this.meta.name + "/state").then(async data => {
                
              var response = JSON.parse(data);
              if (version == "v4") {
                var int: {
                    addresses: []
                } = response.metadata.network[interfaceName]
                var ip = int.addresses.find((address: any) => {
                    
                    return (address.scope == "global" && address.family == "inet")
                })
                resolve(ip)
              }
              if (version == "v6") {
                var int: {
                    addresses: []
                } = response.metadata.network[interfaceName]
                var ip = int.addresses.find((address: any) => {
                    
                    return (address.scope == "global" && address.family == "inet6")
                })
                resolve(ip)
              }
            }).catch(error => {
                reject(error)
            })
        })

    }
    fetchUsage(): Promise<InstanceUsage> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/instances/' + this.meta.name + "/state").then(async data => {
                var system_data = await this.root.fetchResources()

                
                var response = JSON.parse(data);
                var cpu_ns: number = response.metadata.cpu.usage;
                var memory_used = response.metadata.memory.usage;
                var memory_total = this.meta.config["limits.memory"] ? parseBytes(this.meta.config["limits.memory"]) : system_data.metadata.memory.total
                var interface_keys = Object.keys(response.metadata.network)
                var s = this.meta.config["limits.cpu"]
                var cpuCount = s ? parseFloat(s) : system_data.metadata.cpu.total; // thats probs why i did / 2
                console.log(cpuCount)
                if (this.root.caluclateUsingHyperthreading == false) var thread_multiplier = 1;
                if (this.root.caluclateUsingHyperthreading == true) var thread_multiplier = 2;

                var multiplier = (100000 / cpuCount) * thread_multiplier
                var startTime = Date.now()
                
                var u = JSON.parse(await this.client.get("/1.0/instances/" + this.meta.name + "/state"))
                console.log(u)
                var usage1 = u.metadata.cpu.usage / 1000000000
                
                var usage2 = (JSON.parse(await this.client.get("/1.0/instances/" + this.meta.name + "/state")).metadata.cpu.usage / 1000000000)
                var cpu_usage = ((usage2 - usage1) / (Date.now() - startTime)) * multiplier
                if (cpu_usage > 100) {
                    cpu_usage = 100;
                }
                var interface_usage = {}
                interface_keys.map(name => {
                    var interface_data: {
                        counters: {
                            bytes_received: any,
                            bytes_sent: any,
                            packets_received: any,
                            packets_sent: any,
                        }
                    } = response.metadata.network[name];
                    //@ts-expect-error
                    interface_usage[name] = {
                        received: interface_data.counters.bytes_received,
                        sent: interface_data.counters.bytes_sent,
                        packets_sent: interface_data.counters.packets_sent,
                        packets_received: interface_data.counters.packets_received
                    }
                })
                resolve({
                    state: response.metadata.status,
                    pid: response.metadata.pid,
                    processes: response.metadata.pid,
                    cpu: {
                        ns: cpu_ns,
                        percent: cpu_usage
                    },
                    memory: {
                        percent_used: (memory_used / memory_total) * 100,
                        percent_free: 100 - ((memory_used / memory_total) * 100),
                        free: memory_total - memory_used,
                        total: memory_total,
                        used: memory_used
                    },
                    network: interface_usage,
                    disk: u.metadata.disk
                })
            }).catch(error => {
                reject(error)
            })
        })
    }
    /**
     * Set instance status
     */
    setStatus(status: InstancePowerState, force?: boolean, timeout?: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.put('/1.0/instances/' + this.meta.name + "/state", {}).then(data => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
    updateConfig(config: InstanceConfig): Promise<Instance> {
        return new Promise((resolve, reject) => {
            this.client.patch("/1.0/instances/" + this.meta.name, { config: config }).then(data => {
                this.client.get("/1.0/instances/" + this.meta.name).then(ins => {
                    
                    resolve(new Instance(this.root, this.client, JSON.parse(ins).metadata))
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        })
    }
    updateName(name: string): Promise<Instance> {
        return new Promise((resolve, reject) => {
            this.client.post("/1.0/instances/" + this.meta.name, { name: name }).then(data => {
                this.client.get("/1.0/instances/" + name).then(ins => {
                    console.log(ins)
                    
                    resolve(new Instance(this.root, this.client, JSON.parse(ins).metadata))
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        })
    }
    exec(command: string[], options?: { cwd?: string, env?: {}, user?: number, height?: number, width?: number }): Promise<ExecEmitter> {
        return new Promise((resolve, reject) => {
            if (!command) return reject(new Error('Command not specified'));
            if (!options) options = {};
            this.client.post("/1.0/instances/" + this.meta.name + "/exec", {
                "command": command,
                "cwd": options.cwd ? options.cwd : "/",
                "environment": options.env ? options.env : {},
                "height": options.height ? options.height : 0,
                "interactive": true,
                "user": options.user ? options.user : 0,
                "wait-for-websocket": true,
                "width": options.width ? options.width : 0
            }).then(data => {
                
                var response = JSON.parse(data);
                var consolePath = response.operation + "/websocket?secret=" + response.metadata.metadata.fds["0"];
                var controlPath = response.operation + "/websocket?secret=" + response.metadata.metadata.fds["control"];
                try {
                    var consoleWS = this.client.websocket(consolePath);
                    var controlWS = this.client.websocket(controlPath)
                } catch (error) {
                    reject(new Error('Failed to connect to Control and/or Console websocket'))
                }
                var exec = new ExecEmitter(controlWS, consoleWS, response)
                resolve(exec)
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchBackup(name: string): Promise<Backup> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/instances/' + this.name() + "/backups/" + name).then(data => {
                console.log(data)
                
                var response = JSON.parse(data)
                if (response.status_code != 200) reject(new Error(response.error))
               resolve(new Backup(this.client, this, response.metadata))
            }).catch(error => {
                reject(error)
            })
        })
    }
}