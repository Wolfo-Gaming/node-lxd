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
export type ImageAlias = 'almalinux/8/cloud' | 'almalinux/8/default' | 'almalinux/8' | 'almalinux/8/cloud' | 'almalinux/8/default' | 'almalinux/8' | 'alpine/3.12/default' | 'alpine/3.12' | 'alpine/3.12/default' | 'alpine/3.12' | 'alpine/3.12/default' | 'alpine/3.12' | 'alpine/3.12/default' | 'alpine/3.12' | 'alpine/3.12/default' | 'alpine/3.12' | 'alpine/3.12/default' | 'alpine/3.12' | 'alpine/3.13/cloud' | 'alpine/3.13/default' | 'alpine/3.13' | 'alpine/3.13/cloud' | 'alpine/3.13/default' | 'alpine/3.13' | 'alpine/3.13/cloud' | 'alpine/3.13/default' | 'alpine/3.13' | 'alpine/3.13/cloud' | 'alpine/3.13/default' | 'alpine/3.13' | 'alpine/3.13/cloud' | 'alpine/3.13/default' | 'alpine/3.13' | 'alpine/3.13/default' | 'alpine/3.13' | 'alpine/3.14/cloud' | 'alpine/3.14/default' | 'alpine/3.14' | 'alpine/3.14/cloud' | 'alpine/3.14/default' | 'alpine/3.14' | 'alpine/3.14/cloud' | 'alpine/3.14/default' | 'alpine/3.14' | 'alpine/3.14/cloud' | 'alpine/3.14/default' | 'alpine/3.14' | 'alpine/3.14/cloud' | 'alpine/3.14/default' | 'alpine/3.14' | 'alpine/3.14/default' | 'alpine/3.14' | 'alpine/3.15/cloud' | 'alpine/3.15/default' | 'alpine/3.15' | 'alpine/3.15/cloud' | 'alpine/3.15/default' | 'alpine/3.15' | 'alpine/3.15/cloud' | 'alpine/3.15/default' | 'alpine/3.15' | 'alpine/3.15/cloud' | 'alpine/3.15/default' | 'alpine/3.15' | 'alpine/3.15/cloud' | 'alpine/3.15/default' | 'alpine/3.15' | 'alpine/3.15/default' | 'alpine/3.15' | 'alpine/edge/cloud' | 'alpine/edge/default' | 'alpine/edge' | 'alpine/edge/cloud' | 'alpine/edge/default' | 'alpine/edge' | 'alpine/edge/cloud' | 'alpine/edge/default' | 'alpine/edge' | 'alpine/edge/cloud' | 'alpine/edge/default' | 'alpine/edge' | 'alpine/edge/cloud' | 'alpine/edge/default' | 'alpine/edge' | 'alpine/edge/default' | 'alpine/edge' | 'alt/Sisyphus/cloud' | 'alt/Sisyphus/default' | 'alt/Sisyphus' | 'alt/Sisyphus/cloud' | 'alt/Sisyphus/default' | 'alt/Sisyphus' | 'alt/Sisyphus/cloud' | 'alt/Sisyphus/default' | 'alt/Sisyphus' | 'alt/Sisyphus/cloud' | 'alt/Sisyphus/default' | 'alt/Sisyphus' | 'alt/Sisyphus/cloud' | 'alt/Sisyphus/default' | 'alt/Sisyphus' | 'alt/p10/cloud' | 'alt/p10/default' | 'alt/p10' | 'alt/p10/cloud' | 'alt/p10/default' | 'alt/p10' | 'alt/p10/cloud' | 'alt/p10/default' | 'alt/p10' | 'alt/p10/cloud' | 'alt/p10/default' | 'alt/p10' | 'alt/p10/cloud' | 'alt/p10/default' | 'alt/p10' | 'alt/p9/cloud' | 'alt/p9/default' | 'alt/p9' | 'alt/p9/cloud' | 'alt/p9/default' | 'alt/p9' | 'alt/p9/cloud' | 'alt/p9/default' | 'alt/p9' | 'alt/p9/cloud' | 'alt/p9/default' | 'alt/p9' | 'alt/p9/cloud' | 'alt/p9/default' | 'alt/p9' | 'amazonlinux/current/default' | 'amazonlinux/current' | 'amazonlinux' | 'amazonlinux/current/default' | 'amazonlinux/current' | 'amazonlinux' | 'apertis/v2019/default' | 'apertis/v2019' | 'apertis/v2019/default' | 'apertis/v2019' | 'apertis/v2019/default' | 'apertis/v2019' | 'apertis/v2020/default' | 'apertis/v2020' | 'apertis/v2020/default' | 'apertis/v2020' | 'apertis/v2020/default' | 'apertis/v2020' | 'apertis/v2021/default' | 'apertis/v2021' | 'apertis/v2021/default' | 'apertis/v2021' | 'apertis/v2021/default' | 'apertis/v2021' | 'archlinux/current/cloud' | 'archlinux/cloud' | 'archlinux/current/default' | 'archlinux/current' | 'archlinux' | 'archlinux/current/desktop-gnome' | 'archlinux/desktop-gnome' | 'archlinux/current/default' | 'archlinux/current' | 'archlinux' | 'archlinux/current/default' | 'archlinux/current' | 'archlinux' | 'busybox/1.34.1/default' | 'busybox/1.34.1' | 'busybox/1.34.1/default' | 'busybox/1.34.1' | 'centos/7/cloud' | 'centos/7/default' | 'centos/7' | 'centos/7/cloud' | 'centos/7/default' | 'centos/7' | 'centos/7/cloud' | 'centos/7/default' | 'centos/7' | 'centos/7/cloud' | 'centos/7/default' | 'centos/7' | 'centos/7/cloud' | 'centos/7/default' | 'centos/7' | 'centos/8-Stream/cloud' | 'centos/8-Stream/default' | 'centos/8-Stream' | 'centos/8-Stream/cloud' | 'centos/8-Stream/default' | 'centos/8-Stream' | 'centos/8-Stream/cloud' | 'centos/8-Stream/default' | 'centos/8-Stream' | 'centos/9-Stream/cloud' | 'centos/9-Stream/default' | 'centos/9-Stream' | 'centos/9-Stream/cloud' | 'centos/9-Stream/default' | 'centos/9-Stream' | 'centos/9-Stream/cloud' | 'centos/9-Stream/default' | 'centos/9-Stream' | 'debian/bookworm/cloud' | 'debian/12/cloud' | 'debian/bookworm/default' | 'debian/12/default' | 'debian/bookworm' | 'debian/12' | 'debian/bookworm/cloud' | 'debian/12/cloud' | 'debian/bookworm/default' | 'debian/12/default' | 'debian/bookworm' | 'debian/12' | 'debian/bookworm/cloud' | 'debian/12/cloud' | 'debian/bookworm/default' | 'debian/12/default' | 'debian/bookworm' | 'debian/12' | 'debian/bookworm/cloud' | 'debian/12/cloud' | 'debian/bookworm/default' | 'debian/12/default' | 'debian/bookworm' | 'debian/12' | 'debian/bookworm/cloud' | 'debian/12/cloud' | 'debian/bookworm/default' | 'debian/12/default' | 'debian/bookworm' | 'debian/12' | 'debian/bookworm/cloud' | 'debian/12/cloud' | 'debian/bookworm/default' | 'debian/12/default' | 'debian/bookworm' | 'debian/12' | 'debian/bookworm/cloud' | 'debian/12/cloud' | 'debian/bookworm/default' | 'debian/12/default' | 'debian/bookworm' | 'debian/12' | 'debian/bullseye/cloud' | 'debian/11/cloud' | 'debian/bullseye/default' | 'debian/11/default' | 'debian/bullseye' | 'debian/11' | 'debian/bullseye/cloud' | 'debian/11/cloud' | 'debian/bullseye/default' | 'debian/11/default' | 'debian/bullseye' | 'debian/11' | 'debian/bullseye/cloud' | 'debian/11/cloud' | 'debian/bullseye/default' | 'debian/11/default' | 'debian/bullseye' | 'debian/11' | 'debian/bullseye/cloud' | 'debian/11/cloud' | 'debian/bullseye/default' | 'debian/11/default' | 'debian/bullseye' | 'debian/11' | 'debian/bullseye/cloud' | 'debian/11/cloud' | 'debian/bullseye/default' | 'debian/11/default' | 'debian/bullseye' | 'debian/11' | 'debian/bullseye/cloud' | 'debian/11/cloud' | 'debian/bullseye/default' | 'debian/11/default' | 'debian/bullseye' | 'debian/11' | 'debian/bullseye/cloud' | 'debian/11/cloud' | 'debian/bullseye/default' | 'debian/11/default' | 'debian/bullseye' | 'debian/11' | 'debian/buster/cloud' | 'debian/10/cloud' | 'debian/buster/default' | 'debian/10/default' | 'debian/buster' | 'debian/10' | 'debian/buster/cloud' | 'debian/10/cloud' | 'debian/buster/default' | 'debian/10/default' | 'debian/buster' | 'debian/10' | 'debian/buster/cloud' | 'debian/10/cloud' | 'debian/buster/default' | 'debian/10/default' | 'debian/buster' | 'debian/10' | 'debian/buster/cloud' | 'debian/10/cloud' | 'debian/buster/default' | 'debian/10/default' | 'debian/buster' | 'debian/10' | 'debian/buster/cloud' | 'debian/10/cloud' | 'debian/buster/default' | 'debian/10/default' | 'debian/buster' | 'debian/10' | 'debian/buster/cloud' | 'debian/10/cloud' | 'debian/buster/default' | 'debian/10/default' | 'debian/buster' | 'debian/10' | 'debian/buster/cloud' | 'debian/10/cloud' | 'debian/buster/default' | 'debian/10/default' | 'debian/buster' | 'debian/10' | 'debian/sid/cloud' | 'debian/sid/default' | 'debian/sid' | 'debian/sid/cloud' | 'debian/sid/default' | 'debian/sid' | 'debian/sid/cloud' | 'debian/sid/default' | 'debian/sid' | 'debian/sid/cloud' | 'debian/sid/default' | 'debian/sid' | 'debian/sid/cloud' | 'debian/sid/default' | 'debian/sid' | 'debian/sid/cloud' | 'debian/sid/default' | 'debian/sid' | 'debian/sid/cloud' | 'debian/sid/default' | 'debian/sid' | 'debian/stretch/cloud' | 'debian/9/cloud' | 'debian/stretch/default' | 'debian/9/default' | 'debian/stretch' | 'debian/9' | 'debian/stretch/cloud' | 'debian/9/cloud' | 'debian/stretch/default' | 'debian/9/default' | 'debian/stretch' | 'debian/9' | 'debian/stretch/cloud' | 'debian/9/cloud' | 'debian/stretch/default' | 'debian/9/default' | 'debian/stretch' | 'debian/9' | 'debian/stretch/cloud' | 'debian/9/cloud' | 'debian/stretch/default' | 'debian/9/default' | 'debian/stretch' | 'debian/9' | 'debian/stretch/cloud' | 'debian/9/cloud' | 'debian/stretch/default' | 'debian/9/default' | 'debian/stretch' | 'debian/9' | 'debian/stretch/cloud' | 'debian/9/cloud' | 'debian/stretch/default' | 'debian/9/default' | 'debian/stretch' | 'debian/9' | 'debian/stretch/cloud' | 'debian/9/cloud' | 'debian/stretch/default' | 'debian/9/default' | 'debian/stretch' | 'debian/9' | 'devuan/ascii/cloud' | 'devuan/ascii/default' | 'devuan/ascii' | 'devuan/ascii/cloud' | 'devuan/ascii/default' | 'devuan/ascii' | 'devuan/ascii/cloud' | 'devuan/ascii/default' | 'devuan/ascii' | 'devuan/ascii/cloud' | 'devuan/ascii/default' | 'devuan/ascii' | 'devuan/ascii/cloud' | 'devuan/ascii/default' | 'devuan/ascii' | 'devuan/beowulf/cloud' | 'devuan/beowulf/default' | 'devuan/beowulf' | 'devuan/beowulf/cloud' | 'devuan/beowulf/default' | 'devuan/beowulf' | 'devuan/beowulf/cloud' | 'devuan/beowulf/default' | 'devuan/beowulf' | 'devuan/beowulf/cloud' | 'devuan/beowulf/default' | 'devuan/beowulf' | 'devuan/beowulf/cloud' | 'devuan/beowulf/default' | 'devuan/beowulf' | 'devuan/beowulf/cloud' | 'devuan/beowulf/default' | 'devuan/beowulf' | 'devuan/chimaera/cloud' | 'devuan/chimaera/default' | 'devuan/chimaera' | 'devuan/chimaera/cloud' | 'devuan/chimaera/default' | 'devuan/chimaera' | 'devuan/chimaera/cloud' | 'devuan/chimaera/default' | 'devuan/chimaera' | 'devuan/chimaera/cloud' | 'devuan/chimaera/default' | 'devuan/chimaera' | 'devuan/chimaera/cloud' | 'devuan/chimaera/default' | 'devuan/chimaera' | 'devuan/chimaera/cloud' | 'devuan/chimaera/default' | 'devuan/chimaera' | 'fedora/34/cloud' | 'fedora/34/default' | 'fedora/34' | 'fedora/34/cloud' | 'fedora/34/default' | 'fedora/34' | 'fedora/34/cloud' | 'fedora/34/default' | 'fedora/34' | 'fedora/34/cloud' | 'fedora/34/default' | 'fedora/34' | 'fedora/34/cloud' | 'fedora/34/default' | 'fedora/34' | 'fedora/35/cloud' | 'fedora/35/default' | 'fedora/35' | 'fedora/35/cloud' | 'fedora/35/default' | 'fedora/35' | 'fedora/35/cloud' | 'fedora/35/default' | 'fedora/35' | 'fedora/35/cloud' | 'fedora/35/default' | 'fedora/35' | 'funtoo/1.4/default' | 'funtoo/1.4' | 'funtoo/1.4/default' | 'funtoo/1.4' | 'funtoo/1.4/default' | 'funtoo/1.4' | 'gentoo/current/cloud' | 'gentoo/cloud' | 'gentoo/current/openrc' | 'gentoo/openrc' | 'gentoo/current/systemd' | 'gentoo/systemd' | 'gentoo/current/openrc' | 'gentoo/openrc' | 'gentoo/current/systemd' | 'gentoo/systemd' | 'gentoo/current/openrc' | 'gentoo/openrc' | 'gentoo/current/systemd' | 'gentoo/systemd' | 'gentoo/current/cloud' | 'gentoo/cloud' | 'gentoo/current/openrc' | 'gentoo/openrc' | 'gentoo/current/systemd' | 'gentoo/systemd' | 'gentoo/current/openrc' | 'gentoo/openrc' | 'gentoo/current/systemd' | 'gentoo/systemd' | 'kali/current/cloud' | 'kali/cloud' | 'kali/current/default' | 'kali/current' | 'kali' | 'kali/current/cloud' | 'kali/cloud' | 'kali/current/default' | 'kali/current' | 'kali' | 'kali/current/cloud' | 'kali/cloud' | 'kali/current/default' | 'kali/current' | 'kali' | 'kali/current/cloud' | 'kali/cloud' | 'kali/current/default' | 'kali/current' | 'kali' | 'kali/current/cloud' | 'kali/cloud' | 'kali/current/default' | 'kali/current' | 'kali' | 'mint/tara/cloud' | 'mint/tara/default' | 'mint/tara' | 'mint/tara/cloud' | 'mint/tara/default' | 'mint/tara' | 'mint/tessa/cloud' | 'mint/tessa/default' | 'mint/tessa' | 'mint/tessa/cloud' | 'mint/tessa/default' | 'mint/tessa' | 'mint/tina/cloud' | 'mint/tina/default' | 'mint/tina' | 'mint/tina/cloud' | 'mint/tina/default' | 'mint/tina' | 'mint/tricia/cloud' | 'mint/tricia/default' | 'mint/tricia' | 'mint/tricia/cloud' | 'mint/tricia/default' | 'mint/tricia' | 'mint/ulyana/cloud' | 'mint/ulyana/default' | 'mint/ulyana' | 'mint/ulyssa/cloud' | 'mint/ulyssa/default' | 'mint/ulyssa' | 'mint/uma/cloud' | 'mint/uma/default' | 'mint/uma' | 'mint/una/cloud' | 'mint/una/default' | 'mint/una' | 'opensuse/15.3/cloud' | 'opensuse/15.3/default' | 'opensuse/15.3' | 'opensuse/15.3/desktop-kde' | 'opensuse/15.3/cloud' | 'opensuse/15.3/default' | 'opensuse/15.3' | 'opensuse/15.3/cloud' | 'opensuse/15.3/default' | 'opensuse/15.3' | 'opensuse/15.3/cloud' | 'opensuse/15.3/default' | 'opensuse/15.3' | 'opensuse/tumbleweed/cloud' | 'opensuse/tumbleweed/default' | 'opensuse/tumbleweed' | 'opensuse/tumbleweed/desktop-kde' | 'opensuse/tumbleweed/cloud' | 'opensuse/tumbleweed/default' | 'opensuse/tumbleweed' | 'opensuse/tumbleweed/cloud' | 'opensuse/tumbleweed/default' | 'opensuse/tumbleweed' | 'opensuse/tumbleweed/cloud' | 'opensuse/tumbleweed/default' | 'opensuse/tumbleweed' | 'opensuse/tumbleweed/cloud' | 'opensuse/tumbleweed/default' | 'opensuse/tumbleweed' | 'openwrt/19.07/default' | 'openwrt/19.07' | 'openwrt/19.07/default' | 'openwrt/19.07' | 'openwrt/19.07/default' | 'openwrt/19.07' | 'openwrt/21.02/default' | 'openwrt/21.02' | 'openwrt/21.02/default' | 'openwrt/21.02' | 'openwrt/21.02/default' | 'openwrt/21.02' | 'openwrt/snapshot/default' | 'openwrt/snapshot' | 'openwrt/snapshot/default' | 'openwrt/snapshot' | 'openwrt/snapshot/default' | 'openwrt/snapshot' | 'oracle/7/cloud' | 'oracle/7/default' | 'oracle/7' | 'oracle/7/cloud' | 'oracle/7/default' | 'oracle/7' | 'oracle/8/cloud' | 'oracle/8/default' | 'oracle/8' | 'oracle/8/cloud' | 'oracle/8/default' | 'oracle/8' | 'plamo/6.x/default' | 'plamo/6.x' | 'plamo/6.x/default' | 'plamo/6.x' | 'plamo/7.x/default' | 'plamo/7.x' | 'pld/current/default' | 'pld/current' | 'pld' | 'pld/current/default' | 'pld/current' | 'pld' | 'rockylinux/8/cloud' | 'rockylinux/8/default' | 'rockylinux/8' | 'rockylinux/8/cloud' | 'rockylinux/8/default' | 'rockylinux/8' | 'springdalelinux/7/cloud' | 'springdalelinux/7/default' | 'springdalelinux/7' | 'springdalelinux/7/cloud' | 'springdalelinux/7/default' | 'springdalelinux/7' | 'springdalelinux/8/cloud' | 'springdalelinux/8/default' | 'springdalelinux/8' | 'ubuntu/bionic/cloud' | 'ubuntu/18.04/cloud' | 'ubuntu/bionic/default' | 'ubuntu/18.04/default' | 'ubuntu/bionic' | 'ubuntu/18.04' | 'ubuntu/bionic/cloud' | 'ubuntu/18.04/cloud' | 'ubuntu/bionic/default' | 'ubuntu/18.04/default' | 'ubuntu/bionic' | 'ubuntu/18.04' | 'ubuntu/bionic/cloud' | 'ubuntu/18.04/cloud' | 'ubuntu/bionic/default' | 'ubuntu/18.04/default' | 'ubuntu/bionic' | 'ubuntu/18.04' | 'ubuntu/bionic/cloud' | 'ubuntu/18.04/cloud' | 'ubuntu/bionic/default' | 'ubuntu/18.04/default' | 'ubuntu/bionic' | 'ubuntu/18.04' | 'ubuntu/bionic/cloud' | 'ubuntu/18.04/cloud' | 'ubuntu/bionic/default' | 'ubuntu/18.04/default' | 'ubuntu/bionic' | 'ubuntu/18.04' | 'ubuntu/bionic/cloud' | 'ubuntu/18.04/cloud' | 'ubuntu/bionic/default' | 'ubuntu/18.04/default' | 'ubuntu/bionic' | 'ubuntu/18.04' | 'ubuntu/focal/cloud' | 'ubuntu/20.04/cloud' | 'ubuntu/focal/default' | 'ubuntu/20.04/default' | 'ubuntu/focal' | 'ubuntu/20.04' | 'ubuntu/focal/desktop' | 'ubuntu/20.04/desktop' | 'ubuntu/focal/cloud' | 'ubuntu/20.04/cloud' | 'ubuntu/focal/default' | 'ubuntu/20.04/default' | 'ubuntu/focal' | 'ubuntu/20.04' | 'ubuntu/focal/cloud' | 'ubuntu/20.04/cloud' | 'ubuntu/focal/default' | 'ubuntu/20.04/default' | 'ubuntu/focal' | 'ubuntu/20.04' | 'ubuntu/focal/cloud' | 'ubuntu/20.04/cloud' | 'ubuntu/focal/default' | 'ubuntu/20.04/default' | 'ubuntu/focal' | 'ubuntu/20.04' | 'ubuntu/focal/cloud' | 'ubuntu/20.04/cloud' | 'ubuntu/focal/default' | 'ubuntu/20.04/default' | 'ubuntu/focal' | 'ubuntu/20.04' | 'ubuntu/hirsute/cloud' | 'ubuntu/21.04/cloud' | 'ubuntu/hirsute/default' | 'ubuntu/21.04/default' | 'ubuntu/hirsute' | 'ubuntu/21.04' | 'ubuntu/hirsute/desktop' | 'ubuntu/21.04/desktop' | 'ubuntu/hirsute/cloud' | 'ubuntu/21.04/cloud' | 'ubuntu/hirsute/default' | 'ubuntu/21.04/default' | 'ubuntu/hirsute' | 'ubuntu/21.04' | 'ubuntu/hirsute/cloud' | 'ubuntu/21.04/cloud' | 'ubuntu/hirsute/default' | 'ubuntu/21.04/default' | 'ubuntu/hirsute' | 'ubuntu/21.04' | 'ubuntu/hirsute/cloud' | 'ubuntu/21.04/cloud' | 'ubuntu/hirsute/default' | 'ubuntu/21.04/default' | 'ubuntu/hirsute' | 'ubuntu/21.04' | 'ubuntu/hirsute/cloud' | 'ubuntu/21.04/cloud' | 'ubuntu/hirsute/default' | 'ubuntu/21.04/default' | 'ubuntu/hirsute' | 'ubuntu/21.04' | 'ubuntu/impish/cloud' | 'ubuntu/21.10/cloud' | 'ubuntu/impish/default' | 'ubuntu/21.10/default' | 'ubuntu/impish' | 'ubuntu/21.10' | 'ubuntu/impish/desktop' | 'ubuntu/21.10/desktop' | 'ubuntu/impish/cloud' | 'ubuntu/21.10/cloud' | 'ubuntu/impish/default' | 'ubuntu/21.10/default' | 'ubuntu/impish' | 'ubuntu/21.10' | 'ubuntu/impish/cloud' | 'ubuntu/21.10/cloud' | 'ubuntu/impish/default' | 'ubuntu/21.10/default' | 'ubuntu/impish' | 'ubuntu/21.10' | 'ubuntu/impish/cloud' | 'ubuntu/21.10/cloud' | 'ubuntu/impish/default' | 'ubuntu/21.10/default' | 'ubuntu/impish' | 'ubuntu/21.10' | 'ubuntu/impish/cloud' | 'ubuntu/21.10/cloud' | 'ubuntu/impish/default' | 'ubuntu/21.10/default' | 'ubuntu/impish' | 'ubuntu/21.10' | 'ubuntu/jammy/cloud' | 'ubuntu/22.04/cloud' | 'ubuntu/jammy/default' | 'ubuntu/22.04/default' | 'ubuntu/jammy' | 'ubuntu/22.04' | 'ubuntu/jammy/cloud' | 'ubuntu/22.04/cloud' | 'ubuntu/jammy/default' | 'ubuntu/22.04/default' | 'ubuntu/jammy' | 'ubuntu/22.04' | 'ubuntu/jammy/cloud' | 'ubuntu/22.04/cloud' | 'ubuntu/jammy/default' | 'ubuntu/22.04/default' | 'ubuntu/jammy' | 'ubuntu/22.04' | 'ubuntu/jammy/cloud' | 'ubuntu/22.04/cloud' | 'ubuntu/jammy/default' | 'ubuntu/22.04/default' | 'ubuntu/jammy' | 'ubuntu/22.04' | 'ubuntu/jammy/cloud' | 'ubuntu/22.04/cloud' | 'ubuntu/jammy/default' | 'ubuntu/22.04/default' | 'ubuntu/jammy' | 'ubuntu/22.04' | 'ubuntu/xenial/cloud' | 'ubuntu/16.04/cloud' | 'ubuntu/xenial/default' | 'ubuntu/16.04/default' | 'ubuntu/xenial' | 'ubuntu/16.04' | 'ubuntu/xenial/cloud' | 'ubuntu/16.04/cloud' | 'ubuntu/xenial/default' | 'ubuntu/16.04/default' | 'ubuntu/xenial' | 'ubuntu/16.04' | 'ubuntu/xenial/cloud' | 'ubuntu/16.04/cloud' | 'ubuntu/xenial/default' | 'ubuntu/16.04/default' | 'ubuntu/xenial' | 'ubuntu/16.04' | 'ubuntu/xenial/cloud' | 'ubuntu/16.04/cloud' | 'ubuntu/xenial/default' | 'ubuntu/16.04/default' | 'ubuntu/xenial' | 'ubuntu/16.04' | 'ubuntu/xenial/cloud' | 'ubuntu/16.04/cloud' | 'ubuntu/xenial/default' | 'ubuntu/16.04/default' | 'ubuntu/xenial' | 'ubuntu/16.04' | 'ubuntu/xenial/cloud' | 'ubuntu/16.04/cloud' | 'ubuntu/xenial/default' | 'ubuntu/16.04/default' | 'ubuntu/xenial' | 'ubuntu/16.04' | 'voidlinux/current/default' | 'voidlinux/current' | 'voidlinux' | 'voidlinux/current/musl' | 'voidlinux/musl' | 'voidlinux/current/default' | 'voidlinux/current' | 'voidlinux' | 'voidlinux/current/musl' | 'voidlinux/musl' | 'voidlinux/current/default' | 'voidlinux/current' | 'voidlinux' | 'voidlinux/current/musl' | 'voidlinux/musl' | 'voidlinux/current/default' | 'voidlinux/current' | 'voidlinux';