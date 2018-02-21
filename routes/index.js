exports = {
  registrar: function (router) {
    router.addRoute('/produtos', 'app/produtos/default')
    router.addRoute('/produtos/:id', 'app/produtos/default')
    router.addRoute('/produtos/importacao', 'app/produtos/importacao')
    router.addRoute('/@auth', 'app/auth')
  }
}
