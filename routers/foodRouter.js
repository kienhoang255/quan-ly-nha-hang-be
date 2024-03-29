import express from "express";
import { FoodController } from "../controllers/index.js";
import { FoodDto } from "../dtos/index.js";
import { createFoodValidate } from "../middlewares/foodValidate.js";

const router = express.Router();

router.post("/", createFoodValidate, async (req, res) => {
  try {
    const foodDto = FoodDto.create(req.body);

    const data = await FoodController.create(foodDto);
    res.status(200).json({ data, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const findFood = await FoodController.find();
    res.status(200).json(findFood);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/option/:option", async (req, res) => {
  try {
    const findFood = await FoodController.findDistinct(req.params.option);
    res.status(200).json(findFood);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    // res.headers["set-cookie"];

    const findFood = await FoodController.find(query);
    res.cookie("cookie123", "randomNumber");
    res.status(200).json(findFood);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const params = req.params;
    const data = await FoodController.findOne(params);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const foodDto = FoodDto.update(req.body);
    const data = await FoodController.findOneAndUpdate(foodDto);
    res.status(200).json({ data, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const data = await FoodController.findOneAndDel(req.params);
    res.status(200).json({ data, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
