import employeeService from "../services/employeeService.js";
import HttpError from "../utils/HttpError.js";
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

const preUpdate = async (data) => {
  const findClient = await employeeService.findOne({ _id: data._id });

  // Check email and phone number
  if (data.email && data.phone) {
    const findAll = await employeeService.find({
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
    const findAll = await employeeService.find({ email: data.email });
    console.log(
      "🚀 ~ file: employeeController.js:99 ~ preUpdate ~ findAll:",
      findAll
    );

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
    const findAll = await employeeService.find({ phone: data.phone });

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
  await employeeService.update({ _id: data._id }, data);
  return await employeeService.getOne({ _id: data._id });
};

const del = async (data) => {
  await employeeService.update({ _id: data }, { status: false });
  return await employeeService.getOne({ _id: data });
};

const restore = async (data) => {
  await employeeService.update({ _id: data }, { status: true });
  return await employeeService.getOne({ _id: data });
};

export default { get, create, update, del, getOne, search, restore, preUpdate };
