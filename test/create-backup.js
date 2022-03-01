const x = require('../dist/index')
const fs = require('fs')
const { emit } = require('process')
// var c = new x.HTTP("https://localhost:8443", {
//     cert: fs.readFileSync('./auth/lxd-webui.crt'),
//     key: fs.readFileSync('./auth/lxd-webui.key'),
//     rejectUnauthorized: false
// })
var c = new x.Client(null, {type: "unix"})
async function test() {
  console.log(await c.client.get('/1.0/metrics'))
}
test()