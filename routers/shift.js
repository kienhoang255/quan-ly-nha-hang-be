import express from "express";
import { checkIn, getAllShift, getShift } from "../controllers/shift.js";

const router = express.Router();
// router.post("/create", checkIn);
// router.get("/get", getShift);
// router.get("/get-all", getAllShift);

export default router;
