import { DHCPLeases } from "../types/responses/network/dhcp";
import { NetworkForward } from "../types/responses/network/forward";
import { NetworkMeta } from "../types/responses/network/metadata";
import { NetworkState } from "../types/responses/network/state";
import { Client, HTTP, UNIX } from "..";
export default class Network {
    private client;
    meta: NetworkMeta;
    constructor(root: Client, client: UNIX | HTTP, data: NetworkMeta);
    refetch(): Promise<void>;
    updateConfig(config: any): Promise<void>;
    updateName(name: string): Promise<void>;
    fetchLeases(): Promise<DHCPLeases>;
    fetchState(): Promise<NetworkState>;
    fetchForwards(): Promise<NetworkForward[]>;
    fetchForward(address: string): Promise<NetworkForward>;
    deleteForward(address: string): Promise<void>;
    updateForward(address: string, config: any): Promise<void>;
    delete(): Promise<void>;
    isManaged(): boolean;
}
