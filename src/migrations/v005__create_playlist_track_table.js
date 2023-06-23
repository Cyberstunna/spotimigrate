'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('playlist_tracks', {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        playlistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "playlist_id"
        },
        trackId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "track_id"
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
      "playlist_tracks",
      {
        type: "foreign key",
        name: "playlist_tracks_playlist_id_fk",
        fields: ["playlist_id"],
        references: {
          table: "playlists",
          field: "id"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    )).then(()=> queryInterface.addConstraint(
        "playlist_tracks",
        {
          type: "foreign key",
          name: "playlist_tracks_track_id_fk",
          fields: ["track_id"],
          references: {
            table: "tracks",
            field: "id"
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ))
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('playlist_tracks');
  },
};
