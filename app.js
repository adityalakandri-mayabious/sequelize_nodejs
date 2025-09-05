import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import db from "./config/db.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//creates tables if the table is not present
db.sequelize.sync();

import UserRoute from "./routes/UserRouter.js";
import PostRoute from "./routes/PostsRouter.js";
app.use(UserRoute);
app.use(PostRoute);

const port = process.env.PORT || 3008;

//  DB connection
try {
  await db.sequelize.authenticate();
  console.log("Database connected successfully.");
  app.listen(port, () => {
    console.log(`Server is running at PORT : ${port}`);
  });
} catch (error) {
  console.error("Unable to connect to the database:",error.message);
}
