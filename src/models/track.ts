import { Model, DataTypes } from "sequelize";
import {db} from "../db/config";

const sequelize = db.sequelize


class Track extends Model {
    public id!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any){
      Track.belongsToMany(models.playlists, {through: {model: "playlist_tracks"}})
    }
  }
  
  Track.init(
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        }
    },
    {
        sequelize,
        modelName: "tracks"
    }
  )

  export {Track}