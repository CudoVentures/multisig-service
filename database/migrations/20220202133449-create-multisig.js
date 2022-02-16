'use strict'
const { isCudosAddress } = require('../../utils')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Multisigs', {
      address: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          customValidation(val) {
            if (!isCudosAddress(val)) {
              throw new Error('Not a valid CUDOS address')
            }
          }
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accountNumber: {
        type: Sequelize.INTEGER,
        unique: true
      },
      sequence: {
        type: Sequelize.INTEGER
      },
      latestSequence: {
        type: Sequelize.INTEGER
      },
      threshold: {
        type: Sequelize.INTEGER,
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
      pubkey: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      owners: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Multisigs')
  }
}
