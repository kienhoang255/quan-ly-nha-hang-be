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
  if (findClient === null) {
    if (!isEmail(data.email)) {
      return await clientService.create({
        ...PhoneClient,
        verification: "true",
      });
    } else {
      return await clientService.create({
        ...EmailClient,
        verification: "true",
      });
    }
  } else throw new HttpError("Account already exist", 400);
};

const createWalkInGuest = async (data) => {
  return await clientService.create({
    username: "Khách",
    password: "12341234",
    verification: "true",
  });
};

const findId = async (data) => {
  const { username, email, phone, address, sex, birth } =
    await clientService.findOne(data);
  return { username, email, phone, address, sex, birth };
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
    return clientService.update(
      { $or: [{ email: email }, { phone: email }] },
      { password: hashPassword, verification: "true" }
    );
  } else throw new HttpError("Email is not exist!", 400);
};

const get = async (data) => {
  const { username } = await clientService.findOne(data);
  return { username };
};

export default {
  create,
  createWalkInGuest,
  findId,
  findOne,
  updatePassword,
  login,
  get,
};
