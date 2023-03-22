import { isNull } from "../validate/validate.js";

const create = (req, res, next) => {
  try {
    const foods = req.body.foods;
    const id_bill = req.body.id_bill;

    if (!isNull(foods)) {
      return res.status(400).json("Foods field not received");
    }

    let checkIdFood = true;
    foods.forEach((element) => {
      if (
        !isNull(element.id_food) ||
        !isNull(element.quantity) ||
        !isNull(element.price)
      ) {
        checkIdFood = false;
      }
      return checkIdFood;
    });

    if (!checkIdFood) {
      return res
        .status(400)
        .json("id_food or quantity or price is not received");
    }

    if (!isNull(id_bill)) {
      return res.status(400).json("ID bill field not received");
    }
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

const update = (req, res, next) => {
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

export default { create, update };
