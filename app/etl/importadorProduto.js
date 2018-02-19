const etl = require('etl')
const produtoDAO = require('../dao/produtoDAO')
const planilhaValidator = require('../util/planilhaValidator')

function importar (planilhaAnexa) {
  planilhaValidator.validarTipoArquivo(planilhaAnexa.submittedFileName)
  const planilhaEmDisco = salvarPlanilhaEmDisco(planilhaAnexa)
  processarPlanilha(planilhaEmDisco)
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

exports = {
  importar: importar
}
