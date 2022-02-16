module.exports.TRANSACTION_TYPES = {
  SEND: 'send',
  RECEIVE: 'receive'
}

module.exports.TRANSACTION_STATUS = {
  PENDING: 'pending',
  SUCCESSFUL: 'successful',
  REJECTED: 'rejected',
  SIGNED: 'signed'
}

const cudosAddressPattern = /^cudos[a-zA-Z0-9]{39}$/

module.exports.isCudosAddress = address => {
  return cudosAddressPattern.test(address)
}
