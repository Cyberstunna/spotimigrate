import { Model, DataTypes } from "sequelize";
import {db} from "../db/config";

const sequelize = db.sequelize


class PlaylistTrack extends Model {
    public id!: number;
    public playlistId!: number;
    public trackId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any){
        PlaylistTrack.belongsTo(models.playlists);
        PlaylistTrack.belongsTo(models.tracks)
    }
  }
  
  PlaylistTrack.init(
    {
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
        }
    },
    {
        sequelize,
        modelName: "playlist_tracks"
    }
  )

  export {PlaylistTrack}