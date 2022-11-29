import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import users from "./routers/users.js";
import shift from "./routers/shift.js";
import employee from "./routers/employee.js";
import billRouter from "./routers/billRouter.js";
import tableRouter from "./routers/tableRouter.js";
import food from "./routers/food.js";
import clientRouter from "./routers/clientRouter.js";
import foodOrderedRouter from "./routers/foodOrderedRouter.js";

dotenv.config();
const PORT = process.env.PORT;
const URI = process.env.DATABASE_URL;

const app = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use("/", cors());

app.use("/client", clientRouter);
app.use("/user", users);
app.use("/shift", shift);
app.use("/employee", employee);
app.use("/bill", billRouter);
app.use("/table", tableRouter);
app.use("/food", food);
app.use("/food-ordered", foodOrderedRouter);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connect to DB", err);
  });
