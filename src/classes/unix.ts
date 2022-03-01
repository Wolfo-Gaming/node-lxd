import { Axios, AxiosRequestConfig } from "axios";
import { WebSocket } from "ws"
export class UNIX {
    static DEFAULT_SOCKET = "/var/snap/lxd/common/lxd/unix.socket"
    axios: Axios;
    socket: URL;

    get(url: string, config?: AxiosRequestConfig): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.axios.get(url, config).then((data) => {
                resolve(data.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    post(url: string, data: any, config?: AxiosRequestConfig): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.axios.post(url, JSON.stringify(data), config).then((data) => {
                resolve(data.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    put(url: string, data: any, config?: AxiosRequestConfig): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.axios.put(url, JSON.stringify(data), config).then((data) => {
                resolve(data.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    patch(url: string, data: any, config?: AxiosRequestConfig): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.axios.patch(url, JSON.stringify(data), config).then((data) => {
                resolve(data.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    delete(url: string, config?: AxiosRequestConfig): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.axios.delete(url, config).then((data) => {
                resolve(data.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    websocket(url: string): WebSocket {
        return new WebSocket("ws+unix://" + this.socket.pathname + ":" + url)
    }
    constructor(socket: string) {
        this.socket = new URL("unix://"+ socket);
        this.axios = new Axios({
            socketPath: socket,
        })
    }
}
