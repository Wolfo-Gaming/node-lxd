import { Client, HTTP, UNIX } from ".."
import { ImageMeta } from "../types/responses/image/metadata";

export default class Image {
    private client: UNIX | HTTP;
    meta: ImageMeta;
    constructor(root: Client, client: UNIX | HTTP, data: ImageMeta) {
        this.client = client;
        this.meta = data;
    }
    refetch(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/images/${this.meta.fingerprint}`).then((data) => {
                this.meta = JSON.parse(data).metadata;
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }

    updateConfig(config: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.patch(`/1.0/images/${this.meta.fingerprint}`, config).then(data => {
                this.client.get(`/1.0/images/${this.meta.fingerprint}`).then(data => {
                    this.meta = JSON.parse(data).metadata;
                    resolve();
                })
            }).catch(error => {
                reject(error);
            })
        })
    }
    createAlias(alias: string, type: string, description?: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!description) description = "";
            this.client.post(`/1.0/images/aliases`, { name: alias, type, description, target: this.meta.fingerprint }).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
    deleteAlias(alias: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.delete(`/1.0/images/aliases/${alias}`).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
    renameAlias(alias: string, newName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.post(`/1.0/images/aliases/${alias}`, { name: newName }).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
    /**
     * Returns operation url 
     */
    refresh(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.client.post(`/1.0/images/${this.meta.fingerprint}/refresh`, {}).then(data => {
                resolve(JSON.parse(data).operation);
            }).catch(error => {
                reject(error);
            })
        })
    }
    delete(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.delete(`/1.0/images/${this.meta.fingerprint}`).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
}