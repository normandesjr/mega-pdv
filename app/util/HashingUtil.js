function gerarHash (palavra) {
  const Hashing = Java.type('com.google.common.hash.Hashing')
  const hashFunction = Hashing.sha256()
  return hashFunction.newHasher()
    .putString(palavra, com.google.common.base.Charsets.UTF_8) // eslint-disable-line
    .hash()
    .toString()
}

exports = {
  gerarHash: gerarHash
}
