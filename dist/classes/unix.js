"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNIX = void 0;
const axios_1 = require("axios");
const ws_1 = require("ws");
class UNIX {
    constructor(socket) {
        this.socket = new URL("unix://" + socket);
        this.axios = new axios_1.Axios({
            socketPath: socket,
        });
    }
    get(url, config) {
        return new Promise((resolve, reject) => {
            this.axios.get(url, config).then((data) => {
                if (data.status == 403) {
                    reject(data);
                }
                else {
                    resolve(data.data);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }
    post(url, data, config) {
        return new Promise((resolve, reject) => {
            this.axios.post(url, JSON.stringify(data), config).then((data) => {
                if (data.status == 403) {
                    reject(data);
                }
                else {
                    resolve(data.data);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }
    put(url, data, config) {
        return new Promise((resolve, reject) => {
            this.axios.put(url, JSON.stringify(data), config).then((data) => {
                if (data.status == 403) {
                    reject(data);
                }
                else {
                    resolve(data.data);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }
    patch(url, data, config) {
        return new Promise((resolve, reject) => {
            this.axios.patch(url, JSON.stringify(data), config).then((data) => {
                if (data.status == 403) {
                    reject(data);
                }
                else {
                    resolve(data.data);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }
    delete(url, config) {
        return new Promise((resolve, reject) => {
            this.axios.delete(url, config).then((data) => {
                if (data.status == 403) {
                    reject(data);
                }
                else {
                    resolve(data.data);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }
    websocket(url) {
        return new ws_1.WebSocket("ws+unix://" + this.socket.pathname + ":" + url);
    }
}
exports.UNIX = UNIX;
UNIX.DEFAULT_SOCKET = "/var/snap/lxd/common/lxd/unix.socket";
