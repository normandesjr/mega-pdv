let dbm = require('database')

let dbConfig = getBitcodeConfig('database')()
let db = dbm.createDbInstance(dbConfig)

function pesquisar (filtro) {
  return db.select('select * from produto')
}

function salvar (produto) {
  db.insert('produto', produto)
}

function remover (id) {
  db.delete('produto', { id: id })
}

function atualizar (produto) {
  db.update('produto', produto, { id: produto.id })
}

exports = {
  pesquisar: pesquisar,
  salvar: salvar,
  remover: remover,
  atualizar: atualizar
}
