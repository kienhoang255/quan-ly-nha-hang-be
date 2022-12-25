import express from "express";
import { TableController } from "../controllers/index.js";
import { TableDto } from "../dtos/index.js";

import {
  createTableValidate,
  updateTableValidate,
} from "../middlewares/tableValidate.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getTable = await TableController.get();
    res.status(200).json(getTable);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/123", (req, res) => {
  try {
    res.status(200).json("oke");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", createTableValidate, async (req, res) => {
  try {
    const tableDto = TableDto.create(req.body);
    const createTable = await TableController.create(tableDto);
    res.status(200).json({ createTable, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/", updateTableValidate, async (req, res) => {
  try {
    const tableDto = TableDto.update(req.body);
    const updateTable = await TableController.update(tableDto);
    res.status(200).json({ updateTable, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteTable = await TableController.del(req.params);
    res.status(200).json({ deleteTable, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/status", async (req, res) => {
  try {
    const { id_table } = req.body;
    const updateStatus = await TableController.updateStatus(id_table, "using");
    res.status(200).json("update");
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
