import { UserModel } from "../models/UserModel.js";

const userEmail = (data) => {
  const { username, email, password, role, job, verification } = data;
  const userEmail = {
    username,
    email,
    password,
    role,
    job,
    verification,
  };
  return userEmail;
};

const userPhone = (data) => {
  const { username, email, password, role, job, verification } = data;
  const userPhone = {
    username,
    email: undefined,
    phone: email,
    password,
    role,
    job,
    verification,
  };
  return userPhone;
};

const createUserService = async (data) => {
  const newUser = new UserModel(data);
  await newUser.save();
  return newUser;
};

const findOneUserService = async (data) => {
  return await UserModel.findOne(data);
};

const findOneAndUpdate = async (id, data) => {
  return await UserModel.findOneAndUpdate(id, data);
};

const findOne = async (data) => {
  return await UserModel.findOne(data);
};

const find = async (data) => await UserModel.find(data);

export default {
  userEmail,
  userPhone,
  createUserService,
  findOneUserService,
  findOneAndUpdate,
  findOne,
  find,
};
