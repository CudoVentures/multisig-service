'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Signature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Transaction, {
        foreignKey: 'transactionId',
        sourceKey: 'id'
      })
    }
  }
  Signature.init(
    {
      signature: DataTypes.STRING,
      address: DataTypes.STRING,
      bodyBytes: DataTypes.STRING,
      transactionId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Signature'
    }
  )
  return Signature
}
