let auth = require('authentication')
let usuarioDAO = require('./dao/usuarioDAO')

function login (params, request, response) {
  let senhaEmHash = gerarHashSenha(params.password)
  let usuario = usuarioDAO.pesquisarPorNomeESenha(params.username, senhaEmHash)

  if (usuario) {
    autenticarUsuario(params, request, response, usuario)
  } else {
    negarLogin(response)
  }
}

function logout (params, request, response) {
  auth.destroyAuthentication(params, request, response)
}

function gerarHashSenha (password) {
  let hashFunction = com.google.common.hash.Hashing.sha256() // eslint-disable-line
  return hashFunction.newHasher()
    .putString(password, com.google.common.base.Charsets.UTF_8) // eslint-disable-line
    .hash()
    .toString()
}

function autenticarUsuario (params, request, response, usuario) {
  let idUsuario = usuario.id
  let dadosDoToken = {
    name: params.nome,
    role: 'admin'
  }
  auth.createAuthentication(params, request, response, idUsuario, 'idDoApp', dadosDoToken)
  response.json({loginOk: true})
}

function negarLogin (response) {
  response.json({loginOk: false, message: 'Usuário ou senha incorretos.'})
}

exports = {
  login: login,
  logout: logout
}
