import { ShiftModel } from "../models/ShiftModel.js";
import { UserModel } from "../models/UserModel.js";

export const getAllEmployee = async (res, req) => {
  try {
    const findEmployee = await UserModel.find({ role: 1 });

    const foundResult = [];
    findEmployee.forEach((employee) => {
      const { username, email, phone, address } = employee;
      foundResult.push({ username, email, phone, address });
    });

    req.status(200).json({ foundResult });
  } catch (error) {
    req.status(500).json({ error });
  }
};

export const getEmployee = async (res, req) => {
  try {
    const id = res.body._id;
    const findEmployee = await UserModel.findOne({
      $and: [{ _id: id }, { role: "1" }],
    });
    if (findEmployee) {
      req.status(200).json({ employee: findEmployee });
    } else {
      req.status(200).json({ message: "Not found!" });
    }
  } catch (error) {
    req.status(500).json({ error });
  }
};
