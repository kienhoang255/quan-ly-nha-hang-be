import clientService from "../services/clientService.js";
import { comparePassword } from "../utils/comparePassword.js";
import { setAccessToken } from "../utils/setToken.js";
import { isEmail } from "../validate/validate.js";

const checkVerification = (data) =>
  data.verification === "true" ? true : false;

const findOne = async (data) => {
  const findClient = { $or: [{ email: data.email }, { phone: data.email }] };
  return await clientService.findOne(findClient);
};

const create = async (data) => {
  let result;
  const findClient = await findOne(data);
  const EmailClient = clientService.clientEmail(data);
  const PhoneClient = clientService.clientPhone(data);
  if (findClient === null) {
    if (!isEmail(data.email)) {
      result = await clientService.create(PhoneClient);
    } else {
      result = await clientService.create(EmailClient);
    }
  }
  return result;
};

const update = async () => {};

const findId = async (data) => {
  const { username, email, phone } = await clientService.findOne({
    _id: data.id_client,
  });
  return { username, email, phone };
};

const login = async (data) => {
  let result;
  const findClient = await clientService.findOne(data);
  if (findClient) {
    if (checkVerification(findClient)) {
      const { _id, username, password, email, phone, address } = findClient;
      const checkPassword = await comparePassword(data.password, password);
      if (checkPassword) {
        const createToken = await setAccessToken(username);
        result = { createToken, username, email, phone, address };
      } else {
        result = 2;
      }
    } else {
      result = 1;
    }
  } else result = -1;

  return result;
};

export default { checkVerification, create, findId, findOne, update, login };
