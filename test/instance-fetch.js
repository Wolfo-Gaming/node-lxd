const x = require('../dist/index')
const fs = require('fs')
// var c = new x.HTTP("https://localhost:8443", {
//     cert: fs.readFileSync('./auth/lxd-webui.crt'),
//     key: fs.readFileSync('./auth/lxd-webui.key'),
//     rejectUnauthorized: false
// })
var c = new x.Client("https://10.17.167.238:8443/", {type: "http", "cert": fs.readFileSync('./auth/cert.crt'), key: fs.readFileSync('./auth/key.key'),rejectUnauthorized: false})
async function test() {
  try {
    var cont = await c.fetchInstances()
    var exec = await cont[0].fetchBackup("Test2")
    console.log(await exec.rename("Test3"))
  } catch (error) {
    console.log(error)
  }

}

test()