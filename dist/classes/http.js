"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP = void 0;
const axios_1 = require("axios");
const ws_1 = require("ws");
const https_1 = require("https");
class HTTP {
    constructor(url, options) {
        this.url = new URL(url);
        this.options = options;
        this.agent = new https_1.Agent({
            cert: options.cert,
            key: options.key,
            rejectUnauthorized: options.rejectUnauthorized ? options.rejectUnauthorized : false
        });
        this.axios = new axios_1.Axios({
            baseURL: url,
            httpsAgent: this.agent
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
        return new ws_1.WebSocket("wss://" + this.url.hostname + ":" + this.url.port + url, {
            rejectUnauthorized: false,
            cert: this.options.cert,
            key: this.options.key
        });
    }
}
exports.HTTP = HTTP;
