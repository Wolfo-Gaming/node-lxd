"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoragePool = void 0;
class StoragePool {
    constructor(root, client, data) {
        this.client = client;
        this.meta = data;
    }
    refetch() {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/storage-pools/${this.meta.name}`).then((data) => {
                this.meta = JSON.parse(data).metadata;
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }
    updateConfig(config) {
        return new Promise((resolve, reject) => {
            this.client.patch(`/1.0/storage-pools/${this.meta.name}`, config).then(data => {
                this.client.get(`/1.0/storage-pools/${this.meta.name}`).then(data => {
                    this.meta = JSON.parse(data).metadata;
                    resolve();
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            this.client.delete(`/1.0/storage-pools/${this.meta.name}`).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchState() {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/storage-pools/${this.meta.name}/state`).then(data => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            });
        });
    }
    fetchVolumes() {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/storage-pools/${this.meta.name}/volumes?recursion=1`).then(data => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.StoragePool = StoragePool;
