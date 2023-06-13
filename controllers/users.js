import userService from "../services/userService.js";
import { isEmail } from "../validate/validate.js";
import { setAccessToken } from "../utils/setToken.js";
import { comparePassword } from "../utils/comparePassword.js";
import HttpError from "../utils/HttpError.js";
import bcrypt from "bcryptjs";

const findOneUserController = async (data) => {
  const findUser = {
    $and: [
      { status: true },
      { $or: [{ email: data.email }, { phone: data.email }] },
    ],
  };
  const result = await userService.findOneUserService(findUser);
  return result;
};

const createUserController = async (data) => {
  let result;
  const findUser = await findOneUserController(data);
  const EmailUser = userService.userEmail(data);
  const PhoneUser = userService.userPhone(data);
  if (findUser === null) {
    /**
     * Check user use email or phone to create
     * Then create
     */
    if (!isEmail(data.email)) {
      result = await userService.createUserService(PhoneUser);
    } else {
      result = await userService.createUserService(EmailUser);
    }
  }
  return result;
};

const login = async (data) => {
  const findUser = await findOneUserController(data);
  if (findUser) {
    const checkPassword = await comparePassword(
      data.password,
      findUser.password
    );
    if (checkPassword) {
      const createToken = await setAccessToken(
        findUser._id,
        findUser.username,
        findUser.job
      );
      return { createToken, avatar: findUser.avatar };
    }
  }
  return false;
};

const get = async (data) => {
  const { username, job, avatar } = await userService.findOneUserService(data);
  return { username, job, avatar };
};

const changePassword = async (data) => {
  const { _id, password } = data;
  const find = await userService.findOne({ _id });
  if (find) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    return await userService.findOneAndUpdate(
      { _id },
      { password: hashPassword }
    );
  } else throw new HttpError("_id is not exist!", 400);
};

export default { login, get, createUserController, changePassword };
