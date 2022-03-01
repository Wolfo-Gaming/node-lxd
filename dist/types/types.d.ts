/// <reference types="node" />
import { Resources } from './responses/resources';
import { LifecycleEvent } from './events/lifecycle';
import { LoggingEvent } from './events/logging';
import { OperationEvent } from './events/operation';
import { Instance } from '../classes/instance';
import { Backup } from '../classes/backup';
export { LifecycleEvent, LoggingEvent, OperationEvent, Resources };
export interface ClientEvents {
    "operation": (event: OperationEvent) => void;
    "logging": (event: LoggingEvent) => void;
    "lifecycle": (event: LifecycleEvent) => void;
}
export interface ExecEvents {
    "data": (event: Buffer) => void;
    "control": (event: string) => void;
    "exit": () => void;
}
export interface InstanceIP {
    family: 'inet' | 'inet6';
    address: string;
    netmask: string;
    scope: 'global';
}
export interface CreateEvents {
    "finished": (instance: Instance) => void;
    "error": (error: Error) => void;
    "progress": (progress: number) => void;
}
export interface BackupEvents {
    "finished": (backup: Backup) => void;
    "error": (error: Error) => void;
    "progress": (progress: {
        /** Backup progress, Example: 111.97MB */
        done: number;
        /** Backup speed, Example: 9.99MB/s */
        speed: number;
    }) => void;
}
