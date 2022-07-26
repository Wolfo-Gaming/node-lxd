"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instance = void 0;
const tslib_1 = require("tslib");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const exec_1 = require("./exec");
const bytesparser_1 = require("../util/bytesparser");
const backup_1 = require("./backup");
const fs_1 = tslib_1.__importDefault(require("fs"));
const https_1 = tslib_1.__importDefault(require("https"));
class Instance {
    constructor(root, client, data) {
        this.client = client;
        this.meta = data;
        this.root = root;
    }
    /**
     * Get instance name
     */
    name() {
        return this.meta.name;
    }
    /**
     * Get instance config
     */
    fetchConfig() {
        return this.meta.config;
    }
    /**
     * Get instance profiles
     */
    fetchProfiles() {
        return this.meta.profiles;
    }
    /**
     * Get instance type
     */
    fetchType() {
        return this.meta.type;
    }
    /**
     * Get instance type
     */
    fetchStatus() {
        return this.meta.status;
    }
    downloadFile(path, writeStream) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!path)
                throw new Error('Path not defined');
            var events = new tiny_typed_emitter_1.TypedEmitter();
            const url = encodeURI("/1.0/instances/" + this.meta.name + "/files?path=" + path);
            const { data, headers } = yield this.client.axios.get(url, {
                responseType: 'stream'
            });
            events.emit('open');
            const totalLength = headers['content-length'];
            var done = 0;
            if (data.headers["content-type"] == "application/json") {
                data.on('data', (chunk) => {
                    resolve({
                        type: 'dir',
                        list: JSON.parse(chunk.toString()).metadata
                    });
                });
            }
            else {
                data.on('data', (chunk) => {
                    done += chunk.length;
                    var percent = (done * 100) / parseFloat(totalLength);
                    var progress = {
                        bytes: {
                            sent: done,
                            total: parseFloat(totalLength)
                        },
                        percent: percent
                    };
                    events.emit('progress', progress);
                    if (progress.percent == 100) {
                        events.emit('finish');
                    }
                });
                data.pipe(writeStream);
                resolve({ type: 'file', events });
            }
        }));
    }
    uploadFile(ReadStream, destPath) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var events = new tiny_typed_emitter_1.TypedEmitter();
            var parsedURL = new URL(this.root.url);
            if (this.root.options.type == "unix") {
                var optss = {
                    rejectUnauthorized: false,
                    method: "POST",
                    socketPath: this.root.url,
                    path: encodeURI("/1.0/instances/" + this.meta.name + "/files?path=" + destPath),
                    headers: {
                        "Content-Type": `application/octet-stream`
                    },
                };
            }
            else if (this.root.options.type == "http") {
                var optss = {
                    cert: this.root.options.cert,
                    key: this.root.options.key,
                    rejectUnauthorized: this.root.options.rejectUnauthorized,
                    method: "POST",
                    hostname: parsedURL.hostname,
                    port: parsedURL.port,
                    path: encodeURI("/1.0/instances/" + this.meta.name + "/files?path=" + destPath),
                    headers: {
                        "Content-Type": `application/octet-stream`
                    },
                };
            }
            var request = https_1.default.request(optss, function (response) {
                response.on('error', (err) => {
                    reject(err);
                });
            });
            request.on('error', error => {
                reject(error);
            });
            var bytes = 0;
            var size = fs_1.default.lstatSync(ReadStream.path).size;
            ReadStream.on('data', (chunk) => {
                bytes += chunk.length;
                var percent = ((bytes) * 100) / size;
                var data = {
                    bytes: {
                        sent: bytes,
                        total: size
                    },
                    percent: percent
                };
                events.emit('progress', data);
                if (data.percent == 100) {
                    events.emit("finish");
                }
            }).pipe(request);
            resolve(events);
        }));
    }
    fetchLogs(name) {
        if (!name)
            name = 'lxc.log';
        return new Promise((resolve, reject) => {
            this.client.get("/1.0/instances/" + this.name() + "/logs/" + name).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    }
    listLogs() {
        return new Promise((resolve, reject) => {
            this.client.get("/1.0/instances/" + this.name() + "/logs").then(data => {
                var response = JSON.parse(data);
                resolve(response.metadata.map((str) => {
                    return (str.split('/')[str.split('/').length - 1]);
                }));
            }).catch(error => {
                reject(error);
            });
        });
    }
    createBackup(name, options) {
        return new Promise((resolve, reject) => {
            this.client.post('/1.0/instances/' + this.meta.name + '/backups', {
                "compression_algorithm": "gzip",
                "container_only": false,
                "instance_only": false,
                "name": name,
                "optimized_storage": true
            }).then(data => {
                var res = JSON.parse(data);
                if (res.type == "error") {
                    return reject(res.error);
                }
                var waiter = new tiny_typed_emitter_1.TypedEmitter();
                var events = this.root.connectEvents("operation");
                var operationID = res.metadata.id;
                var self = this;
                var backup_done = false;
                function listener(d) {
                    return tslib_1.__awaiter(this, void 0, void 0, function* () {
                        var data = JSON.parse(d.toString());
                        if (data.metadata.id == operationID) {
                            console.log(data);
                            if (data.metadata.status == "Failure") {
                                waiter.emit("error", new Error(data.metadata.err));
                                events.removeAllListeners();
                                events.close();
                            }
                            if (data.metadata.status == "Success") {
                                backup_done = true;
                                console.log(data.metadata.resources.backups[0].replace('/1.0/', '/1.0/instances/hah1s/'));
                                var backup = yield self.client.get(data.metadata.resources.backups[0].replace('/1.0/', '/1.0/instances/hah1s/'));
                                var s = new backup_1.Backup(self.client, self, JSON.parse(backup).metadata);
                                waiter.emit("finished", s);
                                events.removeAllListeners();
                                events.close();
                            }
                            console.log(JSON.stringify(data));
                            if (!data.metadata.metadata)
                                return;
                            if (data.metadata.metadata.create_backup_progress && backup_done == false) {
                                var done = data.metadata.metadata.create_backup_progress.match(/(.*)B /)[0].replace(' ', '');
                                var speed = data.metadata.metadata.create_backup_progress.match(/B ((.*))/)[1].replace('(', '').replace(')', '');
                                waiter.emit("progress", { speed, done });
                            }
                        }
                    });
                }
                events.on('message', listener);
                resolve(waiter);
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchIP(version, interfaceName) {
        return new Promise((resolve, reject) => {
            if (!version)
                version = "v4";
            if (!interfaceName)
                interfaceName = "eth0";
            this.client.get('/1.0/instances/' + this.meta.name + "/state").then((data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var response = JSON.parse(data);
                if (version == "v4") {
                    var int = response.metadata.network[interfaceName];
                    var ip = int.addresses.find((address) => {
                        return (address.scope == "global" && address.family == "inet");
                    });
                    resolve(ip);
                }
                if (version == "v6") {
                    var int = response.metadata.network[interfaceName];
                    var ip = int.addresses.find((address) => {
                        return (address.scope == "global" && address.family == "inet6");
                    });
                    resolve(ip);
                }
            })).catch(error => {
                reject(error);
            });
        });
    }
    fetchNetworks() {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/instances/' + this.meta.name + "/state").then((data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                resolve(JSON.parse(data).metadata.network);
            })).catch(error => {
                reject(error);
            });
        });
    }
    fetchUsage() {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/instances/' + this.meta.name + "/state").then((data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var system_data = yield this.root.fetchResources();
                var response = JSON.parse(data);
                var cpu_ns = response.metadata.cpu.usage;
                var memory_used = response.metadata.memory.usage;
                var memory_total = this.meta.config["limits.memory"] ? (0, bytesparser_1.parseBytes)(this.meta.config["limits.memory"]) : system_data.metadata.memory.total;
                var interface_keys = response.metadata.status == "Stopped" ? [] : Object.keys(response.metadata.network);
                var s = this.meta.config["limits.cpu"];
                var cpuCount = s ? parseFloat(s) : system_data.metadata.cpu.total; // thats probs why i did / 2
                console.log(cpuCount);
                if (this.root.caluclateUsingHyperthreading == false)
                    var thread_multiplier = 1;
                if (this.root.caluclateUsingHyperthreading == true)
                    var thread_multiplier = 2;
                var multiplier = (100000 / cpuCount) * thread_multiplier;
                var startTime = Date.now();
                var u = JSON.parse(yield this.client.get("/1.0/instances/" + this.meta.name + "/state"));
                console.log(u);
                var usage1 = u.metadata.cpu.usage / 1000000000;
                var usage2 = (JSON.parse(yield this.client.get("/1.0/instances/" + this.meta.name + "/state")).metadata.cpu.usage / 1000000000);
                var cpu_usage = ((usage2 - usage1) / (Date.now() - startTime)) * multiplier;
                if (cpu_usage > 100) {
                    cpu_usage = 100;
                }
                var interface_usage = {};
                interface_keys.map(name => {
                    var interface_data = response.metadata.network[name];
                    //@ts-expect-error
                    interface_usage[name] = {
                        received: interface_data.counters.bytes_received,
                        sent: interface_data.counters.bytes_sent,
                        packets_sent: interface_data.counters.packets_sent,
                        packets_received: interface_data.counters.packets_received
                    };
                });
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
                });
            })).catch(error => {
                reject(error);
            });
        });
    }
    /**
     * Set instance status
     */
    setStatus(status, force, timeout) {
        return new Promise((resolve, reject) => {
            this.client.put('/1.0/instances/' + this.meta.name + "/state", {}).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    updateConfig(config) {
        return new Promise((resolve, reject) => {
            this.client.patch("/1.0/instances/" + this.meta.name, { config: config }).then(data => {
                this.client.get("/1.0/instances/" + this.meta.name).then(ins => {
                    resolve(new Instance(this.root, this.client, JSON.parse(ins).metadata));
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    updateName(name) {
        return new Promise((resolve, reject) => {
            this.client.post("/1.0/instances/" + this.meta.name, { name: name }).then(data => {
                this.client.get("/1.0/instances/" + name).then(ins => {
                    console.log(ins);
                    resolve(new Instance(this.root, this.client, JSON.parse(ins).metadata));
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    exec(command, options) {
        return new Promise((resolve, reject) => {
            if (!command)
                return reject(new Error('Command not specified'));
            if (!options)
                options = {};
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
                    var controlWS = this.client.websocket(controlPath);
                }
                catch (error) {
                    reject(new Error('Failed to connect to Control and/or Console websocket'));
                }
                var exec = new exec_1.ExecEmitter(controlWS, consoleWS, response);
                resolve(exec);
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchBackup(name) {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/instances/' + this.name() + "/backups/" + name).then(data => {
                console.log(data);
                var response = JSON.parse(data);
                if (response.status_code != 200)
                    reject(new Error(response.error));
                resolve(new backup_1.Backup(this.client, this, response.metadata));
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.Instance = Instance;
