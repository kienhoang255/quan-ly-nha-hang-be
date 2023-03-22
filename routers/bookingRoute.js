import express from "express";
import bookingController from "../controllers/bookingController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json(result);
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
