export type InstanceType = "virtual-machine" | "container"
export type InstancePowerState = "start"|"stop"|"restart"|"freeze"
export type InstanceStatus = "Stopped" | "Running"
export interface InstanceMeta {
    architecture: string;
    config: InstanceConfig;
    created_at: string;
    description: string;
    devices: {
        [key: string]: {
            path?: string;
            pool?: string;
            type: string;
        };
    };
    ephemeral: boolean;
    expanded_config: InstanceConfig;
    expanded_devices: {
        [key: string]: {
            path?: string;
            pool?: string;
            type: string;
        };
    };
    last_used_at: string;
    location: string;
    name: string;
    profiles: string[];
    project: string;
    restore: string;
    stateful: boolean;
    status: InstanceStatus;
    status_code: number;
    type: InstanceType;
}
export interface InstanceConfig {
    "agent.rename_interfaces": boolean,
    "boot.autostart": boolean,
    "boot.autostart.delay": number,
    "boot.autostart.priority": number,
    "boot.host_shutdown_timeout": number,
    "boot.stop.priority": number,
    "cloud-init.network-config": string,
    "cloud-init.user-data": string,
    "cloud-init.vendor-data": string,
    "cluster.evacuate": string,
    "environment.*": string,
    "limits.cpu": string,
    "limits.cpu.allowance": string,
    "limits.cpu.priority": number,
    "limits.disk.priority": number,
    "limits.hugepages.64KB": string,
    "limits.hugepages.1MB": string,
    "limits.hugepages.2MB": string,
    "limits.hugepages.1GB": string,
    "limits.kernel.*": string,
    "limits.memory": string,
    "limits.memory.enforce": string,
    "limits.memory.hugepages": boolean,
    "limits.memory.swap": boolean,
    "limits.memory.swap.priority": number,
    "limits.network.priority": number,
    "limits.processes": number,
    "linux.kernel_modules": string,
    "linux.sysctl.*": string,
    "migration.incremental.memory": boolean,
    "migration.incremental.memory.goal": number,
    "migration.incremental.memory.iterations": number,
    "migration.stateful": boolean,
    "nvidia.driver.capabilities": string,
    "nvidia.runtime": boolean,
    "nvidia.require.cuda": string,
    "nvidia.require.driver": string,
    "raw.apparmor": string,
    "raw.idmap": string,
    "raw.lxc": string,
    "raw.qemu": string,
    "raw.seccomp": string,
    "security.devlxd": boolean,
    "security.devlxd.images": boolean,
    "security.idmap.base": number,
    "security.idmap.isolated": boolean,
    "security.idmap.size": number,
    "security.nesting": boolean,
    "security.privileged": boolean,
    "security.protection.delete": boolean,
    "security.protection.shift": boolean,
    "security.agent.metrics": boolean,
    "security.secureboot": boolean,
    "security.syscalls.allow": string,
    "security.syscalls.deny": string,
    "security.syscalls.deny_compat": boolean,
    "security.syscalls.deny_default": boolean,
    "security.syscalls.intercept.bpf": boolean,
    "security.syscalls.intercept.bpf.devices": boolean,
    "security.syscalls.intercept.mknod": boolean,
    "security.syscalls.intercept.mount": boolean,
    "security.syscalls.intercept.mount.allowed": string,
    "security.syscalls.intercept.mount.fuse": string,
    "security.syscalls.intercept.mount.shift": boolean,
    "security.syscalls.intercept.setxattr": boolean,
    "snapshots.schedule": string,
    "snapshots.schedule.stopped": boolean,
    "snapshots.pattern": string,
    "snapshots.expiry": string,
    "user.*": any
}