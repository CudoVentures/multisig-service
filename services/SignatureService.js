const { Signature } = require('../database/models')

const createSignature = async (id, data) => {
  try {
    const { dataValues } = await Signature.create(data)

    return dataValues
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getSignaturesByTransactionId = async transactionId => {
  try {
    const signarures = await Signature.findAll({ where: { transactionId } })

    return signarures
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = {
  createSignature,
  getSignaturesByTransactionId
}
