const multisigRouter = require('./multisig')
const transactionRouter = require('./transaction')
const signatureRouter = require('./signature')

module.exports = app => {
  app.use('/multisig', multisigRouter)
  app.use('/transaction', transactionRouter)
  app.use('/signature', signatureRouter)
}
