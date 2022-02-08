'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Multisigs', {
      address: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
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
