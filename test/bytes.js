const x = require('../dist/index')

var client = new x.Client(null, {type: "unix"})
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
