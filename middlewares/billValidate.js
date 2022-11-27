import { isEmail, isNull, isPhoneNumber } from "../validate/validate.js";

export const createBillValidate = (req, res, next) => {
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

export const updateBillValidate = (req, res, next) => {
  try {
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
