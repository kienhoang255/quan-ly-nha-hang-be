import { isNegative, isNull, isNumber } from "../validate/validate.js";

export const createFoodValidate = (req, res, next) => {
  try {
    const { name, price, type, image } = req.body;
    if (!isNull(name)) {
      return res.status(400).json("Name field not received");
    }

    if (!isNull(price)) {
      return res.status(400).json("Price field not received");
    }
    if (!isNumber(price)) {
      return res.status(400).json("Price must be a number");
    }
    if (!isNegative(price)) {
      return res.status(400).json("Price can not negative");
    }

    if (!isNull(type)) {
      return res.status(400).json("Type field not received");
    }

    if (!isNull(image)) {
      return res.status(400).json("Image field not received");
    }

    next();
  } catch (error) {
    res.status(500).json();
  }
};
