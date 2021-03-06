'use strict'
const { TRANSACTION_TYPES, TRANSACTION_STATUS } = require('../../utils')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      hash: {
        type: Sequelize.STRING
      },
      chainId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      memo: {
        type: Sequelize.STRING
      },
      sequence: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      msgs: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: false
      },
      fee: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      multisigAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: {
            tableName: 'Multisigs',
            schema: 'public'
          },
          key: 'address'
        }
      },
      hasSigned: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
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
        type: Sequelize.ENUM,
        values: [TRANSACTION_TYPES.SEND, TRANSACTION_TYPES.RECEIVE]
      },
      isReject: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      executionTime: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Transactions')
  }
}
