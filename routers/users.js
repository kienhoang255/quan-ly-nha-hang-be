import express from "express";
import {
  createUser,
  getResigter,
  login,
  test,
  updateUser,
} from "../controllers/users.js";
import { authorizationToken } from "../middlewares/authorizationToken.js";
import {
  resigterValidate,
  updateValidate,
} from "../middlewares/userValidate.js";

const router = express.Router();
router.get("/", getResigter);
router.post("/create", resigterValidate, createUser);
router.post("/update", updateValidate, updateUser);
router.post("/login", login);

router.get("/test", authorizationToken, test);

export default router;
