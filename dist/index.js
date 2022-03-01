"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.UNIX = exports.HTTP = void 0;
const tslib_1 = require("tslib");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const http_1 = require("./classes/http");
Object.defineProperty(exports, "HTTP", { enumerable: true, get: function () { return http_1.HTTP; } });
const instance_1 = require("./classes/instance");
const unix_1 = require("./classes/unix");
Object.defineProperty(exports, "UNIX", { enumerable: true, get: function () { return unix_1.UNIX; } });
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
                // @ts-expect-error
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
                // @ts-expect-error
                resolve(new instance_1.Instance(this, this.client, JSON.parse(data).metadata));
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchInstances() {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/instances?recursion=1').then((data) => {
                // @ts-expect-error
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
        return new Promise((resolve, reject) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                var response = yield this.client.post('/1.0/instances', Object.assign({ name: name, config: options.config ? options.config : {}, description: options.description ? options.description : "", source: {
                        type: "image",
                        alias: options.image,
                        "server": "https://images.linuxcontainers.org/",
                        "protocol": "simplestreams"
                    } }, options.raw));
                //console.log(response)
                //@ts-expect-error
                var res = JSON.parse(response);
                if (res.type == "error") {
                    return reject(res.error);
                }
                var waiter = new tiny_typed_emitter_1.TypedEmitter();
                var events = this.connectEvents("operation");
                var operationID = res.metadata.id;
                var self = this;
                function listener(d) {
                    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
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
}
exports.Client = Client;
