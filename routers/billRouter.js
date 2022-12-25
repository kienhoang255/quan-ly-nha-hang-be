import express from "express";
import { BillController, TableController } from "../controllers/index.js";
import { BillDto } from "../dtos/index.js";
import { createBillValidate } from "../middlewares/billValidate.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const findBill = await BillController.getAllUsing();
    res.status(200).json(findBill);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", createBillValidate, async (req, res) => {
  try {
    const billDto = BillDto.create(req.body);
    const checkStatus = await TableController.checkStatus(billDto);
    if (checkStatus) {
      const createdBill = await BillController.create(billDto);
      return res.status(200).json(createdBill);
    } else {
      return res
        .status(400)
        .json({ messageErr: "Table is using, can't check in" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/get-bill", async (req, res) => {
  try {
    const billDto = BillDto.getBillDto(req.body);
    const getBill = await BillController.get(billDto);
    res.status(200).json(getBill);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/check-out", async (req, res) => {
  try {
    const billDto = BillDto.get(req.body);
    const checkBill = await BillController.preCheckOut(billDto);
    if (checkBill) {
      const result = await BillController.checkOut(billDto);
      return res
        .status(200)
        .json({ message: "Good bye! See you later", table: result });
    } else {
      return res.status(400).json("Still unserved food");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch("/", async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/update-bill");

export default router;
