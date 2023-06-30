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
    const getTable = await TableController.get(req.query);
    res.status(200).json(getTable);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/find/:_id", async (req, res) => {
  try {
    const getTable = await TableController.findOne(req.params._id);
    res.status(200).json(getTable);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/search", async (req, res) => {
  try {
    const getTable = await TableController.search(req.query);
    res.status(200).json(getTable);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/search/filter", async (req, res) => {
  try {
    const getTable = await TableController.searchByFilter(req.query);
    res.status(200).json(getTable);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/option/:option", async (req, res) => {
  try {
    const findTable = await TableController.getDistinct(req.params.option);

    res.status(200).json(findTable);
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
    res.status(200).json({ data: createTable, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/", updateTableValidate, async (req, res) => {
  try {
    const tableDto = TableDto.update(req.body);
    const data = await TableController.update(tableDto);
    res.status(200).json({ data, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await TableController.findOneAndDelete(req.params.id);
    res.status(200).json({ data, message: "success" });
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
