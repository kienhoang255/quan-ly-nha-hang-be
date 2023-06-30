import { UserModel } from "../models/UserModel.js";

const userEmail = (data) => {
  const { username, email, avatar, password, status, job, address, role } =
    data;
  const clientEmail = {
    username,
    email,
    avatar,
    password,
    status,
    job,
    address,
    role,
  };
  return clientEmail;
};

const userPhone = (data) => {
  const { username, phone, password, avatar, status, job, address, role } =
    data;
  const clientPhone = {
    username,
    avatar,
    email: undefined,
    phone: phone,
    password,
    status,
    job,
    role,
    address,
  };
  return clientPhone;
};

const get = async (data, limit, skip) => {
  return await UserModel.find(data).limit(limit).skip(skip).sort({ _id: -1 });
};

const count = async (data) => {
  return await UserModel.find(data).count();
};

const getOne = async (data) => {
  return await UserModel.findOne(data);
};

const create = async (data) => {
  const newUser = new UserModel(data);
  await newUser.save();
  return newUser;
};

const update = async (id, data) => {
  return await UserModel.findOneAndUpdate(id, data);
};

const del = async (id, data) => {
  return await UserModel.findOneAndDelete(id, data);
};

const findOne = async (data) => {
  return await UserModel.findOne(data);
};

const find = async (data) => await UserModel.find(data);

export default {
  get,
  getOne,
  create,
  userEmail,
  userPhone,
  update,
  del,
  count,
  findOne,
  find,
};
