export const emailValidate = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(regex);
};

export const phoneNumValidate = (phone) =>
  phone.match(/\d/g).length === 10 || phone.match(/\d/g).length === 11;

const isLength = (data, min, max = Infinity) => {
  if (data.length >= min && data.length <= max) return data;
};

export const resigterValidate = async (req, res, next) => {
  try {
    const min = 4;
    const password = await isLength(req.body.password, 8);
    const username = await isLength(req.body.username, min, 20);

    if (!username) {
      res.status(400).json({
        message: `Username must be at least ${min} characters and maximum 20 characters`,
      });
    } else if (!password) {
      res
        .status(400)
        .json({ message: "Password must be at least 8 characters!" });
    } else {
      if (emailValidate(req.body.email)) {
        next();
      } else {
        if (phoneNumValidate(req.body.email)) {
          next();
        } else {
          res.status(400).json({ message: "This is invalid" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateValidate = async (req, res, next) => {
  try {
    const min = 4;
    const email = await emailValidate(req.body.email);
    const password = await isLength(req.body.password, 8);
    const username = await isLength(req.body.username, min, 20);
    const phone = await phoneNumValidate(req.body.phone);

    if (!username) {
      res.status(401).json({
        message: `Username must be at least ${min} characters and maximum 20 characters`,
      });
    } else if (!email) {
      res.status(401).json({
        message: "Invalid email!",
      });
    } else if (!password) {
      res
        .status(401)
        .json({ message: "Password must be at least 8 characters!" });
    } else if (!phone) {
      res.status(401).json({ message: "This is not a phone number" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
