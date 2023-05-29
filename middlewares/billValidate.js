import HttpError from "../utils/HttpError.js";
import { isEmail, isNull, isPhoneNumber } from "../validate/validate.js";

const createBillValidate = (req, res, next) => {
  try {
    const email = req.body.email;

    if (!isNull(email)) {
      return res.status(400).json("Email/Phone number field not received");
    }

    if (!isEmail(email)) {
      if (isPhoneNumber(email)) {
        next();
      } else {
        return res.status(400).json("This is invalid email or phone number");
      }
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateBillValidate = (req, res, next) => {
  try {
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

const createBillWalkInGuest = (req, res, next) => {
  try {
    const idTable = req.body.id_table;
    if (!isNull(idTable)) throw new HttpError("id_table is not exist!", 400);
    next();
  } catch (error) {
    res.status(error.code).json(error.message);
  }
};

const changeTable = (req, res, next) => {
  try {
    const { id_table, id_table_to, id_bill } = req.body;
    const data = { id_table, id_table_to, id_bill };

    const result = [];

    for (const key in data) {
      if (!req.body[key]) {
        result.push(key);
      }
    }

    if (!result[0]) {
      next();
    } else {
      throw new HttpError(`Missing ${result}!`, 400);
    }
  } catch (error) {
    res.status(error.code).json(error.message);
  }
};

export default {
  createBillValidate,
  updateBillValidate,
  createBillWalkInGuest,
  changeTable,
};
