const emailValidate = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(regex);
};

const isLength = (data, min, max = Infinity) => {
  if (data.length >= min && data.length <= max) return data;
};

export const resigterValidate = async (req, res, next) => {
  try {
    const min = 4;
    const email = await emailValidate(req.body.email);
    const password = await isLength(req.body.password, 8);
    const username = await isLength(req.body.username, min, 20);

    if (!username) {
      res.json({
        message: `Username must be at least ${min} characters and maximum 20 characters`,
      });
    } else if (!email) {
      res.json({
        message: "Invalid email!",
      });
    } else if (!password) {
      res.json({ message: "Password must be at least 8 characters!" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateValidate = async (req, res, next) => {
  try {
    const min = 4;
    const email = await emailValidate(req.body.email);
    const password = await isLength(req.body.password, 8);
    const username = await isLength(req.body.username, min, 20);

    if (!username) {
      res.json({
        message: `Username must be at least ${min} characters and maximum 20 characters`,
      });
    } else if (!email) {
      res.json({
        message: "Invalid email!",
      });
    } else if (!password) {
      res.json({ message: "Password must be at least 8 characters!" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// export const verifyToken = (req, res, next) => {
//   try {
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
