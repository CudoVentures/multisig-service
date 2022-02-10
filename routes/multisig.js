const express = require('express')
const { MultisigService, TransactionService } = require('../services')

const router = express.Router()

const getMultisig = async (req, res, next) => {
  try {
    const { address } = req.params

    const multisig = await MultisigService.getMultisig(address)

    return res.status(200).json(multisig)
  } catch (error) {
    return next(error)
  }
}

const postMultisig = async (req, res, next) => {
  try {
    const data = req.body

    const multisig = await MultisigService.createMultisig(data)

    return res.status(201).json(multisig)
  } catch (error) {
    return next(error)
  }
}

const putMultisig = async (req, res, next) => {
  try {
    const data = req.body
    const { address } = req.params

    const multisig = await MultisigService.updateMultisig(address, data)

    return res.status(201).json(multisig)
  } catch (error) {
    return next(error)
  }
}

const fetchMultisigTransactions = async (req, res, next) => {
  try {
    const { address } = req.params

    const transactions = await TransactionService.fetchTransactions(address)

    return res.status(200).json(transactions)
  } catch (error) {
    return next(error)
  }
}

router.post('/', postMultisig)

router.get('/:address', getMultisig)
router.put('/:address', putMultisig)

router.get('/:address/transactions', fetchMultisigTransactions)

module.exports = router
