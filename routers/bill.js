import express from "express";
import { createBillController } from "../controllers/bill.js";
import { checkTableStatusController } from "../controllers/table.js";
import { createBillDto } from "../dtos/billDto.js";
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
router.post("/add-bill");
router.post("/update-bill");

export default router;
