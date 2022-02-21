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
      msgs: DataTypes.ARRAY(DataTypes.JSONB),
      fee: DataTypes.JSONB,
      multisigAddress: DataTypes.STRING,
      hasSigned: DataTypes.ARRAY(DataTypes.STRING),
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isIn: [
            [
              TRANSACTION_STATUS.PENDING,
              TRANSACTION_STATUS.SUCCESSFUL,
              TRANSACTION_STATUS.REJECTED,
              TRANSACTION_STATUS.SIGNED
            ]
          ]
        }
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: [TRANSACTION_TYPES.SEND, TRANSACTION_TYPES.RECEIVE]
      },
      isReject: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      executionTime: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Transaction'
    }
  )
  return Transaction
}
