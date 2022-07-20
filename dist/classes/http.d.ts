/// <reference types="node" />
import { Axios, AxiosRequestConfig } from "axios";
import { WebSocket } from "ws";
import { Agent } from "https";
export declare class HTTP {
    axios: Axios;
    agent: Agent;
    url: URL;
    options: {
        cert: Buffer;
        key: Buffer;
        rejectUnauthorized: boolean;
    };
    get(url: string, config?: AxiosRequestConfig): Promise<any>;
    post(url: string, data: any, config?: AxiosRequestConfig): Promise<any>;
    put(url: string, data: any, config?: AxiosRequestConfig): Promise<any>;
    patch(url: string, data: any, config?: AxiosRequestConfig): Promise<any>;
    delete(url: string, config?: AxiosRequestConfig): Promise<any>;
    websocket(url: string): WebSocket;
    constructor(url: string, options: {
        cert: Buffer;
        key: Buffer;
        rejectUnauthorized: boolean;
    });
}
