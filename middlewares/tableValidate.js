import { isMax, isNull, isNumber } from "../validate/validate.js";

export const createTableValidate = (req, res, next) => {
  try {
    const { numOfPeople, status, stage } = req.body;

    if (!isNull(stage)) {
      return res.status(400).json("Stage field not received");
    }

    if (!isNumber(stage)) {
      return res.status(400).json("Stage must be a number");
    }

    if (!isNull(status)) {
      return res.status(400).json("Status field not received");
    }

    if (!isNull(numOfPeople)) {
      return res.status(400).json("Number of people field not received");
    }
    if (!isNumber(numOfPeople)) {
      return res.status(400).json("Number of people must be a number");
    }
    if (isMax(numOfPeople, 40)) {
      return res.status(400).json("Number of people is too big");
    }

    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateTableValidate = (req, res, next) => {
  createTableValidate(req, res, next);
};
