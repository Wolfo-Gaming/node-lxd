export interface Resources {
    type: string;
    status: string;
    status_code: number;
    operation: string;
    error_code: number;
    error: string;
    metadata: {
        cpu: {
            architecture: string;
            sockets: {
                name: string;
                vendor: string;
                socket: number;
                cache: {
                    level: number;
                    type: string;
                    size: number;
                }[];
                cores: {
                    core: number;
                    die: number;
                    threads: {
                        id: number;
                        numa_node: number;
                        thread: number;
                        online: boolean;
                        isolated: boolean;
                    }[];
                    frequency: number;
                }[];
                frequency: number;
                frequency_minimum: number;
                frequency_turbo: number;
            }[];
            total: number;
        };
        memory: {
            nodes: {
                numa_node: number;
                hugepages_used: number;
                hugepages_total: number;
                used: number;
                total: number;
            }[];
            hugepages_total: number;
            hugepages_used: number;
            hugepages_size: number;
            used: number;
            total: number;
        };
        gpu: {
            cards: {
                driver: string;
                driver_version: string;
                drm: {
                    id: number;
                    card_name: string;
                    card_device: string;
                    control_name: string;
                    control_device: string;
                    render_name: string;
                    render_device: string;
                };
                numa_node: number;
                pci_address: string;
                vendor: string;
                vendor_id: string;
                product: string;
                product_id: string;
            }[];
            total: number;
        };
        network: {
            cards: {
                driver: string;
                driver_version: string;
                ports: {
                    id: string;
                    address: string;
                    port: number;
                    protocol: string;
                    supported_modes?: string[];
                    supported_ports?: string[];
                    port_type?: string;
                    transceiver_type?: string;
                    auto_negotiation: boolean;
                    link_detected: boolean;
                    link_speed?: number;
                    link_duplex?: string;
                }[];
                numa_node: number;
                pci_address: string;
                vendor: string;
                vendor_id: string;
                product: string;
                product_id: string;
                firmware_version: string;
            }[];
            total: number;
        };
        storage: {
            disks: {
                id: string;
                device: string;
                model: string;
                type: string;
                read_only: boolean;
                size: number;
                removable: boolean;
                wwn: string;
                numa_node: number;
                device_path: string;
                block_size: number;
                firmware_version: string;
                rpm: number;
                serial: string;
                device_id: string;
                partitions: {
                    id: string;
                    device: string;
                    read_only: boolean;
                    size: number;
                    partition: number;
                }[];
            };
            total: number;
        };
        usb: {
            devices: {
                bus_address: number;
                device_address: number;
                interfaces: {
                    class: string;
                    class_id: number;
                    driver: string;
                    driver_version: string;
                    number: number;
                    subclass: string;
                    subclass_id: number;
                }[];
                vendor: string;
                vendor_id: string;
                product: string;
                product_id: string;
                speed: number;
            }[];
            total: number;
        };
        pci: {
            devices: {
                driver: string;
                driver_version: string;
                numa_node: number;
                pci_address: string;
                vendor: string;
                vendor_id: string;
                product: string;
                product_id: string;
                iommu_group: number;
            }[];
            total: number;
        };
        system: {
            uuid: string;
            vendor: string;
            product: string;
            family: string;
            version: string;
            sku: string;
            serial: string;
            type: string;
            firmware: {
                vendor: string;
                date: string;
                version: string;
            };
            chassis: {
                vendor: string;
                type: string;
                serial: string;
                version: string;
            };
            motherboard: {
                vendor: string;
                product: string;
                serial: string;
                version: string;
            };
        };
    };
}
