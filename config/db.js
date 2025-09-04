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


// Test the DB connection and log errors
try {
  await sequelize.authenticate();
  console.log("✅ Database connected successfully.");
} catch (error) {
  console.error("❌ Unable to connect to the database:", error.message);
}

export default db;
