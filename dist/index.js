"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backup = exports.Instance = exports.StoragePool = exports.Network = exports.Client = exports.UNIX = exports.HTTP = void 0;
const tslib_1 = require("tslib");
const network_1 = tslib_1.__importDefault(require("./classes/network"));
exports.Network = network_1.default;
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const http_1 = require("./classes/http");
Object.defineProperty(exports, "HTTP", { enumerable: true, get: function () { return http_1.HTTP; } });
const instance_1 = require("./classes/instance");
Object.defineProperty(exports, "Instance", { enumerable: true, get: function () { return instance_1.Instance; } });
const unix_1 = require("./classes/unix");
Object.defineProperty(exports, "UNIX", { enumerable: true, get: function () { return unix_1.UNIX; } });
const storage_pool_1 = require("./classes/storage-pool");
Object.defineProperty(exports, "StoragePool", { enumerable: true, get: function () { return storage_pool_1.StoragePool; } });
const backup_1 = require("./classes/backup");
Object.defineProperty(exports, "Backup", { enumerable: true, get: function () { return backup_1.Backup; } });
class Client {
    constructor(url, options) {
        if (!options.caluclateUsingHyperthreading || options.caluclateUsingHyperthreading == true) {
            this.caluclateUsingHyperthreading = true;
        }
        else if (options.caluclateUsingHyperthreading == false) {
            this.caluclateUsingHyperthreading = false;
        }
        if (options.type == "http") {
            if (!options.cert)
                throw new Error('Certificate not specified');
            if (!options.key)
                throw new Error('Key not specified');
            if (!options.rejectUnauthorized)
                options.rejectUnauthorized = false;
            this.client = new http_1.HTTP(url, {
                cert: options.cert,
                key: options.key,
                rejectUnauthorized: false
            });
        }
        else if (options.type == "unix") {
            if (url == null)
                url = unix_1.UNIX.DEFAULT_SOCKET;
            this.client = new unix_1.UNIX(url);
        }
        else {
            throw new Error('Connection type not specified');
        }
    }
    /**
     * Fetches LXD resource stats
     */
    fetchResources() {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/resources', {}).then((data) => {
                resolve(JSON.parse(data));
            }).catch(error => {
                reject(error);
            });
        });
    }
    connectEvents(type) {
        if (!type) {
            return this.client.websocket('/1.0/events');
        }
        else {
            return this.client.websocket('/1.0/events?type=' + type);
        }
    }
    fetchInstance(name) {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/instances/' + name).then(data => {
                resolve(new instance_1.Instance(this, this.client, JSON.parse(data).metadata));
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchInstances() {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/instances?recursion=1').then((data) => {
                var res = JSON.parse(data);
                var arr = res.metadata;
                var result = [];
                for (const inst of arr) {
                    result.push(new instance_1.Instance(this, this.client, inst));
                }
                resolve(result);
            });
        });
    }
    createInstance(name, options) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                var response = yield this.client.post('/1.0/instances', Object.assign({ name: name, config: options.config ? options.config : {}, description: options.description ? options.description : "", source: {
                        type: "image",
                        alias: options.image,
                        "server": options.imageServer.url ? options.imageServer.url : "https://images.linuxcontainers.org/",
                        "protocol": options.imageServer.protocol ? options.imageServer.protocol : "simplestreams"
                    }, type: options.type ? options.type : "container" }, options.raw));
                //console.log(response)
                var res = JSON.parse(response);
                if (res.type == "error") {
                    return reject(res.error);
                }
                var waiter = new tiny_typed_emitter_1.TypedEmitter();
                var events = this.connectEvents("operation");
                var operationID = res.metadata.id;
                var self = this;
                function listener(d) {
                    return tslib_1.__awaiter(this, void 0, void 0, function* () {
                        var data = JSON.parse(d.toString());
                        if (data.metadata.id == operationID) {
                            if (data.metadata.status == "Failure") {
                                waiter.emit("error", new Error(data.metadata.err));
                                events.removeAllListeners();
                                events.close();
                            }
                            if (data.metadata.status == "Success") {
                                waiter.emit("finished", yield self.fetchInstance(name));
                                events.removeAllListeners();
                                events.close();
                            }
                            if (!data.metadata.metadata)
                                return;
                            if (data.metadata.metadata.download_progress) {
                                var s = data.metadata.metadata.download_progress.match(/: (.*)%/);
                                waiter.emit("progress", s[1]);
                            }
                        }
                    });
                }
                events.on('message', listener);
            }
            catch (error) {
                return reject(error);
            }
            if (res.type == "error") {
                return reject(res.data);
            }
            //
            return resolve(waiter);
        }));
    }
    fetchOperations() {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/operations?recursion=1').then((data) => {
                resolve(JSON.parse(data).metadata.running);
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchOperation(id) {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/operations/' + id).then((data) => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            });
        });
    }
    waitForOperation(id) {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/operations/' + id + "/wait").then((data) => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    cancelOperation(id) {
        return new Promise((resolve, reject) => {
            this.client.delete('/1.0/operations/' + id).then((data) => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchNetwork(name) {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/networks/' + name).then((data) => {
                resolve(new network_1.default(this, this.client, JSON.parse(data).metadata));
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchNetworks() {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/networks?recursion=1').then((data) => {
                var res = JSON.parse(data);
                var arr = res.metadata;
                var result = [];
                for (const net of arr) {
                    result.push(new network_1.default(this, this.client, net));
                }
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }
    deleteNetwork(name) {
        return new Promise((resolve, reject) => {
            this.client.delete('/1.0/networks/' + name).then((data) => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchProfile(name) {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/profiles/' + name).then((data) => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchProfiles() {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/profiles?recursion=1').then((data) => {
                var res = JSON.parse(data);
                var arr = res.metadata;
                var result = [];
                for (const prof of arr) {
                    result.push(prof);
                }
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updateProfile(name, config) {
        return new Promise((resolve, reject) => {
            this.client.patch('/1.0/profiles/' + name, config).then((data) => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    renameProfile(name, newName) {
        return new Promise((resolve, reject) => {
            this.client.post('/1.0/profiles/' + name, { name: newName }).then((data) => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    deleteProfile(name) {
        return new Promise((resolve, reject) => {
            this.client.delete('/1.0/profiles/' + name).then((data) => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchProject(name) {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/projects/' + name).then((data) => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchProjects() {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/projects?recursion=1').then((data) => {
                var res = JSON.parse(data);
                var arr = res.metadata;
                var result = [];
                for (const proj of arr) {
                    result.push(proj);
                }
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }
    updateProject(name, config) {
        return new Promise((resolve, reject) => {
            this.client.patch('/1.0/projects/' + name, config).then((data) => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    renameProject(name, newName) {
        return new Promise((resolve, reject) => {
            this.client.post('/1.0/projects/' + name, { name: newName }).then((data) => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchProjectState(name) {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/projects/' + name + "/state").then((data) => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            });
        });
    }
    deleteProject(name) {
        return new Promise((resolve, reject) => {
            this.client.delete('/1.0/projects/' + name).then((data) => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchStoragePool(name) {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/storagepools/' + name).then((data) => {
                resolve(new storage_pool_1.StoragePool(this, this.client, JSON.parse(data).metadata));
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchStoragePools() {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/storagepools?recursion=1').then((data) => {
                var res = JSON.parse(data);
                var arr = res.metadata;
                var result = [];
                for (const pool of arr) {
                    result.push(new storage_pool_1.StoragePool(this, this.client, pool));
                }
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.Client = Client;
