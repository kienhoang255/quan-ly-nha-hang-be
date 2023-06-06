import employeeService from "../services/employeeService.js";
import { isEmail } from "../validate/validate.js";

const get = async (data) => {
  return await employeeService.get(data, 10, 2);
};

const search = async (req) => {
  const get = {
    $and: [
      { status: req.status },
      {
        $or: [
          { username: { $regex: req.q, $options: "i" } },
          { email: { $regex: req.q, $options: "i" } },
          { address: { $regex: req.q, $options: "i" } },
          { phone: { $regex: req.q, $options: "i" } },
          { role: { $regex: req.q, $options: "i" } },
          { job: { $regex: req.q, $options: "i" } },
        ],
      },
    ],
  };
  const paginationCount = await employeeService.count(get);
  const paginationLimit = 10;
  const paginationPage = Math.ceil(paginationCount / paginationLimit);

  const data = await employeeService.get(
    get,
    paginationLimit,
    req.page * paginationLimit
  );

  return { paginationCount, paginationPage, paginationLimit, data };
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
    if (data?.email && data.phone) {
      result = await employeeService.create(data);
    } else if (isEmail(data?.email)) {
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
  await employeeService.update({ _id: data }, { status: false });
  return await employeeService.getOne({ _id: data });
};

const restore = async (data) => {
  await employeeService.update({ _id: data }, { status: true });
  return await employeeService.getOne({ _id: data });
};

export default { get, create, update, del, getOne, search, restore };
