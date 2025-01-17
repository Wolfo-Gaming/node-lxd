# Node LXD 
![npm](https://badges.aleen42.com/src/npm.svg) [![npm version](https://badge.fury.io/js/@wolfogaming%2Fnode-lxd.svg)](https://github.com/Wolfo-Gaming/node-lxd) ![typescript](https://badges.aleen42.com/src/typescript.svg)

A client for communicating with a local or remote instance of LXD.

# Installing

```bash
$ npm install --save @wolfogaming/node-lxd
```

## Getting Started ##

The following example connects to the local LXD instance and launches a new instance.

```js
var { Client } = require("@wolfogaming/node-lxd");

var client = new Client(null, {type:"unix"});

client.createInstance("improved-elk", {
    "config": {
        "limits.cpu": 3,
        "limits.memory": "1GB",
        "security.nesting": true
    },
    "image": "ubuntu/21.04",
    "description": "test Instance",
    "profiles": ["default"]
}).then((emitter) => {
   emitter.on('progress', (progress) => {
       console.log(progress, "% completed")
   })
   emitter.on('finished', (instance) => {
       console.log("finished creating instance " + instance.name())
   })
})

```
## Optional dependencies ##

SFTP support: [node-lxd-sftp](https://github.com/Wolfo-Gaming/node-lxd-sftp)
