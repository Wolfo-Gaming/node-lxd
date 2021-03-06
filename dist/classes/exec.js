"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecEmitter = void 0;
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
class ExecEmitter extends tiny_typed_emitter_1.TypedEmitter {
    constructor(control, term, data) {
        super();
        this.operation = data.metadata.id;
        this.created_at = data.metadata.created_at;
        this.cancelable = data.metadata.may_cancel;
        this.control = control;
        this.term = term;
        var consoleListener = (data) => {
            if (data.toString() == "") {
                this.term.removeListener("message", consoleListener);
                this.control.removeListener("message", controlListener);
                this.emit('exit');
            }
            else {
                this.emit('data', data);
            }
        };
        var controlListener = (data) => {
            this.emit('control', data.toString());
        };
        this.term.on('message', consoleListener);
        this.control.on('message', controlListener);
    }
    close() {
        this.term.close();
        this.control.close();
    }
    send(data) {
        this.term.send(data, { binary: true });
    }
    sendControl(data) {
        this.control.send(data);
    }
}
exports.ExecEmitter = ExecEmitter;
