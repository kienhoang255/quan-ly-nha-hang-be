import express from "express";
import { FOController } from "../controllers/index.js";
import { FODto } from "../dtos/index.js";
import foodOrderedValidate from "../middlewares/foodOrderedValidate.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const findFO = await FOController.find();
    res.status(200).json(findFO);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", foodOrderedValidate.create, async (req, res) => {
  try {
    const foodOrdered = FODto.create(req.body);
    // let result = [];
    // foodOrdered.forEach((element) => {
    const food = await FOController.create(foodOrdered);
    // result.push(food);
    // });
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/served", foodOrderedValidate.update, async (req, res) => {
  try {
    const foodOrderedDto = FODto.update(req.body);
    const updateFOrdered = await FOController.updateServed(foodOrderedDto);
    res.status(200).json(updateFOrdered);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/cancel", foodOrderedValidate.update, async (req, res) => {
  try {
    const foodOrderedDto = FODto.update(req.body);
    const updateFOrdered = await FOController.updateCancel(foodOrderedDto);
    res.status(200).json(updateFOrdered);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/cancelAdmin", foodOrderedValidate.create, async (req, res) => {});

router.get("/bill/:id_bill", async (req, res) => {
  try {
    const foodOrderedDto = FODto.getFoodByBill(req.params);
    const getFoodByBill = await FOController.getFoodByBill(foodOrderedDto);
    if (getFoodByBill) {
      return res.status(200).json(getFoodByBill);
    }
    return res.status(400).json("You haven't ordered anything yet");
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
