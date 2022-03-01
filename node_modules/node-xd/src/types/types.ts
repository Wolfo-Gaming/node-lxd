import Instance from "../classes/Instance";

export namespace Info {

    export interface Config {
        "core.https_address": string;
        "core.trust_password": boolean;
    }

    export interface KernelFeatures {
        netnsid_getifaddrs: string;
        seccomp_listener: string;
        seccomp_listener_continue: string;
        shiftfs: string;
        uevent_injection: string;
        unpriv_fscaps: string;
    }

    export interface LxcFeatures {
        cgroup2: string;
        core_scheduling: string;
        devpts_fd: string;
        idmapped_mounts_v2: string;
        mount_injection_file: string;
        network_gateway_device_route: string;
        network_ipvlan: string;
        network_l2proxy: string;
        network_phys_macvlan_mtu: string;
        network_veth_router: string;
        pidfd: string;
        seccomp_allow_deny_syntax: string;
        seccomp_notify: string;
        seccomp_proxy_send_notify_fd: string;
    }

    export interface StorageSupportedDriver {
        Name: string;
        Version: string;
        Remote: boolean;
    }

    export interface Environment {
        addresses: string[];
        architectures: string[];
        certificate: string;
        certificate_fingerprint: string;
        driver: string;
        driver_version: string;
        firewall: string;
        kernel: string;
        kernel_architecture: string;
        kernel_features: KernelFeatures;
        kernel_version: string;
        lxc_features: LxcFeatures;
        os_name: string;
        os_version: string;
        project: string;
        server: string;
        server_clustered: boolean;
        server_name: string;
        server_pid: number;
        server_version: string;
        storage: string;
        storage_version: string;
        storage_supported_drivers: StorageSupportedDriver[];
    }

    export interface Metadata {
        config: Config;
        api_extensions: string[];
        api_status: string;
        api_version: string;
        auth: string;
        public: boolean;
        auth_methods: string[];
        environment: Environment;
    }

    export interface RootObject {
        type: string;
        status: string;
        status_code: number;
        operation: string;
        error_code: number;
        error: string;
        metadata: Metadata;
    }

}
export namespace InstanceData {

    export interface Config {
        "image.architecture": string;
        "image.build": string;
        "image.description": string;
        "image.distribution": string;
        "image.name": string;
        "image.os": string;
        "image.release": string;
        "image.serial": string;
        "image.variant": string;
        "volatile.base_image": string;
        "volatile.eth0.host_name": string;
        "volatile.eth0.hwaddr": string;
        "volatile.idmap.base": string;
        "volatile.idmap.current": string;
        "volatile.idmap.next": string;
        "volatile.last_state.idmap": string;
        "volatile.last_state.power": string;
        "volatile.uuid": string;
    }

    export interface Devices {
    }

    export interface ExpandedConfig {
        "image.architecture": string;
        "image.build": string;
        "image.description": string;
        "image.distribution": string;
        "image.name": string;
        "image.os": string;
        "image.release": string;
        "image.serial": string;
        "image.variant": string;
        "volatile.base_image": string;
        "volatile.eth0.host_name": string;
        "volatile.eth0.hwaddr": string;
        "volatile.idmap.base": string;
        "volatile.idmap.current": string;
        "volatile.idmap.next": string;
        "volatile.last_state.idmap": string;
        "volatile.last_state.power": string;
        "volatile.uuid": string;
    }

    export interface Eth0 {
        name: string;
        network: string;
        type: string;
    }

    export interface Root {
        path: string;
        pool: string;
        type: string;
    }

    export interface ExpandedDevices {
        eth0: Eth0;
        root: Root;
    }

    export interface Metadata {
        architecture: string;
        config: Config;
        devices: Devices;
        ephemeral: boolean;
        profiles: string[];
        stateful: boolean;
        description: string;
        created_at: string;
        expanded_config: ExpandedConfig;
        expanded_devices: ExpandedDevices;
        name: string;
        status: string;
        status_code: number;
        last_used_at: string;
        location: string;
        type: string;
    }

    export interface RootObject {
        type: string;
        status: string;
        status_code: number;
        operation: string;
        error_code: number;
        error: string;
        metadata: Metadata;
    }

}
export namespace CreateInstance {

    export interface Config {
        "security.nesting": string;
    }

    export interface Root {
        path: string;
        pool: string;
        type: string;
    }

    export interface Devices {
        root: Root;
    }

    export interface Properties {
        os: string;
        release: string;
        variant: string;
    }

    export interface Secrets {
        criu: string;
        rsync: string;
    }

    export interface Source {
        alias: string;
        "base-image": string;
        certificate: string;
        container_only: boolean;
        fingerprint: string;
        instance_only: boolean;
        live: boolean;
        mode: string;
        operation: string;
        project: string;
        properties: Properties;
        protocol: string;
        refresh: boolean;
        secret: string;
        secrets: Secrets;
        server: string;
        source: string;
        type: string;
    }

    export interface RootObject {
        architecture: string;
        config: Config;
        description: string;
        devices: Devices;
        ephemeral: boolean;
        instance_type: string;
        profiles: string[];
        restore: string;
        stateful: boolean;
        type: string;
    }
}
export namespace Resources {

    export interface Cache {
        level: number;
        type: string;
        size: number;
    }

    export interface Thread {
        id: number;
        numa_node: number;
        thread: number;
        online: boolean;
        isolated: boolean;
    }

    export interface Core {
        core: number;
        die: number;
        threads: Thread[];
    }

    export interface Socket {
        name: string;
        vendor: string;
        socket: number;
        cache: Cache[];
        cores: Core[];
    }

    export interface Cpu {
        architecture: string;
        sockets: Socket[];
        total: number;
    }

    export interface Node {
        numa_node: number;
        hugepages_used: number;
        hugepages_total: number;
        used: any;
        total: any;
    }

    export interface Memory {
        nodes: Node[];
        hugepages_total: number;
        hugepages_used: number;
        hugepages_size: number;
        used: number;
        total: number;
    }

    export interface Drm {
        id: number;
        card_name: string;
        card_device: string;
        control_name: string;
        control_device: string;
        render_name: string;
        render_device: string;
    }

    export interface Card {
        driver: string;
        driver_version: string;
        drm: Drm;
        numa_node: number;
        pci_address: string;
        vendor: string;
        vendor_id: string;
        product: string;
        product_id: string;
    }

    export interface Gpu {
        cards: Card[];
        total: number;
    }

    export interface Port {
        id: string;
        address: string;
        port: number;
        protocol: string;
        supported_modes: string[];
        supported_ports: string[];
        port_type: string;
        transceiver_type: string;
        auto_negotiation: boolean;
        link_detected: boolean;
        link_speed: number;
        link_duplex: string;
    }

    export interface Card2 {
        driver: string;
        driver_version: string;
        ports: Port[];
        numa_node: number;
        pci_address: string;
        vendor: string;
        vendor_id: string;
        product: string;
        product_id: string;
        firmware_version: string;
    }

    export interface Network {
        cards: Card2[];
        total: number;
    }

    export interface Partition {
        id: string;
        device: string;
        read_only: boolean;
        size: any;
        partition: number;
    }

    export interface Disk {
        id: string;
        device: string;
        model: string;
        type: string;
        read_only: boolean;
        size: any;
        removable: boolean;
        numa_node: number;
        device_path: string;
        block_size: number;
        firmware_version: string;
        rpm: number;
        serial: string;
        device_id: string;
        partitions: Partition[];
    }

    export interface Storage {
        disks: Disk[];
        total: number;
    }

    export interface Interface {
        class: string;
        class_id: number;
        driver: string;
        driver_version: string;
        number: number;
        subclass: string;
        subclass_id: number;
    }

    export interface Device {
        bus_address: number;
        device_address: number;
        interfaces: Interface[];
        vendor: string;
        vendor_id: string;
        product: string;
        product_id: string;
        speed: number;
    }

    export interface Usb {
        devices: Device[];
        total: number;
    }

    export interface Device2 {
        driver: string;
        driver_version: string;
        numa_node: number;
        pci_address: string;
        vendor: string;
        vendor_id: string;
        product: string;
        product_id: string;
        iommu_group: number;
    }

    export interface Pci {
        devices: Device2[];
        total: number;
    }

    export interface Firmware {
        vendor: string;
        date: string;
        version: string;
    }

    export interface Chassis {
        vendor: string;
        type: string;
        serial: string;
        version: string;
    }

    export interface Motherboard {
        vendor: string;
        product: string;
        serial: string;
        version: string;
    }

    export interface System {
        uuid: string;
        vendor: string;
        product: string;
        family: string;
        version: string;
        sku: string;
        serial: string;
        type: string;
        firmware: Firmware;
        chassis: Chassis;
        motherboard: Motherboard;
    }

    export interface Metadata {
        cpu: Cpu;
        memory: Memory;
        gpu: Gpu;
        network: Network;
        storage: Storage;
        usb: Usb;
        pci: Pci;
        system: System;
    }

    export interface RootObject {
        type: string;
        status: string;
        status_code: number;
        operation: string;
        error_code: number;
        error: string;
        metadata: Metadata;
    }

}
import { EventEmitter } from "events";
export interface CreateEmitter extends EventEmitter {
    on(event: "finished", c: (Instance: Instance) => void)
    on(event: "progress", c: (progress: number) => void)
    on(event: "error", c: (error: string) => void)
}
export interface BridgeConfig {
    "bgp.ipv4.nexthop": string,
    "bgp.ipv6.nexthop": string,
    "bridge.driver": string,
    "bridge.external_interfaces": string,
    "bridge.hwaddr": string,
    "bridge.mode": string,
    "bridge.mtu": number,
    "dns.domain": string,
    "dns.mode": string,
    "dns.search": string,
    "dns.zone.forward": string,
    "dns.zone.reverse.ipv4": string,
    "dns.zone.reverse.ipv6": string,
    "fan.overlay_subnet": string,
    "fan.type": string,
    "fan.underlay_subnet": string,
    "ipv4.dhcp": boolean,
    "ipv4.dhcp.expiry": string,
    "ipv4.dhcp.gateway": string,
    "ipv4.address": string,
    "ipv4.dhcp.ranges": string,
    "ipv4.firewall": boolean,
    "ipv4.nat.address": string,
    "ipv4.nat": boolean,
    "ipv4.nat.order": string,
    "ipv4.ovn.ranges": string,
    "ipv4.routes": string,
    "ipv4.routing": boolean,
    "ipv6.address": string,
    "ipv6.dhcp": boolean,
    "ipv6.dhcp.expiry": string,
    "ipv6.dhcp.ranges": string,
    "ipv6.dhcp.stateful": boolean,
    "ipv6.firewall": boolean,
    "ipv6.nat.address": string,
    "ipv6.nat": boolean,
    "ipv6.nat.order": string,
    "ipv6.ovn.ranges": string,
    "ipv6.routes": string,
    "ipv6.routing": boolean,
    "maas.subnet.ipv4": string,
    "maas.subnet.ipv6": string,
    "raw.dnsmasq": string,
    "security.acls": string,
    "security.acls.default.ingress.action": string,
    "security.acls.default.egress.action": string,
    "security.acls.default.ingress.logged": boolean,
    "security.acls.default.egress.logged": boolean
}

