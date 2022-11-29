import { isNull } from "../validate/validate.js";

export const createFoodOrderedValidate = (req, res, next) => {
  try {
    const id_table = req.body.id_table;
    const foods = req.body.foods;
    const id_bill = req.body.id_bill;

    if (!isNull(id_table)) {
      return res.status(400).json("ID table field not received");
    }

    if (!isNull(foods)) {
      return res.status(400).json("Foods field not received");
    }

    let checkIdFood = true;
    foods.forEach((element) => {
      if (!isNull(element.id_food) || !isNull(element.quantity)) {
        checkIdFood = false;
      }
      return checkIdFood;
    });

    if (!checkIdFood) {
      return res.status(400).json("id_food or quantity is not received");
    }

    if (!isNull(id_bill)) {
      return res.status(400).json("ID bill field not received");
    }
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateFoodOrderedValidate = (req, res, next) => {
  try {
    const id_foodOrdered = req.body.id_foodOrdered;
    if (!isNull(id_foodOrdered)) {
      return res.status(400).json("ID foodOrdered field not received");
    }

    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};
