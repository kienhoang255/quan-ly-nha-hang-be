import { UserModel } from "../models/UserModel.js";
import {
  createUserService,
  findOneUserService,
  userEmail,
  userPhone,
} from "../services/user.js";
import { isEmail } from "../validate/validate.js";
import { setAccessToken } from "../utils/setToken.js";
import { comparePassword } from "../utils/comparePassword.js";

const checkVerification = (data) =>
  data.verification === "true" ? true : false;

export const get = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const findOneUserController = async (data) => {
  const findUser = { $or: [{ email: data.email }, { phone: data.email }] };
  const result = await findOneUserService(findUser);
  return result;
};

export const createUserController = async (data) => {
  let result;
  const findUser = await findOneUserController(data);
  const EmailUser = userEmail(data);
  const PhoneUser = userPhone(data);
  if (findUser === null) {
    /**
     * Check user use email or phone to create
     * Then create
     */
    if (!isEmail(data.email)) {
      result = await createUserService(PhoneUser);
    } else {
      result = await createUserService(EmailUser);
    }
  }
  return result;
};

export const loginUserController = async (data) => {
  let result;
  const findUser = await findOneUserController(data);
  /**
   * Check verified account
   * If it's verified => do login
   * Else => Response Your account is not verified, need resigter for verified
   */

  /**
   * If account is not exist => -1
   * If doesn't verified => 1
   * If password is not correct => 2
   */
  if (findUser) {
    if (checkVerification(findUser)) {
      const { _id, username, password, role, email, phone, job, address } =
        findUser;
      const checkPassword = await comparePassword(data.password, password);
      if (checkPassword) {
        const createToken = await setAccessToken(username, role, job);
        result = { createToken, username, role, email, phone, job, address };
      } else {
        result = 2;
      }
    } else {
      result = 1;
    }
  } else result = -1;

  return result;
};

// export const updateUser = async (req, res) => {
//   req.body.password = (await bcrypt.hash(req.body.password, 10)).toString();
//   try {
//     const updateUser = req.body;
//     const id = req.body._id;

//     await UserModel.findOneAndUpdate({ _id: id }, updateUser, {
//       new: true,
//     });

//     res.status(200).json({ message: "Update successful!" });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };
