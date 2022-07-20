/// <reference types="node" />
import Network from './classes/network';
import { TypedEmitter } from 'tiny-typed-emitter';
import { WebSocket } from 'ws';
import { HTTP } from './classes/http';
import { Instance } from './classes/instance';
import { UNIX } from './classes/unix';
import { InstanceConfig } from './types/configs/instance';
import { CreateEvents } from './types/types';
import { Resources } from './types/types';
import { StoragePool } from './classes/storage-pool';
import { OperationMetaData } from './types/responses/operation/operation';
import { ProfileMetadata } from './types/responses/profile/metadata';
import { ProjectMetadata } from './types/responses/project/metadata';
import { ProjectState } from './types/responses/project/state';
import { Backup } from './classes/backup';
declare class Client {
    private client;
    caluclateUsingHyperthreading: boolean;
    constructor(url: string, options: {
        type: "http" | "unix";
        rejectUnauthorized?: boolean;
        cert?: Buffer;
        key?: Buffer;
        caluclateUsingHyperthreading?: boolean;
    });
    /**
     * Fetches LXD resource stats
     */
    fetchResources(): Promise<Resources>;
    connectEvents(type?: "operation" | "logging" | "lifecycle"): WebSocket;
    fetchInstance(name: string): Promise<Instance>;
    fetchInstances(): Promise<Instance[]>;
    createInstance(name: string, options: {
        config?: InstanceConfig;
        image: string;
        raw?: any;
        description?: string;
        profiles?: ["default" | string];
        imageServer?: {
            url: string;
            protocol: string;
        };
        type: string;
    }): Promise<TypedEmitter<CreateEvents>>;
    fetchOperations(): Promise<OperationMetaData[]>;
    fetchOperation(id: string): Promise<OperationMetaData>;
    waitForOperation(id: string): Promise<void>;
    cancelOperation(id: string): Promise<void>;
    fetchNetwork(name: string): Promise<Network>;
    fetchNetworks(): Promise<Network[]>;
    deleteNetwork(name: string): Promise<void>;
    fetchProfile(name: string): Promise<ProfileMetadata>;
    fetchProfiles(): Promise<ProfileMetadata[]>;
    updateProfile(name: string, config: any): Promise<void>;
    renameProfile(name: string, newName: string): Promise<void>;
    deleteProfile(name: string): Promise<void>;
    fetchProject(name: string): Promise<ProjectMetadata>;
    fetchProjects(): Promise<ProjectMetadata[]>;
    updateProject(name: string, config: any): Promise<void>;
    renameProject(name: string, newName: string): Promise<void>;
    fetchProjectState(name: string): Promise<ProjectState>;
    deleteProject(name: string): Promise<void>;
    fetchStoragePool(name: string): Promise<StoragePool>;
    fetchStoragePools(): Promise<StoragePool[]>;
}
export { HTTP, UNIX, Client, Network, StoragePool, Instance, Backup };
