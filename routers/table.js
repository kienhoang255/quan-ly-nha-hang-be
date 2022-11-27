import express from "express";
import {
  createTableController,
  delTable,
  findTable,
  findTableEmpty,
  findTableStage,
  getTable,
  updateTableStatusController,
} from "../controllers/table.js";
import { createTableDto } from "../dtos/tableDto.js";
import {
  createTableValidate,
  updateTableValidate,
} from "../middlewares/tableValidate.js";

const router = express.Router();

router.post("/", createTableValidate, async (req, res) => {
  try {
    const tableDto = createTableDto(req.body);
    const createTable = await createTableController(tableDto);
    res.status(200).json(createTable);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/", updateTableValidate, (req, res) => {
  try {
    res.status(200).json("update");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/status", async (req, res) => {
  try {
    const { id_table } = req.body;
    const updateStatus = await updateTableStatusController(id_table, "using");
    res.status(200).json("update");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get", getTable);
router.post("/find", findTable);
router.post("/find-stage", findTableStage);
router.get("/find-empty", findTableEmpty);
router.delete("/delete", delTable);

export default router;
