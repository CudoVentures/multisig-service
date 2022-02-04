const express = require('express')
const { TransactionService, SignatureService } = require('../services')

const router = express.Router()

const postTransaction = async (req, res, next) => {
  try {
    const data = req.body

    const transaction = await TransactionService.createTransaction(data)

    return res.status(201).json(transaction)
  } catch (error) {
    return next(error)
  }
}

const putTransaction = async (req, res, next) => {
  try {
    const data = req.body
    const { id } = req.params

    const transaction = await TransactionService.updateTransaction(id, data)

    return res.status(201).json(transaction)
  } catch (error) {
    return next(error)
  }
}

const fetchSignatures = async (req, res, next) => {
  try {
    const { id } = req.params

    const signatures = await SignatureService.getSignaturesByTransactionId(id)

    return res.status(200).json(signatures)
  } catch (error) {
    return next(error)
  }
}

const postSignature = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = req.body

    const signature = await SignatureService.createSignature(id, data)

    return res.status(201).json(signature)
  } catch (error) {
    return next(error)
  }
}

router.post('/', postTransaction)

router.put('/:id', putTransaction)

router.get('/:id/signature', fetchSignatures)
router.post('/:id/signature', postSignature)

module.exports = router
