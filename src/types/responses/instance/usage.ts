export interface InstanceUsage {
    state: string,
    pid: number,
    processes: number,
    cpu: {
        percent: number,
        ns: number,
    },
    memory: {
        percent_used: number,
        percent_free: number,
        free: number,
        used: number,
        total: number
    },
    network: {
       [key: string]: {
           received: number,
           sent: number,
           packets_sent: number,
           packets_received: number
       }
    },
    disk: {
        [key: string]: {
            usage: number
        }
    }
}