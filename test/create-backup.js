const x = require('../dist/index')
const fs = require('fs')
const { emit } = require('process')
var c = new x.Client("https://10.17.167.238:8443/", {type: "http", "cert": fs.readFileSync('./auth/cert.crt'), key: fs.readFileSync('./auth/key.key'),rejectUnauthorized: false})

async function test() {
  console.log(await c.fetchStoragePools())
  var instance = await c.fetchInstance("enormous-polecat")
  console.log( c.fetchInstance("enormous-polecat") instanceof Promise)
  console.log((await instance.fetchNetworks()))
}
test()