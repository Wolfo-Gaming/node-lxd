"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Network {
    constructor(root, client, data) {
        this.client = client;
        this.meta = data;
    }
    refetch() {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/networks/${this.meta.name}`).then((data) => {
                this.meta = JSON.parse(data).metadata;
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }
    updateConfig(config) {
        return new Promise((resolve, reject) => {
            this.client.patch(`/1.0/networks/${this.meta.name}`, config).then(data => {
                this.client.get(`/1.0/networks/${this.meta.name}`).then(data => {
                    this.meta = JSON.parse(data).metadata;
                    resolve();
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    updateName(name) {
        return new Promise((resolve, reject) => {
            this.client.post(`/1.0/networks/${this.meta.name}`, { name: name }).then(data => {
                this.client.get(`/1.0/networks/${this.meta.name}`).then(data => {
                    this.meta = JSON.parse(data).metadata;
                    resolve();
                });
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchLeases() {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/networks/${this.meta.name}/leases`).then(data => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchState() {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/networks/${this.meta.name}/state`).then(data => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchForwards() {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/networks/${this.meta.name}/forwards?recursion=1`).then(data => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchForward(address) {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/networks/${this.meta.name}/forwards/${address}`).then(data => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            });
        });
    }
    deleteForward(address) {
        return new Promise((resolve, reject) => {
            this.client.delete(`/1.0/networks/${this.meta.name}/forwards/${address}`).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    updateForward(address, config) {
        return new Promise((resolve, reject) => {
            this.client.patch(`/1.0/networks/${this.meta.name}/forwards/${address}`, config).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            this.client.delete(`/1.0/networks/${this.meta.name}`).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    isManaged() {
        return this.meta.managed;
    }
}
exports.default = Network;
