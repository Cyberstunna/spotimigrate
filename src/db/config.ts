import dotenv from "dotenv"
import { Sequelize, DataTypes, Model } from "sequelize";
import * as fs from "fs";
import * as path from "path";

dotenv.config();
const modelsDir = path.join(__dirname, "../models")
let db: any = {};
const basename = path.basename(__filename);
const dbUri = process.env.DATABASE_URI as string
const getCloudSequelizeOptions = (): object => {
    if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
        return {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        }
    } else {
        return {}
    }

}
const sequelize = new Sequelize(dbUri, {
    logging: false,
    ...getCloudSequelizeOptions()
});

sequelize.authenticate()
    .then(()=> {
        console.log("\x1b[36m%s\x1b[0m", "Database connected");
    })
    .catch((err: Error)=> {
        console.log("Failed to sync db: " + err.message);
    })

fs
  .readdirSync(modelsDir)
  .filter(file => {
    return (file.indexOf(".") !== 0) && (file.slice(-3) === ".ts");
  })
  .forEach(file => {
    const model: any = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export {db}