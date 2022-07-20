export type NetworkState = {
    "addresses": {
        "address": string,
        "family": string,
        "netmask": string,
        "scope": string
    }[],
    "bond": {
        "down_delay": number,
        "lower_devices": string[],
        "mii_frequency": number,
        "mii_state": string,
        "mode": string,
        "transmit_policy": string,
        "up_delay": number
    },
    "bridge": {
        "forward_delay": number,
        "id": string,
        "stp": boolean,
        "upper_devices": string[],
        "vlan_default": number,
        "vlan_filtering": boolean
    },
    "counters": {
        "bytes_received": number,
        "bytes_sent": number,
        "packets_received": number,
        "packets_sent": number
    },
    "hwaddr": string,
    "mtu": number,
    "ovn": {
        "chassis": string
    },
    "state": string,
    "type": string,
    "vlan": {
        "lower_device": string,
        "vid": number
    }
}