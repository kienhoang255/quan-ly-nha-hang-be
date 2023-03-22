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

export default {
  userEmail,
  userPhone,
  createUserService,
  findOneUserService,
};
