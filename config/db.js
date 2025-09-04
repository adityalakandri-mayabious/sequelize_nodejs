import { Sequelize } from "sequelize";
import UserModel from "../models/userModel.js";

const dbName = "sequelize_db";
const dbUser = "root";
const dbPassword = "";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User=UserModel(sequelize,Sequelize);
// console.log("this is user",db.User)




export default db;
