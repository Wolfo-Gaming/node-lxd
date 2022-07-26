import Network from './classes/network';
import { TypedEmitter } from 'tiny-typed-emitter';
import { RawData, WebSocket } from 'ws';
import { HTTP } from './classes/http';
import { Instance } from './classes/instance';
import { UNIX } from './classes/unix';
import { InstanceConfig } from './types/configs/instance';
import { CreateEvents } from './types/types';
import { Resources } from './types/types';
import { StoragePool } from './classes/storage-pool';
import { OperationMetaData } from './types/responses/operation/operation';
import { ProfileMetadata } from './types/responses/profile/metadata';
import { ProjectMetadata } from './types/responses/project/metadata';
import { ProjectState } from './types/responses/project/state';
import { Backup } from './classes/backup';
import Image from './classes/image'
class Client {
    private client: HTTP | UNIX;
    url: string;
    caluclateUsingHyperthreading: boolean;
    options: { type: "http" | "unix", rejectUnauthorized?: boolean, cert?: Buffer, key?: Buffer, caluclateUsingHyperthreading?: boolean };
    constructor(url: string, options: { type: "http" | "unix", rejectUnauthorized?: boolean, cert?: Buffer, key?: Buffer, caluclateUsingHyperthreading?: boolean }) {
        if (!options.caluclateUsingHyperthreading || options.caluclateUsingHyperthreading == true) {
            this.caluclateUsingHyperthreading = true
        } else if (options.caluclateUsingHyperthreading == false) {
            this.caluclateUsingHyperthreading = false;
        }
        this.options = options;
        this.url = url;
        if (options.type == "http") {
            if (!options.cert) throw new Error('Certificate not specified');
            if (!options.key) throw new Error('Key not specified');
            if (!options.rejectUnauthorized) options.rejectUnauthorized = false;
            this.client = new HTTP(url, {
                cert: options.cert,
                key: options.key,
                rejectUnauthorized: false
            })

        } else if (options.type == "unix") {
            if (url == null) url = UNIX.DEFAULT_SOCKET;
            this.client = new UNIX(url)
        } else {
            throw new Error('Connection type not specified')
        }
    }
    /**
     * Fetches LXD resource stats
     */
    fetchResources(): Promise<Resources> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/resources', {}).then((data) => {

                resolve(JSON.parse(data))
            }).catch(error => {
                reject(error)
            })
        })
    }
    connectEvents(type?: "operation" | "logging" | "lifecycle"): WebSocket {
        if (!type) {
            return this.client.websocket('/1.0/events')
        } else {
            return this.client.websocket('/1.0/events?type=' + type)
        }
    }
    fetchInstance(name: string): Promise<Instance> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/instances/' + name + "?recursion=1").then(data => {

                resolve(new Instance(this, this.client, JSON.parse(data).metadata))
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchInstances(): Promise<Instance[]> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/instances?recursion=2').then((data) => {

                var res = JSON.parse(data)
                var arr = res.metadata;
                var result = []
                for (const inst of arr) {
                    result.push(new Instance(this, this.client, inst))
                }
                resolve(result)
            })
        })
    }
    createInstance(name: string, options: {
        config?: InstanceConfig,
        image: string,
        raw?: any,
        description?: string,
        profiles?: ["default" | string],
        imageServer?: {
            url: string,
            protocol: string
        },
        type: string
    }): Promise<TypedEmitter<CreateEvents>> {
        return new Promise(async (resolve, reject) => {

            try {
                var response = await this.client.post('/1.0/instances', {
                    name: name,
                    config: options.config ? options.config : {},
                    description: options.description ? options.description : "",
                    source: {
                        type: "image",
                        alias: options.image,
                        "server": options.imageServer.url ? options.imageServer.url : "https://images.linuxcontainers.org/",
                        "protocol": options.imageServer.protocol ? options.imageServer.protocol : "simplestreams"
                    },
                    type: options.type ? options.type : "container",
                    ...options.raw
                })
                //console.log(response)

                var res = JSON.parse(response)
                if (res.type == "error") {
                    return reject(res.error)
                }
                var waiter = new TypedEmitter<CreateEvents>()
                var events = this.connectEvents("operation")
                var operationID = res.metadata.id
                var self = this
                async function listener(d: RawData) {
                    var data = JSON.parse(d.toString())
                    if (data.metadata.id == operationID) {
                        if (data.metadata.status == "Failure") {
                            waiter.emit("error", new Error(data.metadata.err))
                            events.removeAllListeners()
                            events.close()
                        }
                        if (data.metadata.status == "Success") {
                            waiter.emit("finished", await self.fetchInstance(name))
                            events.removeAllListeners()
                            events.close()
                        }
                        if (!data.metadata.metadata) return;
                        if (data.metadata.metadata.download_progress) {
                            var s = data.metadata.metadata.download_progress.match(/: (.*)%/)
                            waiter.emit("progress", s[1])
                        }
                    }
                }
                events.on('message', listener)
            } catch (error) {
                return reject(error)
            }
            if (res.type == "error") {
                return reject(res.data)
            }
            //
            return resolve(waiter)
        })
    }
    fetchOperations(): Promise<OperationMetaData[]> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/operations?recursion=1').then((data) => {
                resolve(JSON.parse(data).metadata.running)
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchOperation(id: string): Promise<OperationMetaData> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/operations/' + id).then((data) => {
                resolve(JSON.parse(data).metadata)
            }).catch(error => {
                reject(error)
            })
        })
    }
    waitForOperation(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/operations/' + id + "/wait").then((data) => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
    cancelOperation(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.delete('/1.0/operations/' + id).then((data) => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchNetwork(name: string): Promise<Network> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/networks/' + name).then((data) => {
                resolve(new Network(this, this.client, JSON.parse(data).metadata))
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchNetworks(): Promise<Network[]> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/networks?recursion=1').then((data) => {
                var res = JSON.parse(data)
                var arr = res.metadata;
                var result = []
                for (const net of arr) {
                    result.push(new Network(this, this.client, net))
                }
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    }
    deleteNetwork(name: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.delete('/1.0/networks/' + name).then((data) => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchProfile(name: string): Promise<ProfileMetadata> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/profiles/' + name).then((data) => {
                resolve(JSON.parse(data).metadata)
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchProfiles(): Promise<ProfileMetadata[]> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/profiles?recursion=1').then((data) => {
                var res = JSON.parse(data)
                var arr = res.metadata;
                var result = []
                for (const prof of arr) {
                    result.push(prof)
                }
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    }
    updateProfile(name: string, config: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.patch('/1.0/profiles/' + name, config).then((data) => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
    renameProfile(name: string, newName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.post('/1.0/profiles/' + name, { name: newName }).then((data) => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
    deleteProfile(name: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.delete('/1.0/profiles/' + name).then((data) => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchProject(name: string): Promise<ProjectMetadata> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/projects/' + name).then((data) => {
                resolve(JSON.parse(data).metadata)
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchProjects(): Promise<ProjectMetadata[]> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/projects?recursion=1').then((data) => {
                var res = JSON.parse(data)
                var arr = res.metadata;
                var result = []
                for (const proj of arr) {
                    result.push(proj)
                }
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    }
    updateProject(name: string, config: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.patch('/1.0/projects/' + name, config).then((data) => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
    renameProject(name: string, newName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.post('/1.0/projects/' + name, { name: newName }).then((data) => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchProjectState(name: string): Promise<ProjectState> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/projects/' + name + "/state").then((data) => {
                resolve(JSON.parse(data).metadata)
            }).catch(error => {
                reject(error)
            })
        })
    }
    deleteProject(name: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.delete('/1.0/projects/' + name).then((data) => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchStoragePool(name: string): Promise<StoragePool> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/storage-pools/' + name).then((data) => {
                resolve(new StoragePool(this, this.client, JSON.parse(data).metadata))
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchStoragePools(): Promise<StoragePool[]> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/storage-pools?recursion=1').then((data) => {
                var res = JSON.parse(data)
                var arr = res.metadata;
                var result = []
                for (const pool of arr) {
                    result.push(new StoragePool(this, this.client, pool))
                }
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    }
    // fetch images
    fetchImage(fingerprint: string): Promise<Image> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/images/' + fingerprint).then((data) => {
                resolve(new Image(this, this.client, JSON.parse(data).metadata))
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchImages(): Promise<Image[]> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/images?recursion=1').then((data) => {
                var res = JSON.parse(data)
                var arr = res.metadata;
                var result = []
                for (const img of arr) {
                    result.push(new Image(this, this.client, img))
                }
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
export {
    HTTP,
    UNIX,
    Client,
    Network,
    StoragePool,
    Instance,
    Backup
}
