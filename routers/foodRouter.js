import express from "express";
import { FoodController } from "../controllers/index.js";
import { FoodDto } from "../dtos/index.js";
import { createFoodValidate } from "../middlewares/foodValidate.js";

const router = express.Router();

router.post("/", createFoodValidate, async (req, res) => {
  try {
    const foodDto = FoodDto.create(req.body);

    const createFood = await FoodController.create(foodDto);
    res.status(200).json({ createFood, message: "success" });
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
    const findFood = await FoodController.find(query);
    res.status(200).json(findFood);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const query = req.query;
    const params = req.params;
    const findFood = await FoodController.find(params, query);
    res.status(200).json(findFood);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const foodDto = FoodDto.update(req.body);
    const updateFood = await FoodController.findOneAndUpdate(foodDto);
    res.status(200).json({ updateFood, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const deleteFood = await FoodController.findOneAndDel(req.params);
    res.status(200).json({ deleteFood, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
