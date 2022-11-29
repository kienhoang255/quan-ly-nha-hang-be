import express from "express";
import {
  createFoodOrderedController,
  updateCancelFoodOrderedController,
  updateServedFoodOrderedController,
} from "../controllers/foodOrderedController.js";
import {
  createFoodOrderedDto,
  updateFoodOrderedDto,
} from "../dtos/foodOrderedDto.js";
import {
  createFoodOrderedValidate,
  updateFoodOrderedValidate,
} from "../middlewares/foodOrderedValidate.js";

const router = express.Router();

router.post("/", createFoodOrderedValidate, async (req, res) => {
  try {
    const foodOrdered = createFoodOrderedDto(req.body);
    foodOrdered.forEach((element) => {
      createFoodOrderedController(element);
    });
    res.status(200).json(foodOrdered);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/served", updateFoodOrderedValidate, async (req, res) => {
  try {
    const foodOrderedDto = updateFoodOrderedDto(req.body);
    const updateFOrdered = await updateServedFoodOrderedController(
      foodOrderedDto
    );
    res.status(200).json(updateFOrdered);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/cancel", createFoodOrderedValidate, async (req, res) => {
  try {
    const foodOrderedDto = updateFoodOrderedDto(req.body);
    await updateCancelFoodOrderedController(foodOrderedDto);
    s;
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/cancelAdmin", createFoodOrderedValidate, async (req, res) => {});

export default router;
