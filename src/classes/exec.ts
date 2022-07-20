import { TypedEmitter } from "tiny-typed-emitter";
import { ExecEvents } from "../types/types";
import { WebSocket } from "ws";

export class ExecEmitter extends TypedEmitter<ExecEvents> {
    control: WebSocket;
    term: WebSocket;
    operation: string;
    created_at: string;
    cancelable: boolean;
    constructor(control: WebSocket, term: WebSocket, data: any) {
       super()
       
       this.operation = data.metadata.id;
       
       this.created_at = data.metadata.created_at
       
       this.cancelable = data.metadata.may_cancel
       this.control = control;
       this.term = term
       var consoleListener = (data: any) => {
        if (data.toString() == "") {
            this.term.removeListener("message", consoleListener)
            this.control.removeListener("message", controlListener)
            this.emit('exit')
        } else {
            
            this.emit('data', data)
        }

    }
    var controlListener = (data: any) => {
        this.emit('control', data.toString())
    }
       this.term.on('message', consoleListener)
       this.control.on('message', controlListener)
    }
    close(): void {
        this.term.close()
        this.control.close()
    }
    send(data: Buffer): void {
        this.term.send(data, {binary: true})
    }
    sendControl(data: string): void {
        this.control.send(data)
    }
}