let server = require('http')
let router = require('router')
let auth = require('authentication')

router.addMiddleware(auth)

let routers = require('./config/router/routers')
routers.registrar(router)

server.createServer(8778, router)
