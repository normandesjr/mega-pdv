const server = require('http')
const router = require('router')
const auth = require('authentication')

router.addMiddleware(auth)

const routes = require('./routes/index')
routes.registrar(router)

server.createServer(8778, router)
