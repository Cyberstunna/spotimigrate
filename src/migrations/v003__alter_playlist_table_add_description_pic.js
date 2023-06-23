'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addColumn(
            "playlists",
            "description",
            {
                type: DataTypes.STRING,
                allowNull: true,
            }
        ),
        queryInterface.addColumn(
            "playlists",
            "pic_url",
            {
                type: DataTypes.STRING,
                allowNull: true,
                field: "pic_url"
            }
        ),
    ])
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('playlists', "description");
    await queryInterface.removeColumn('playlists', "pic_url");
  },
};
