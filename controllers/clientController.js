import {
  clientEmail,
  clientPhone,
  createClientService,
  findOneClientService,
} from "../services/clientService.js";
import { comparePassword } from "../utils/comparePassword.js";
import { setAccessToken } from "../utils/setToken.js";
import { isEmail } from "../validate/validate.js";

const checkVerification = (data) =>
  data.verification === "true" ? true : false;

export const findOneClientController = async (data) => {
  const findClient = { $or: [{ email: data.email }, { phone: data.email }] };
  return await findOneClientService(findClient);
};

export const createClientController = async (data) => {
  let result;
  const findClient = await findOneClientController(data);
  const EmailClient = clientEmail(data);
  const PhoneClient = clientPhone(data);
  if (findClient === null) {
    /**
     * Check Client use email or phone to create
     * Then create
     */
    if (!isEmail(data.email)) {
      result = await createClientService(PhoneClient);
    } else {
      result = await createClientService(EmailClient);
    }
  }
  return result;
};

export const updateClientController = async () => {};

export const findClientController = async () => {};

export const loginClientController = async (data) => {
  let result;
  const findClient = await findOneClientController(data);
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
