import {
  isEmail,
  isLength,
  isNull,
  isPhoneNumber,
} from "../validate/validate.js";

export const createClientValidate = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const min = 4;
    const max = 20;
    if (!isNull(username)) {
      return res.status(400).json("Name field not received");
    }
    if (!isLength(username, min, max)) {
      return res
        .status(400)
        .json(`Name field with at least ${min} and up to ${max} characters`);
    }

    if (!isNull(password)) {
      return res.status(400).json("Password field not received");
    }
    if (!isLength(password, min)) {
      return res.status(400).json(`Password is not strong enough`);
    }

    if (!isNull(email)) {
      return res.status(400).json("Email field not received");
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
    res.status(500).json({ error });
  }
};

export const loginClientValidate = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!isNull(password)) {
      return res.status(400).json("Password field not received");
    }
    if (!isNull(email)) {
      return res.status(400).json("Email field not received");
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
