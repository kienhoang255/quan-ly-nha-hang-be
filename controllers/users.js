import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { UserModel } from "../models/UserModel.js";

dotenv.config();

export const getResigter = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = req.body;

    const user = new UserModel(newUser);
    const findUser = await UserModel.findOne({ email: req.body.email });
    console.log(findUser);
    if (findUser) {
      return res.json({ message: "Email already exists" });
    } else {
      await user.save();
    }
    res.status(200).json({ message: "Create user successful!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateUser = async (req, res) => {
  req.body.password = (await bcrypt.hash(req.body.password, 10)).toString();
  try {
    const updateUser = req.body;
    const id = req.body._id;

    await UserModel.findOneAndUpdate({ _id: id }, updateUser, {
      new: true,
    });

    res.status(200).json({ message: "Update successful!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await UserModel.findOne({ email: email });

    if (foundUser) {
      const result = await foundUser.comparePassword(password);
      if (result) {
        let accessToken = jwt.sign(
          {
            _id: foundUser._id,
            role: foundUser.role,
            job: foundUser.job,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );
        let refreshToken = jwt.sign(
          {
            _id: foundUser._id,
            role: foundUser.role,
            job: foundUser.job,
          },
          process.env.REFRESH_TOKEN_SECRET
        );
        res.status(200).json({
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role,
          job: foundUser.job,
          accessToken,
        });
      } else {
        res
          .status(401)
          .json({ message: "Email and password are not correct!" });
      }
    } else {
      res.status(401).json({ message: "Email and password are not correct!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const test = (req, res) => {
  res.send("Oke");
};

export const logout = (req, res) => {};
