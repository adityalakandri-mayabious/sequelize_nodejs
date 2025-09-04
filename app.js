import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import db from './config/db.js';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//creates tables if the table is not present
db.sequelize.sync(); 

import UserRoute from './routes/UserRouter.js'
app.use(UserRoute);

const port = process.env.PORT || 3008;

app.listen(port, () => {
  console.log(`Server is running at PORT : ${port}`);
});
