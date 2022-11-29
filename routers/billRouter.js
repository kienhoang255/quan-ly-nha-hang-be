import express from "express";
import {
  checkOutBillController,
  createBillController,
  getBillController,
  preCheckOutBillController,
} from "../controllers/billController.js";
import { checkTableStatusController } from "../controllers/tableController.js";
import { createBillDto, getBillDto } from "../dtos/billDto.js";
import { createBillValidate } from "../middlewares/billValidate.js";

const router = express.Router();

router.post("/", createBillValidate, async (req, res) => {
  try {
    const billDto = createBillDto(req.body);
    /**
     * If table have element special = true & status using or status = empty
     * allow for check in
     * If it's = false & status using
     * block check in
     */
    const checkStatus = await checkTableStatusController(billDto);
    if (checkStatus) {
      const createdBill = await createBillController(billDto);
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
    const billDto = getBillDto(req.body);
    const getBill = await getBillController(billDto);
    res.status(200).json(getBill);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/check-out", async (req, res) => {
  try {
    const billDto = getBillDto(req.body);
    const checkBill = await preCheckOutBillController(billDto);
    if (checkBill) {
      await checkOutBillController(billDto);
      return res.status(200).json({ message: "Good bye! See you later" });
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
