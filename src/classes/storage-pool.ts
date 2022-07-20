import { StoragePoolMetadata } from "../types/responses/storage-pool/metadata";
import { StoragePoolState } from "../types/responses/storage-pool/state";
import { StoragePoolVolume } from "../types/responses/storage-pool/volume";
import { Client, HTTP, UNIX } from ".."

export class StoragePool {
    private client: UNIX | HTTP;
    meta: StoragePoolMetadata;

    constructor(root: Client, client: UNIX | HTTP, data: StoragePoolMetadata) {
        this.client = client;
        this.meta = data;

    }
    refetch(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/storage-pools/${this.meta.name}`).then((data) => {
                this.meta = JSON.parse(data).metadata;
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }
    updateConfig(config: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.patch(`/1.0/storage-pools/${this.meta.name}`, config).then(data => {
                this.client.get(`/1.0/storage-pools/${this.meta.name}`).then(data => {
                    this.meta = JSON.parse(data).metadata;
                    resolve();
                })
            }).catch(error => {
                reject(error);
            })
        })
    }
    delete(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.delete(`/1.0/storage-pools/${this.meta.name}`).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
    fetchState(): Promise<StoragePoolState> {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/storage-pools/${this.meta.name}/state`).then(data => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            })
        })
    }
    fetchVolumes(): Promise<StoragePoolVolume[]> {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/storage-pools/${this.meta.name}/volumes?recursion=1`).then(data => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            })
        })
    }

}