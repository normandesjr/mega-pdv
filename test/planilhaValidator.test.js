const majesty = require('majesty')
const planilhaValidator = require('../app/validator/planilhaValidator')

function run () {
  const res = majesty.run(exec)

  print('', res.success.length, ' scenarios executed with success and')
  print('', res.failure.length, ' scenarios executed with failure.\n')

  res.failure.forEach(function (fail) {
    print('[' + fail.scenario + '] =>', fail.execption)
    if (fail.execption.printStackTrace) {
      fail.execption.printStackTrace()
    }
  })
}

function exec (describe, it, beforeEach, afterEach, expect, should, assert) {
  describe('Tipo planilha', function () {
    it('Deve aceitar arquivo xlsx como argumento', function () {
      expect(planilhaValidator.validarTipoArquivo('arquivo.xlsx')).to.be.undefined // eslint-disable-line
    })

    it('Deve rejeitar arquivo diferente de xlsx como argumento', function () {
      expect(function () { planilhaValidator.validarTipoArquivo('arquivo.txt') }).to.throw()
    })
  })
}

exports = {
  run: run
}
