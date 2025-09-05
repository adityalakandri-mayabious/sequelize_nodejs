import { Sequelize } from "sequelize";
import UserModel from "../models/userModel.js";
import PostModel from "../models/postModel.js";

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
db.User = UserModel(sequelize, Sequelize);
db.Post = PostModel(sequelize, Sequelize);

//associations
db.User.hasMany(db.Post, { foreignKey: "userId" });
db.Post.belongsTo(db.User, { foreignKey: "userId", onDelete: "CASCADE" });

export default db;
