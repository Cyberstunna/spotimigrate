'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('playlists', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id"
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    }).then(()=> queryInterface.addConstraint(
      "playlists",
      {
        type: "foreign key",
        name: "playlists_user_id_fk",
        fields: ["user_id"],
        references: {
          table: "users",
          field: "id"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    ))
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('playlists');
  },
};
