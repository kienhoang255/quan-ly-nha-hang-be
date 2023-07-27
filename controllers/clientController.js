import clientService from "../services/clientService.js";
import HttpError from "../utils/HttpError.js";
import { comparePassword } from "../utils/comparePassword.js";
import { setAccessToken } from "../utils/setToken.js";
import { isEmail } from "../validate/validate.js";
import bcrypt from "bcryptjs";

const checkVerification = (data) =>
  data.verification === "true" ? true : false;

const findOne = async (data) => {
  const findClient = { $or: [{ email: data.email }, { phone: data.email }] };
  return await clientService.findOne(findClient);
};

const create = async (data) => {
  const findClient = await findOne(data);
  const EmailClient = clientService.clientEmail(data);
  const PhoneClient = clientService.clientPhone(data);
  if (!findClient) {
    if (!isEmail(data.email)) {
      return await clientService.create({
        ...PhoneClient,
      });
    } else {
      return await clientService.create({
        ...EmailClient,
      });
    }
  } else if (findClient && !checkVerification(findClient)) {
    await updatePassword(data);
    return await clientService.update(
      { _id: findClient._id },
      {
        username: data.username,
        verification: "true",
      }
    );
  } else throw new HttpError("Account already exist", 400);
};

const createWalkInGuest = async (data) => {
  return await clientService.create({
    username: "Khách",
    password: "12341234",
    verification: "false",
  });
};

const findId = async (data) => {
  const { username, email, phone, address, sex, birth, createdAt, _id } =
    await clientService.findOne(data);
  return { username, email, phone, address, sex, birth, createdAt, _id };
};

const login = async (data) => {
  const findClient = await clientService.findOne({
    $or: [{ email: data.email }, { phone: data.email }],
  });
  if (findClient) {
    if (checkVerification(findClient)) {
      const { _id, username, password, email, phone, address, sex, birth } =
        findClient;
      const checkPassword = await comparePassword(data.password, password);
      if (checkPassword) {
        const createToken = await setAccessToken(_id, username);
        return { createToken, username, email, phone, address, sex, birth };
      } else {
        throw new HttpError("Email and password are not correct!", 404);
      }
    } else {
      throw new HttpError(
        "Your account is not verified, need resigter for verifiedAccount is not exist",
        402
      );
    }
  } else throw new HttpError("Account not exist!", 401);
};

const updatePassword = async (data) => {
  const { email, password } = data;
  const find = await clientService.findOne({
    $or: [{ email: email }, { phone: email }],
  });

  if (find) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return await clientService.update(
      { $or: [{ email: email }, { phone: email }] },
      { password: hashPassword, verification: "true" }
    );
  } else throw new HttpError("Email is not exist!", 400);
};

const get = async (data) => {
  const { username } = await clientService.findOne(data);
  return { username };
};

const preUpdate = async (data) => {
  const findClient = await clientService.findOne({ _id: data._id });

  // Check email and phone number
  if (data.email && data.phone) {
    const findAll = await clientService.find({
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
    const findAll = await clientService.find({ email: data.email });

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
    const findAll = await clientService.find({ phone: data.phone });

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
  return await clientService.update(
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
  create,
  createWalkInGuest,
  findId,
  findOne,
  updatePassword,
  login,
  get,
  update,
  preUpdate,
};
