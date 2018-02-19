let server = require('http')
let router = require('router')
let auth = require('authentication')

router.addMiddleware(auth)

let routes = require('./config/router/routes')
routes.registrar(router)

server.createServer(8778, router)
