'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('pages', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      UserId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      data: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Date.now
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pages')
  }
}
