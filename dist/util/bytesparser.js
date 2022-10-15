"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBytes = void 0;
/**
 * Returns bytes from human readable string
 */
var GB_divide = 1000000000;
var MB_divide = 1000000;
function parseBytes(humanReadable) {
    var size = parseFloat(humanReadable.split('').map(s => {
        // console.log(isNaN(parseFloat(s)))
        if (isNaN(parseFloat(s))) {
            if (s == ".") {
                return s;
            }
            return;
        }
        else {
            return s;
        }
    }).filter(n => n).join(''));
    var unit = humanReadable.split('').map(s => {
        // console.log(isNaN(parseFloat(s)))
        if (isNaN(parseFloat(s)) != true) {
            return;
        }
        else {
            if (s == ".") {
                return;
            }
            return s;
        }
    }).filter(n => n).join('');
    //console.log({unit,size})
    if (unit == "GB") {
        return size * GB_divide;
    }
    else if (unit == "MB") {
        return size * MB_divide;
    }
}
exports.parseBytes = parseBytes;
