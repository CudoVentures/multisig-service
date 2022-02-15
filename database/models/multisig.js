'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Multisig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Transaction, {
        foreignKey: 'multisigAddress',
        sourceKey: 'address'
      })
    }
  }
  Multisig.init(
    {
      address: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
      },
      accountNumber: { type: DataTypes.INTEGER, unique: true },
      sequence: DataTypes.INTEGER,
      latestSequence: DataTypes.INTEGER,
      threshold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max(val) {
            if (parseInt(val) > this.owners.length) {
              throw new Error(
                'Threshold cannnot be higher than the amount of owners'
              )
            }
          },
          min: 1
        }
      },
      name: DataTypes.STRING,
      pubkey: DataTypes.JSONB,
      owners: DataTypes.ARRAY(DataTypes.STRING)
    },
    {
      sequelize,
      modelName: 'Multisig'
    }
  )
  return Multisig
}
