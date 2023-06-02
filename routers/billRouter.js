import express from "express";
import Pusher from "pusher";
import { BillController, TableController } from "../controllers/index.js";
import { BillDto } from "../dtos/index.js";
import billValidate from "../middlewares/billValidate.js";
import billDto from "../dtos/billDto.js";

const router = express.Router();
//----------------------New route---------------------------

// Receive id bill to get client info(avatar,name)
router.get("/:_id", async (req, res) => {
  try {
    const result = await BillController.getClientInfoByIdBill(req.params._id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/info/info", async (req, res) => {
  try {
    const result = await BillController.getAllInfo(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

//----------------------------------------------------------

router.get("/search/search/", async (req, res) => {
  try {
    const page = req.query.page;
    const q = req.query.q;
    const date = req.query.date;
    const findBill = await BillController.search(q, date, page);
    res.status(200).json(findBill);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/bill/:_id", async (req, res) => {
  try {
    const findBill = await BillController.getBillByIdBill(req.params._id);
    res.status(200).json(findBill);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/client/:_id", async (req, res) => {
  try {
    const findBill = await BillController.getBillByIdUser(req.params._id);
    res.status(200).json(findBill);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", billValidate.createBillValidate, async (req, res) => {
  try {
    const pusher = new Pusher({
      appId: process.env.pusher_app_id,
      key: process.env.pusher_key,
      secret: process.env.pusher_secret,
      cluster: process.env.pusher_cluster,
      useTLS: true,
    });
    const billDto = BillDto.create(req.body);
    const checkStatus = await TableController.checkStatus(billDto);
    if (checkStatus) {
      const createdBill = await BillController.create(billDto);
      pusher.trigger("table", "table-event", {
        table: createdBill.table,
      });
      pusher.trigger("bill", "bill-event", {
        bill: createdBill.createBill1,
      });
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

router.post(
  "/walk-in-guest",
  billValidate.createBillWalkInGuest,
  async (req, res) => {
    try {
      const createdBill = await BillController.createWalkInGuest(req.body);
      res.status(200).json(createdBill);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

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
    const pusher = new Pusher({
      appId: process.env.pusher_app_id,
      key: process.env.pusher_key,
      secret: process.env.pusher_secret,
      cluster: process.env.pusher_cluster,
      useTLS: true,
    });
    const billDto = BillDto.get(req.body);
    const checkBill = await BillController.preCheckOut(billDto);
    if (checkBill) {
      const result = await BillController.checkOut(billDto);
      pusher.trigger("table", "table-event", {
        table: result,
      });
      return res.status(200).json({ message: "success", table: result });
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

router.post("/change_table", billValidate.changeTable, async (req, res) => {
  try {
    const dto = billDto.changeTable(req.body);
    const changeTable = await BillController.changeTable(dto);

    res.status(200).json(changeTable);
  } catch (error) {
    res.status(error.code || 500).json(error.message || error);
  }
});

router.post("/update-bill");

export default router;
