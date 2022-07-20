export declare type NetworkForward = {
    "config": any;
    "description": string;
    "listen_address": string;
    "location": string;
    "ports": {
        "description": string;
        "listen_port": string;
        "protocol": "tcp" | "udp";
        "target_address": string;
        "target_port": string;
    }[];
};
