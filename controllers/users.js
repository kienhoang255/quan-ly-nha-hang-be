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
        findUser.job,
        findUser.role
      );
      return { createToken, avatar: findUser.avatar };
    }
  }
  return false;
};

const get = async (data) => {
  const { username, job, avatar, role } = await userService.findOneUserService(
    data
  );
  return { username, job, avatar, role };
};

const find = async (data) => {
  const { _id, username, email, phone, address, job, createdAt, avatar, role } =
    await userService.findOneUserService(data);
  return { _id, username, email, phone, address, job, createdAt, avatar, role };
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

const preUpdate = async (data) => {
  const findClient = await userService.findOne({ _id: data._id });

  // Check email and phone number
  if (data.email && data.phone) {
    const findAll = await userService.find({
      $or: [{ email: data.email }, { phone: data.phone }],
    });
    if (findAll.length == 0) {
      return update(data);
    } else if (
      findAll.length === 1 &&
      String(findAll[0]._id) == String(findClient._id)
    ) {
      return update(data);
    } else
      throw new HttpError(
        "Email/Phone number already exists, can not update!",
        400
      );
  }

  // Check email only
  else if (data.email) {
    const findAll = await userService.find({ email: data.email });

    if (findAll.length == 0) {
      return update(data);
    } else if (
      findAll.length === 1 &&
      String(findAll[0]._id) == String(findClient._id)
    ) {
      return update(data);
    } else throw new HttpError("Email already exists, can not update!", 401);
  }

  // Check phone number only
  else if (data.phone) {
    const findAll = await userService.find({ phone: data.phone });

    if (findAll.length == 0) {
      return update(data);
    } else if (
      findAll.length === 1 &&
      String(findAll[0]._id) == String(findClient._id)
    ) {
      return update(data);
    } else
      throw new HttpError("Phone number already exists, can not update!", 402);
  } else throw new HttpError("Email & phone can not empty!", 403);
};

const update = async (data) => {
  return await userService.findOneAndUpdate(
    { _id: data._id },
    {
      username: data.username,
      phone: data.phone,
      email: data.email,
      address: data.address,
      birth: data.birth,
      sex: data.sex,
    }
  );
};

export default {
  login,
  get,
  createUserController,
  changePassword,
  find,
  preUpdate,
};
