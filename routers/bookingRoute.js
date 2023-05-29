import express from "express";
import bookingController from "../controllers/bookingController.js";

const router = express.Router();

router.get("/:date", async (req, res) => {
  try {
    const date = req.params.date;
    const booking = await bookingController.find(date);
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const create = await bookingController.create(req.body);
    res.status(200).json(create);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
