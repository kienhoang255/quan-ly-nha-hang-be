import express from "express";
import tableImageController from "../controllers/tableImageController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const findOne = await tableImageController.findOne(req.query);
    res.status(200).json({ data: findOne, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/filter/", async (req, res) => {
  try {
    const { options } = req.query;
    const find = await tableImageController.find(options);
    res.status(200).json({ data: find, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:option", async (req, res) => {
  try {
    const findOne = await tableImageController.findDistinct(req.params.option);
    res.status(200).json({ data: findOne, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const createTableImage = await tableImageController.create(req.body);
    res.status(200).json({ data: createTableImage, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
