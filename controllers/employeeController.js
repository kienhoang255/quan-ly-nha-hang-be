import employeeService from "../services/employeeService.js";
import { isEmail } from "../validate/validate.js";

const get = async (data) => {
  return await employeeService.get(data);
};

const getOne = async (data) => {
  return await employeeService.getOne(data);
};

const getRole = async (data) => {
  return await employeeService.get(data);
};

const create = async (data) => {
  let result;
  let findOne;

  if (data.email && data.phone) {
    findOne = await employeeService.getOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });
  } else if (data.email)
    findOne = await employeeService.getOne({ email: data.email });
  else if (data.phone) {
    findOne = await employeeService.getOne({ phone: data.phone });
  }
  const EmailUser = employeeService.userEmail(data);
  const PhoneUser = employeeService.userPhone(data);
  if (findOne === null) {
    if (isEmail(data?.email)) {
      result = await employeeService.create(EmailUser);
    } else {
      result = await employeeService.create(PhoneUser);
    }
  }
  return result;
};

const update = async (data) => {
  let result;
  const findOne = await employeeService.getOne({
    $or: [{ email: data.email }, { phone: data.email }],
  });
  if (findOne) {
    await employeeService.update({ _id: findOne._id }, data);
    result = await employeeService.getOne({
      $or: [{ email: data.email }, { phone: data.email }],
    });
  }
  return result;
};

const del = async (data) => {
  return await employeeService.del(data);
};

export default { get, create, update, del, getOne };
