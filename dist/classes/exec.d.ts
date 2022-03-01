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
    send(data: Buffer): void;
    sendControl(data: string): void;
    constructor(control: WebSocket, term: WebSocket, data: {});
}
