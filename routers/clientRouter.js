import express from "express";
import {
  createClientController,
  loginClientController,
} from "../controllers/clientController.js";
import { createClientDto, loginClientDto } from "../dtos/clientDto.js";
import {
  createClientValidate,
  loginClientValidate,
} from "../middlewares/clientValidate.js";

const router = express.Router();

router.post("/", createClientValidate, async (req, res) => {
  try {
    const clientDto = createClientDto(req.body);
    const createClient = await createClientController(clientDto);
    if (createClient === undefined) {
      res.status(400).json("Account already exist");
    } else {
      res.status(200).json(createClient);
    }
  } catch (error) {
    res.status(500).json();
  }
});

router.post("/login", loginClientValidate, async (req, res) => {
  try {
    const clientDto = loginClientDto(req.body);

    const loginClient = await loginClientController(clientDto);

    if (loginClient === -1) {
      return res.status(400).json({ messageErr: "Account is not exist" });
    }
    if (loginClient === 1) {
      return res.status(400).json({
        messageErr:
          "Your account is not verified, need resigter for verifiedAccount is not exist",
      });
    }
    if (loginClient === 2) {
      return res.status(400).json({
        messageErr: "Email and password are not correct!",
      });
    } else {
      return res.status(200).json(loginClient);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;