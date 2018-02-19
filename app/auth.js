const auth = require('authentication')
const usuarioDAO = require('./dao/usuarioDAO')
const hashingUtil = require('./util/hashingUtil')
const HttpStatus = require('./util/HttpStatus')

function login (params, request, response) {
  const senhaEmHash = hashingUtil.gerarHashSenha(params.password)
  const usuario = usuarioDAO.pesquisarPorNomeESenha(params.username, senhaEmHash)

  if (usuario) {
    autenticarUsuario(params, request, response, usuario)
  } else {
    negarLogin(response)
  }
}

function logout (params, request, response) {
  auth.destroyAuthentication(params, request, response)
}

function autenticarUsuario (params, request, response, usuario) {
  const idUsuario = usuario.id
  const dadosDoToken = {
    name: params.nome,
    role: 'admin'
  }
  auth.createAuthentication(params, request, response, idUsuario, 'idDoApp', dadosDoToken)
}

function negarLogin (response) {
  response.json({message: 'Usuário ou senha incorretos.'}, HttpStatus.BAD_REQUEST)
}

exports = {
  login: login,
  logout: logout
}
