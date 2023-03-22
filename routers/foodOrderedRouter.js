import express from "express";
import Pusher from "pusher";
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

router.get("/:type", async (req, res) => {
  try {
    const findFO = await FOController.findByStatus(req.params.type);
    res.status(200).json(findFO);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", foodOrderedValidate.create, async (req, res) => {
  try {
    const pusher = new Pusher({
      appId: process.env.pusher_app_id,
      key: process.env.pusher_key,
      secret: process.env.pusher_secret,
      cluster: process.env.pusher_cluster,
      useTLS: true,
    });

    const foodOrdered = FODto.create(req.body);
    const food = await FOController.create(foodOrdered);
    pusher.trigger("FO", "FO_order-event", { food });
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/served", foodOrderedValidate.update, async (req, res) => {
  try {
    const pusher = new Pusher({
      appId: process.env.pusher_app_id,
      key: process.env.pusher_key,
      secret: process.env.pusher_secret,
      cluster: process.env.pusher_cluster,
      useTLS: true,
    });

    const foodOrderedDto = FODto.update(req.body);
    const foodOrdered = await FOController.updateServed(foodOrderedDto);
    pusher.trigger("FO", "FO_served-event", { foodOrdered });
    res.status(200).json(foodOrdered);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/cancel", foodOrderedValidate.update, async (req, res) => {
  try {
    const pusher = new Pusher({
      appId: process.env.pusher_app_id,
      key: process.env.pusher_key,
      secret: process.env.pusher_secret,
      cluster: process.env.pusher_cluster,
      useTLS: true,
    });
    const foodOrderedDto = FODto.update(req.body);
    const foodOrdered = await FOController.updateCancel(foodOrderedDto);
    pusher.trigger("FO", "FO_cancel-event", { foodOrdered });
    res.status(200).json(foodOrdered);
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
