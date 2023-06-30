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
    res.status(200).json(createClient);
  } catch (error) {
    res.status(error.code || 500).json(error.message || error);
  }
});

router.post("/create", createClientValidate, async (req, res) => {
  try {
    const clientDto = ClientDto.create(req.body);
    const createClient = await ClientController.create(clientDto);
    res.status(200).json(createClient);
  } catch (error) {
    res.status(error.code || 500).json(error.message || error);
  }
});

router.post("/login", loginClientValidate, async (req, res) => {
  try {
    const clientDto = ClientDto.login(req.body);

    const loginClient = await ClientController.login(clientDto);

    return res.status(200).json(loginClient);
  } catch (error) {
    res.status(error.code || 500).json(error.message || error);
  }
});

router.post("/updatePassword", loginClientValidate, async (req, res) => {
  try {
    const clientDto = ClientDto.login(req.body);

    const client = await ClientController.updatePassword(clientDto);

    return res.status(200).json(client);
  } catch (error) {
    res.status(error.code || 500).json(error.message || error);
  }
});

router.put("/", async (req, res) => {
  try {
    const clientDto = ClientDto.update(req.body);
    const client = await ClientController.preUpdate(clientDto);
    return res.status(200).json(client);
  } catch (error) {
    res.status(error.code || 500).json(error.message || error);
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
