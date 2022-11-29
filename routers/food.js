import express from "express";
import {
  createFoodController,
  findFoodController,
  findOneFoodAndUpdateController,
} from "../controllers/food.js";
import { createFoodDto, updateFoodDto } from "../dtos/foodDto.js";
import { createFoodValidate } from "../middlewares/foodValidate.js";

const router = express.Router();

router.post("/", createFoodValidate, async (req, res) => {
  try {
    const foodDto = createFoodDto(req.body);

    const createFood = await createFoodController(foodDto);
    // res.status(200).json(foodDto);

    res.status(200).json(createFood);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("", async (req, res) => {
  try {
    const findFood = await findFoodController();
    res.status(200).json(findFood);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("", async (req, res) => {
  try {
    const foodDto = updateFoodDto(req.body);
    const findFood = await findOneFoodAndUpdateController(foodDto);
    res.status(200).json(findFood);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
