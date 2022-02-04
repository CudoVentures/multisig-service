'use strict'
const { Model } = require('sequelize')
const { TRANSACTION_TYPES, TRANSACTION_STATUS } = require('../../utils')

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Multisig, {
        foreignKey: 'multisigAddress',
        sourceKey: 'address'
      })
      this.hasMany(models.Signature, {
        foreignKey: 'transactionId',
        sourceKey: 'id'
      })
    }
  }
  Transaction.init(
    {
      accountNumber: DataTypes.INTEGER,
      hash: DataTypes.STRING,
      chainId: DataTypes.STRING,
      memo: DataTypes.STRING,
      sequence: DataTypes.INTEGER,
      msgs: DataTypes.JSONB,
      fee: DataTypes.JSONB,
      multisigAddress: DataTypes.STRING,
      hasSigned: DataTypes.ARRAY(DataTypes.STRING),
      status: DataTypes.ENUM(
        TRANSACTION_STATUS.PENDING,
        TRANSACTION_STATUS.EXECUTED,
        TRANSACTION_STATUS.REJECTED
      ),
      type: DataTypes.ENUM(TRANSACTION_TYPES.SEND, TRANSACTION_TYPES.RECEIVE),
      executionTime: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Transaction'
    }
  )
  return Transaction
}
