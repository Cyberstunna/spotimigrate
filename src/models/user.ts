import { Model, DataTypes } from "sequelize";
import {db} from "../db/config";

const sequelize = db.sequelize

class User extends Model {
    public id!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any){
      User.hasMany(models.playlists)
    }
}

User.init(
    {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: false,
        },
    },
    {
        sequelize,
        modelName: "users"
    }
)

export {User}