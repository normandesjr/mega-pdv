let produtoDAO = require('./dao/produtoDAO')
let importadorProduto = require('./etl/importadorProduto')

function pesquisar (params, request, response) {
  response.json(produtoDAO.pesquisar())
}

function salvar (params, request, response) {
  produtoDAO.salvar(params)
  response.status = 201
}

function remover (params, request, response) {
  produtoDAO.remover(params.id)
  response.status = 204
}

function atualizar (params, request, response) {
  produtoDAO.atualizar(params)
}

function importar (params, request, response) {
  let planilhaAnexa = request.httpRequest.getPart('file')
  importadorProduto.importar(planilhaAnexa)
}

exports = {
  GET: {
    default: pesquisar
  },
  POST: {
    default: salvar,
    importacao: importar
  },
  DELETE: {
    default: remover
  },
  PUT: {
    default: atualizar
  }
}
