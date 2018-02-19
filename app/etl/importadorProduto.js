const etl = require('etl')
const produtoDAO = require('../dao/produtoDAO')

function importar (planilhaAnexa) {
  validarTipoArquivo(planilhaAnexa)
  const planilhaEmDisco = salvarPlanilhaEmDisco(planilhaAnexa)
  processarPlanilha(planilhaEmDisco)
}

function validarTipoArquivo (planilhaAnexa) {
  const nomeArquivo = planilhaAnexa.submittedFileName
  if (!nomeArquivo.endsWith('xlsx')) {
    throw new ImportacaoException('O tipo do arquivo deve ser xlsx')
  }
}

function salvarPlanilhaEmDisco (planilhaAnexa) {
  const nomeArquivo = planilhaAnexa.submittedFileName
  const planilhaEmDisco = new java.io.File(nomeArquivo).getAbsolutePath() // eslint-disable-line
  planilhaAnexa.write(planilhaEmDisco)
  return planilhaEmDisco
}

function processarPlanilha (planilhaEmDisco) {
  etl({})
    .set_input_xlsx_file(planilhaEmDisco, 0)
    .take_fields_from_header_row()
    .for_each(function (options, values) {
      const produto = {
        nome: values.A,
        descricao: values.B,
        preco: values.C
      }
      produtoDAO.salvar(produto)
    })
}

function ImportacaoException (mensagem) {
  this.mensagem = mensagem
}

exports = {
  importar: importar
}
