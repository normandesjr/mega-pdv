let etl = require('etl')
let produtoDAO = require('../dao/produtoDAO')

function importar (planilhaAnexa) {
  let nomeArquivo = planilhaAnexa.submittedFileName
  let planilhaEmDisco = new java.io.File(nomeArquivo).getAbsolutePath() // eslint-disable-line
  planilhaAnexa.write(planilhaEmDisco)

  etl({})
    .set_input_xlsx_file(planilhaEmDisco, 0)
    .take_fields_from_header_row()
    .for_each(function (options, values) {
      let produto = {
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
