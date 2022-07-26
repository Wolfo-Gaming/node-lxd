"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Image {
    constructor(root, client, data) {
        this.client = client;
        this.meta = data;
    }
    refetch() {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/images/${this.meta.fingerprint}`).then((data) => {
                this.meta = JSON.parse(data).metadata;
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }
    updateConfig(config) {
        return new Promise((resolve, reject) => {
            this.client.patch(`/1.0/images/${this.meta.fingerprint}`, config).then(data => {
                this.client.get(`/1.0/images/${this.meta.fingerprint}`).then(data => {
                    this.meta = JSON.parse(data).metadata;
                    resolve();
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    createAlias(alias, type, description) {
        return new Promise((resolve, reject) => {
            if (!description)
                description = "";
            this.client.post(`/1.0/images/aliases`, { name: alias, type, description, target: this.meta.fingerprint }).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    deleteAlias(alias) {
        return new Promise((resolve, reject) => {
            this.client.delete(`/1.0/images/aliases/${alias}`).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    renameAlias(alias, newName) {
        return new Promise((resolve, reject) => {
            this.client.post(`/1.0/images/aliases/${alias}`, { name: newName }).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    /**
     * Returns operation url
     */
    refresh() {
        return new Promise((resolve, reject) => {
            this.client.post(`/1.0/images/${this.meta.fingerprint}/refresh`, {}).then(data => {
                resolve(JSON.parse(data).operation);
            }).catch(error => {
                reject(error);
            });
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            this.client.delete(`/1.0/images/${this.meta.fingerprint}`).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.default = Image;
