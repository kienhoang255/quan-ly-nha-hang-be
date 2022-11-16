import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

export const login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  UserModel.findOne({ $or: [{ email: email }] }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign({ name: user.name }, "verySecretValue", {
            expiresIn: "7d",
          });
          res.json({ message: "Login Successful!", token });
        } else {
          res.json({ message: "Email & Password are not correct" });
        }
      });
    } else {
      res.json({
        message: "No user found!",
      });
    }
  });
};
