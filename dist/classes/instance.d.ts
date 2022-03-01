import { InstanceConfig, InstanceMeta, InstanceType, InstanceStatus, InstancePowerState } from "../types/configs/instance";
import { Client, HTTP, UNIX } from "..";
import { TypedEmitter } from "tiny-typed-emitter";
import { BackupEvents, InstanceIP } from "../types/types";
import { ExecEmitter } from "./exec";
import { InstanceUsage } from "../types/responses/instance/usage";
export declare class Instance {
    private client;
    meta: InstanceMeta;
    private root;
    constructor(root: Client, client: UNIX | HTTP, data: InstanceMeta);
    /**
     * Get instance name
     */
    name(): string;
    /**
     * Get instance config
     */
    fetchConfig(): InstanceConfig;
    /**
     * Get instance profiles
     */
    fetchProfiles(): string[];
    /**
     * Get instance type
     */
    fetchType(): InstanceType;
    /**
     * Get instance type
     */
    fetchStatus(): InstanceStatus;
    fetchLogs(name?: string): Promise<string>;
    createBackup(name: string, options?: {}): Promise<TypedEmitter<BackupEvents>>;
    fetchIP(version?: "v4" | "v6", interfaceName?: string): Promise<InstanceIP>;
    fetchUsage(): Promise<InstanceUsage>;
    /**
     * Set instance status
     */
    setStatus(status: InstancePowerState, force?: boolean, timeout?: number): Promise<void>;
    updateConfig(config: InstanceConfig): Promise<Instance>;
    updateName(name: string): Promise<Instance>;
    exec(command: string[], options?: {
        cwd?: string;
        env?: {};
        user?: number;
        height?: number;
        width?: number;
    }): Promise<ExecEmitter>;
}
