const express = require('express')
const { SignatureService } = require('../services')

const router = express.Router()

const postSignature = async (req, res, next) => {
  try {
    const data = req.body

    const signature = await SignatureService.createSignature(data)

    return res.status(201).json({ signature })
  } catch (error) {
    return next(error)
  }
}

router.post('/', postSignature)

module.exports = router
