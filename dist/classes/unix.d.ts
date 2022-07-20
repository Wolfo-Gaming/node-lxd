import { Axios, AxiosRequestConfig } from "axios";
import { WebSocket } from "ws";
export declare class UNIX {
    static DEFAULT_SOCKET: string;
    axios: Axios;
    socket: URL;
    get(url: string, config?: AxiosRequestConfig): Promise<any>;
    post(url: string, data: any, config?: AxiosRequestConfig): Promise<any>;
    put(url: string, data: any, config?: AxiosRequestConfig): Promise<any>;
    patch(url: string, data: any, config?: AxiosRequestConfig): Promise<any>;
    delete(url: string, config?: AxiosRequestConfig): Promise<any>;
    websocket(url: string): WebSocket;
    constructor(socket: string);
}
