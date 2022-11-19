import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { UserModel } from "../models/UserModel.js";
import { emailValidate } from "../middlewares/userValidate.js";

const checkVerification = (data) =>
  data.verification === "true" ? true : false;

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
    const { username, email, password, phone, role, job, verification } =
      req.body;
    const userEmail = new UserModel({
      username,
      email,
      password,
      role,
      job,
      verification,
    });
    const userPhone = new UserModel({
      username,
      phone: email,
      password,
      role,
      job,
      verification,
    });
    const findUser = await UserModel.findOne({
      $or: [{ email }, { phone: email }],
    });
    if (findUser) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      if (emailValidate(req.body.email)) {
        await userEmail.save();
        res.status(200).json({ message: "Create user successful!", findUser });
      } else {
        await userPhone.save();
        res.status(200).json({ message: "Create user successful!", findUser });
      }
    }
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
    const foundUser = await UserModel.findOne({
      $or: [{ email }, { phone: email }],
    });

    if (foundUser) {
      if (checkVerification(foundUser)) {
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
              expiresIn: "4h",
            }
          );
          res.status(200).json({
            username: foundUser.username,
            email: foundUser.email,
            phone: foundUser.phone,
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
        res.status(401).json({
          message: "Your account is not verified, need resigter for verified",
        });
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
