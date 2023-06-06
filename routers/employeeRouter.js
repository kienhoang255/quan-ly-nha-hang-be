import express from "express";
import employeeController from "../controllers/employeeController.js";
import employeeDto from "../dtos/employeeDto.js";
import employeeValidate from "../middlewares/employeeValidate.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getEmployee = await employeeController.get();
    res.status(200).json(getEmployee);
  } catch (error) {
    res.status(500).json();
  }
});

router.get("/search", async (req, res) => {
  try {
    const page = req.query.page;
    const status = req.query.status;
    const q = req.query.q;
    const data = await employeeController.search({ q, page, status });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json();
  }
});

router.get("/job", async (req, res) => {
  try {
    const getEmployee = await employeeController.get(req.job);
    res.status(200).json(getEmployee);
  } catch (error) {
    res.status(500).json();
  }
});

router.post("/", employeeValidate.checkExistValue, async (req, res) => {
  try {
    const createDto = employeeDto.create(req.body);
    const getEmployee = await employeeController.create(createDto);
    if (getEmployee) {
      return res.status(200).json({ data: getEmployee, message: "success" });
    } else {
      return res.status(400).json("Account already exist");
    }
  } catch (error) {
    res.status(500).json();
  }
});

router.put("/delete/:_id", async (req, res) => {
  try {
    const data = await employeeController.del(req.params);
    res.status(200).json({ data, message: "success" });
  } catch (error) {
    res.status(500).json();
  }
});

router.put("/restore/:_id", async (req, res) => {
  try {
    const data = await employeeController.restore(req.params);
    res.status(200).json({ data, message: "success" });
  } catch (error) {
    res.status(500).json();
  }
});

router.put("/", employeeValidate.checkExistId, async (req, res) => {
  try {
    const updateDto = employeeDto.update(req.body);
    const data = await employeeController.update(updateDto);
    res.status(200).json({ data, message: "success" });
  } catch (error) {
    res.status(500).json();
  }
});

export default router;
