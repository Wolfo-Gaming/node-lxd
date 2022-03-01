import { Axios, AxiosRequestConfig } from "axios";
import { WebSocket } from "ws";
export declare class UNIX {
    static DEFAULT_SOCKET: string;
    axios: Axios;
    socket: URL;
    get(url: string, config?: AxiosRequestConfig): Promise<{}>;
    post(url: string, data: any, config?: AxiosRequestConfig): Promise<{}>;
    put(url: string, data: any, config?: AxiosRequestConfig): Promise<{}>;
    patch(url: string, data: any, config?: AxiosRequestConfig): Promise<{}>;
    delete(url: string, config?: AxiosRequestConfig): Promise<{}>;
    websocket(url: string): WebSocket;
    constructor(socket: string);
}
