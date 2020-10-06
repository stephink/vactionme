export default async function (app, opts) {
  app.addHook('onRequest', app.authenticateAdmin)
  app.register(import('./employee.js'))
}
