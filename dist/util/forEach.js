"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEachObject = void 0;
function forEachObject(object, iterator) {
    var keys = Object.keys(object);
    keys.forEach((key) => {
        //@ts-expect-error
        iterator(key, object[key]);
    });
}
exports.forEachObject = forEachObject;
