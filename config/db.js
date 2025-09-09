import { Sequelize } from "sequelize";
import UserModel from "../models/userModel.js";
import PostModel from "../models/postModel.js";
import CommentModel from "../models/commentModel.js";

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
db.Comment = CommentModel(sequelize, Sequelize);
// console.log("This is db",db.User)

//associations
db.User.hasMany(db.Post, { foreignKey: "userId" });
db.Post.belongsTo(db.User, { foreignKey: "userId", onDelete: "CASCADE" });

//association comment model
db.User.hasMany(db.Comment, { foreignKey: "userId" });
db.Comment.belongsTo(db.User, { foreignKey: "userId", onDelete: "CASCADE" });

db.Post.hasMany(db.Comment, { foreignKey: "postId" });
db.Comment.belongsTo(db.Post, { foreignKey: "postId", onDelete: "CASCADE" });

export default db;
