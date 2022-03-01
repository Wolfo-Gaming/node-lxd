/// <reference types="node" />
import { TypedEmitter } from 'tiny-typed-emitter';
import { WebSocket } from 'ws';
import { HTTP } from './classes/http';
import { Instance } from './classes/instance';
import { UNIX } from './classes/unix';
import { InstanceConfig } from './types/configs/instance';
import { CreateEvents } from './types/types';
import { Resources } from './types/types';
import { ImageAlias } from './types/ImageAliases';
declare class Client {
    client: HTTP | UNIX;
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
        image: ImageAlias;
        raw?: any;
        description?: string;
        profiles?: ["default" | string];
    }): Promise<TypedEmitter<CreateEvents>>;
}
export { HTTP };
export { UNIX };
export { Client };
