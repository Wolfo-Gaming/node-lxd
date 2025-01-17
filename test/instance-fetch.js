const x = require('../dist/index')
const fs = require('fs')
// var c = new x.HTTP("https://localhost:8443", {
//     cert: fs.readFileSync('./auth/lxd-webui.crt'),
//     key: fs.readFileSync('./auth/lxd-webui.key'),
//     rejectUnauthorized: false
// })
var c = new x.Client("https://10.17.167.1:8994/", { type: "http", "cert": fs.readFileSync('./auth/client.crt'), key: fs.readFileSync('./auth/client.key'), rejectUnauthorized: false })
async function test() {
  try {
    var cont = await c.createInstance("test", {
      image: "ubuntu/focal"
    })
    cont.on("progress", console.log);
    cont.on("finished", (instance) => {
      console.log(instance.toJSON())
      instance.setStatus("stop", true).then(() => {
        console.log("stopped")
        instance.remove().then(() => {
          console.log("Deleted")
        })
      })
    })
  } catch (error) {
    console.log(error)
  }

}

test()