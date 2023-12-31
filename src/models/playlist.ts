import { Model, DataTypes } from "sequelize";
import {db} from "../db/config";

const sequelize = db.sequelize


class Playlist extends Model {
    public id!: number;
    public name!: string;
    public userId!: string;
    public url!: string;
    public description!: string;
    public picUrl!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any){
      Playlist.belongsTo(models.users)
    }
  }
  
  Playlist.init(
    {
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
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        picUrl: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "pic_url"
        },
    },
    {
        sequelize,
        modelName: "playlists"
    }
  )

  export {Playlist}