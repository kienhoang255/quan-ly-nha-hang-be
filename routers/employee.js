import express from "express";
import { getAllEmployee, getEmployee } from "../controllers/employee.js";

const router = express.Router();

router.get("/get-all-employee", getAllEmployee);
router.post("/get-employee", getEmployee);

export default router;
