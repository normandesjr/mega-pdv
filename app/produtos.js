const produtoDAO = require('./dao/produtoDAO')
const importadorProduto = require('./etl/importadorProduto')
const HttpStatus = require('./util/HttpStatus')

function pesquisar (params, request, response) {
  response.json(produtoDAO.pesquisar())
}

function salvar (params, request, response) {
  produtoDAO.salvar(params)
  response.status = HttpStatus.CREATED
}

function remover (params, request, response) {
  produtoDAO.remover(params.id)
  response.status = HttpStatus.NOT_FOUND
}

function atualizar (params, request, response) {
  produtoDAO.atualizar(params)
}

function importar (params, request, response) {
  const planilhaAnexa = request.httpRequest.getPart('file')
  try {
    importadorProduto.importar(planilhaAnexa)
  } catch (e) {
    response.json({message: e.mensagem}, HttpStatus.BAD_REQUEST)
  }
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
