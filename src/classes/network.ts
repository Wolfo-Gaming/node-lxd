import { DHCPLeases } from "../types/responses/network/dhcp";
import { NetworkForward } from "../types/responses/network/forward";
import { NetworkMeta } from "../types/responses/network/metadata";
import { NetworkState } from "../types/responses/network/state";
import { Client, HTTP, UNIX } from ".."

export default class Network {
    private client: UNIX | HTTP;
    meta: NetworkMeta;
    constructor(root: Client, client: UNIX | HTTP, data: NetworkMeta) {
        this.client = client;
        this.meta = data;
    }
    refetch(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/networks/${this.meta.name}`).then((data) => {
                this.meta = JSON.parse(data).metadata;
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }

    updateConfig(config: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.patch(`/1.0/networks/${this.meta.name}`, config).then(data => {
                this.client.get(`/1.0/networks/${this.meta.name}`).then(data => {
                    this.meta = JSON.parse(data).metadata;
                    resolve();
                })
            }).catch(error => {
                reject(error);
            })
        })
    }
    updateName(name: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.post(`/1.0/networks/${this.meta.name}`, { name: name }).then(data => {
                this.client.get(`/1.0/networks/${this.meta.name}`).then(data => {
                    this.meta = JSON.parse(data).metadata;
                    resolve();
                })
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
    fetchLeases(): Promise<DHCPLeases> {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/networks/${this.meta.name}/leases`).then(data => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            })
        })
    }
    fetchState(): Promise<NetworkState> {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/networks/${this.meta.name}/state`).then(data => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            })
        })
    }
    fetchForwards(): Promise<NetworkForward[]> {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/networks/${this.meta.name}/forwards?recursion=1`).then(data => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            })
        })
    }
    fetchForward(address: string): Promise<NetworkForward> {
        return new Promise((resolve, reject) => {
            this.client.get(`/1.0/networks/${this.meta.name}/forwards/${address}`).then(data => {
                resolve(JSON.parse(data).metadata);
            }).catch(error => {
                reject(error);
            })
        })
    }
    deleteForward(address: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.delete(`/1.0/networks/${this.meta.name}/forwards/${address}`).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
    updateForward(address: string, config: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.patch(`/1.0/networks/${this.meta.name}/forwards/${address}`, config).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
    delete(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.delete(`/1.0/networks/${this.meta.name}`).then(data => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
    isManaged(): boolean {
        return this.meta.managed;
    }
}