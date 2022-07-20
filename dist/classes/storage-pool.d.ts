import { StoragePoolMetadata } from "../types/responses/storage-pool/metadata";
import { StoragePoolState } from "../types/responses/storage-pool/state";
import { StoragePoolVolume } from "../types/responses/storage-pool/volume";
import { Client, HTTP, UNIX } from "..";
export declare class StoragePool {
    private client;
    meta: StoragePoolMetadata;
    constructor(root: Client, client: UNIX | HTTP, data: StoragePoolMetadata);
    refetch(): Promise<void>;
    updateConfig(config: any): Promise<void>;
    delete(): Promise<void>;
    fetchState(): Promise<StoragePoolState>;
    fetchVolumes(): Promise<StoragePoolVolume[]>;
}
