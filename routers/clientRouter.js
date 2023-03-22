import express from "express";
import { ClientController } from "../controllers/index.js";
import { ClientDto } from "../dtos/index.js";

import {
  createClientValidate,
  loginClientValidate,
} from "../middlewares/clientValidate.js";

const router = express.Router();

router.post("/", createClientValidate, async (req, res) => {
  try {
    const clientDto = ClientDto.create(req.body);
    const createClient = await ClientController.create(clientDto);
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
    const clientDto = ClientDto.login(req.body);

    const loginClient = await ClientController.login(clientDto);

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

router.get("/:_id", async (req, res) => {
  try {
    const clientDto = ClientDto.find(req.params);
    const findClient = await ClientController.findId({ _id: clientDto });
    if (findClient) {
      return res.status(200).json(findClient);
    } else res.status(400).json("Not found client");
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
