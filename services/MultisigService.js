const { Multisig, Transaction } = require('../database/models')

const getMultisig = async address => {
  try {
    const multisig = await Multisig.findOne({
      where: {
        address
      }
    })

    if (!multisig) {
      const notFoundError = new Error('Address not found')
      notFoundError.statusCode = 404
      throw notFoundError
    }

    const transactions = await Transaction.findAll({
      where: { multisigAddress: address }
    })

    return {
      ...multisig.dataValues,
      pubkey: JSON.stringify(multisig.pubkey)
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const createMultisig = async data => {
  try {
    const { dataValues } = await Multisig.create(data)
    return {
      ...dataValues,
      pubkey: JSON.stringify(dataValues.pubkey)
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const updateMultisig = async (address, data) => {
  try {
    const multisig = await Multisig.findOne({
      where: {
        address
      }
    })
    const updatedMultisig = multisig.set({
      ...data
    })
    const { dataValues } = await updatedMultisig.save()

    return {
      ...dataValues,
      pubkey: JSON.stringify(dataValues.pubkey)
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = {
  getMultisig,
  createMultisig,
  updateMultisig
}
