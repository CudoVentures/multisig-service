const { Transaction, Multisig } = require('../database/models')

const fetchTransactions = async multisigAddress => {
  try {
    const transactions = await Transaction.findAll(
      {
        where: {
          multisigAddress
        }
      },
      {
        include: { model: Multisig }
      }
    )

    return transactions.map(tx => tx.dataValues)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getTransaction = async id => {
  try {
    const transaction = await Transaction.findOne({
      where: {
        id
      }
    })

    return transaction
  } catch (error) {
    console.log(error)
    throw error
  }
}

const createTransaction = async data => {
  try {
    const { dataValues } = await Transaction.create(data)

    return dataValues
  } catch (error) {
    console.log(error)
    throw error
  }
}

const updateTransaction = async (id, data) => {
  try {
    const transaction = await Transaction.findOne({ where: { id } })

    const updatedTransaction = transaction.set({
      ...data
    })
    const { dataValues } = await updatedTransaction.save()

    return dataValues
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = {
  fetchTransactions,
  getTransaction,
  createTransaction,
  updateTransaction
}
