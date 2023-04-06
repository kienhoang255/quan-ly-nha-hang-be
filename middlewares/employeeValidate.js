import employeeController from "../controllers/employeeController.js";

const checkExistId = async (req, res, next) => {
  try {
    const _id = req.body._id;
    const phone = req.body.phone;
    const email = req.body.email;

    const check = await employeeController.getOne({
      _id,
    });

    //check id exists
    if (check) {
      if (email && phone) {
        const checkBoth = await employeeController.get({
          $or: [{ phone }, { email }],
        });
        const holder = checkBoth.filter(
          (e) => e._id.toString() !== check._id.toString()
        );

        if (holder.length === 0) {
          next();
        } else if (phone === holder[0].phone) {
          return res
            .status(401)
            .json({ message: "Phone number already exists" });
        } else if (email === holder[0].email) {
          return res.status(402).json({ message: "Email already exists" });
        } else next();
      } else if (phone) {
        //check phone number has been changed ?
        if (phone === check.phone) {
          next();
        } else {
          const checkPhone = await employeeController.getOne({
            phone,
          });
          //check phone number exists
          if (checkPhone) {
            return res
              .status(401)
              .json({ message: "Phone number already exists" });
          } else next();
        }
      } else if (email) {
        //check email number has been changed ?
        if (email === check.email) {
          next();
        } else {
          const checkEmail = await employeeController.getOne({
            email,
          });
          //check email number exists
          if (checkEmail) {
            return res.status(402).json({ message: "Email already exists" });
          } else next();
        }
      }
    } else
      return res
        .status(400)
        .json("Something wrong! Please contact the developer");
  } catch (error) {
    res.status(500).json();
  }
};

const checkExistValue = async (req, res, next) => {
  try {
    const phone = req.body.phone;
    const email = req.body.email;

    if (email && phone) {
      const checkBoth = await employeeController.get({
        $or: [{ phone }, { email }],
      });

      if (checkBoth.length === 0) {
        next();
      } else if (checkBoth.filter((e) => e.email !== email)) {
        return res.status(402).json({ message: "Email already exists" });
      } else if (checkBoth.filter((e) => e.phone !== phone)) {
        return res.status(401).json({ message: "Phone number already exists" });
      } else next();
    } else if (phone) {
      const checkPhone = await employeeController.getOne({
        phone,
      });
      //check phone number exists
      if (checkPhone) {
        return res.status(401).json({ message: "Phone number already exists" });
      } else next();
    } else if (email) {
      //check
      const checkEmail = await employeeController.getOne({
        email,
      });
      //check email number exists
      if (checkEmail) {
        return res.status(402).json({ message: "Email already exists" });
      } else next();
    }
  } catch (error) {
    res.status(500).json();
  }
};

export default { checkExistId, checkExistValue };
