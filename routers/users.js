import express from "express";
import {
  createUserController,
  loginUserController,
} from "../controllers/users.js";
import { createUserDto, loginUserDto } from "../dtos/userDto.js";
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
    const createdUser = await createUserController(userDto);
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

    const loginUser = await loginUserController(userDto);

    if (loginUser === -1) {
      return res.status(400).json({ messageErr: "Account is not exist" });
    }
    if (loginUser === 1) {
      return res.status(400).json({
        messageErr:
          "Your account is not verified, need resigter for verifiedAccount is not exist",
      });
    }
    if (loginUser === 2) {
      return res.status(400).json({
        messageErr: "Email and password are not correct!",
      });
    } else {
      return res.status(200).json(loginUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/test", authorizationToken, (req, res) => {
  try {
    res.status(200).json("cung kinh day");
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
