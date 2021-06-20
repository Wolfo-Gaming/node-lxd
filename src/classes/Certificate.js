const exec = require('exec')
var utils = require('../utils');
var fs = require('fs');
var Process = require('./Process');
var TaskQueue = require('./utilities/TaskQueue');
var OperationError = require('./OperationError');
var path_ = require('path');

// file system

class Certificate {

    constructor(client, metadata) {
        this._client = client;
        /**
        * @typedef {Object} Certificate
        * @property {string} certificate
        * @property {string} fingerprint
        * @property {string} name
        * @property {string[]} projects
        * @property {boolean} restricted
        * @property {string} type
        */
        /**
         * @type {Certificate}
         */
        this._metadata = metadata;
    }
}
module.exports = Certificate