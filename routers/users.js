import express from "express";
import UserController from "../controllers/users.js";
import {
  changePassword,
  createUserDto,
  loginUserDto,
} from "../dtos/userDto.js";
import { authorizationToken } from "../middlewares/authorizationToken.js";
import {
  createUserValidate,
  loginUserValidate,
  updateUserValidate,
} from "../middlewares/userValidate.js";

const router = express.Router();

router.post("/", createUserValidate, async (req, res) => {
  try {
    const userDto = createUserDto(req.body);
    const createdUser = await UserController.createUserController(userDto);
    if (createdUser === undefined) {
      res.status(400).json("Account already exist");
    } else {
      res.status(200).json(createdUser);
    }
  } catch (error) {
    res.status(500).json("Server error responses");
  }
});

router.put("/", updateUserValidate, async (req, res) => {
  try {
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", loginUserValidate, async (req, res) => {
  try {
    const userDto = loginUserDto(req.body);

    const loginUser = await UserController.login(userDto);
    if (loginUser) {
      return res.status(200).json(loginUser);
    } else
      return res.status(400).json({
        messageErr: "Email and password are not correct!",
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const { _id } = req.query;
    const user = await UserController.get({ _id: _id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/change-password", async (req, res) => {
  try {
    const dto = changePassword(req.body);
    const user = await UserController.changePassword(dto);
    res.status(200).json({ data: user, message: "success" });
  } catch (error) {
    res.status(error.code || 500).json(error.message || error);
  }
});

router.get("/:test", authorizationToken, (req, res) => {
  // http://localhost/test/
  try {
    const userDto = req.params;
    res.status(200).json("cung kinh day");
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
