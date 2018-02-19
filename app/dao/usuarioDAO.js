const dbm = require('database')

const dbConfig = getBitcodeConfig('database')()
const db = dbm.createDbInstance(dbConfig)

function pesquisarPorNomeESenha (username, password) {
  return db.execute('SELECT * FROM usuario WHERE username = :username AND password = :password',
    { username: username, password: password})[0]
}

exports = {
  pesquisarPorNomeESenha: pesquisarPorNomeESenha
}
