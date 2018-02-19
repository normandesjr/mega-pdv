function validarTipoArquivo (nomeArquivo) {
  if (!nomeArquivo.endsWith('xlsx')) {
    throw new TipoArquivoInvalidoException('O tipo do arquivo deve ser xlsx')
  }
}

function TipoArquivoInvalidoException (mensagem) {
  this.mensagem = mensagem
}

exports = {
  validarTipoArquivo: validarTipoArquivo
}
