/// <reference types="node" />
import { TypedEmitter } from "tiny-typed-emitter";
import { ExecEvents } from "../types/types";
import { WebSocket } from "ws";
export declare class ExecEmitter extends TypedEmitter<ExecEvents> {
    control: WebSocket;
    term: WebSocket;
    operation: string;
    created_at: string;
    cancelable: boolean;
    constructor(control: WebSocket, term: WebSocket, data: any);
    close(): void;
    send(data: Buffer): void;
    sendControl(data: string): void;
}
