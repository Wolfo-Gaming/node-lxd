import { TypedEmitter } from "tiny-typed-emitter";
import { ExecEvents } from "../types/types";
import { RawData, WebSocket } from "ws";

export class ExecEmitter extends TypedEmitter<ExecEvents> {
    control: WebSocket;
    term: WebSocket;
    operation: string;
    created_at: string;
    cancelable: boolean;
    send(data: Buffer): void {
        this.term.send(data, {binary: true})
    }
    sendControl(data: string): void {
        this.control.send(data)
    }
    constructor(control: WebSocket, term: WebSocket, data: {}) {
       super()
       //@ts-expect-error
       this.operation = data.metadata.id;
       //@ts-expect-error
       this.created_at = data.metadata.created_at
       //@ts-expect-error
       this.cancelable = data.metadata.may_cancel
       this.control = control;
       this.term = term
       var consoleListener = (data: RawData) => {
        if (data.toString() == "") {
            this.term.removeListener("message", consoleListener)
            this.control.removeListener("message", controlListener)
            this.emit('exit')
        } else {
            // @ts-expect-error
            this.emit('data', data)
        }

    }
    var controlListener = (data: RawData) => {
        this.emit('control', data.toString())
    }
       this.term.on('message', consoleListener)
       this.control.on('message', controlListener)
    }
}