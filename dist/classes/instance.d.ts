import { InstanceConfig, InstanceMeta, InstanceType, InstanceStatus, InstancePowerState } from "../types/configs/instance";
import { Client, HTTP, UNIX } from "..";
import { TypedEmitter } from "tiny-typed-emitter";
import { BackupEvents, InstanceIP } from "../types/types";
import { ExecEmitter } from "./exec";
import { InstanceUsage } from "../types/responses/instance/usage";
import { Backup } from "./backup";
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
    listLogs(): Promise<string[]>;
    createBackup(name: string, options?: {
        compression_algorithm?: string;
        container_only?: boolean;
        expires_at?: string;
        instance_only?: boolean;
        name?: string;
        optimized_storage?: boolean;
    }): Promise<TypedEmitter<BackupEvents>>;
    fetchIP(version?: "v4" | "v6", interfaceName?: string): Promise<InstanceIP>;
    fetchNetworks(): Promise<{
        [key: string]: {
            "addresses": {
                "family": string;
                "address": string;
                "netmask": string;
                "scope": string;
            }[];
            "counters": {
                "bytes_received": number;
                "bytes_sent": number;
                "packets_received": number;
                "packets_sent": number;
                "errors_received": number;
                "errors_sent": number;
                "packets_dropped_outbound": number;
                "packets_dropped_inbound": number;
            };
            "hwaddr": string;
            "host_name": string;
            "mtu": number;
            "state": string;
            "type": string;
        };
    }>;
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
    fetchBackup(name: string): Promise<Backup>;
}
