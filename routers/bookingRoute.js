import express from "express";
import bookingController from "../controllers/bookingController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = req.query;
    const booking = await bookingController.find(data);
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const data = req.query;
    const booking = await bookingController.get(data);
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

router.post("/employee", async (req, res) => {
  try {
    const create = await bookingController.createByEmployee(req.body);
    res.status(200).json(create);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    const create = await bookingController.findOneAndUpdate(req.body);
    res.status(200).json(create);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/client/:id", async (req, res) => {
  try {
    const booking = await bookingController.get({ id_client: req.params.id });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
