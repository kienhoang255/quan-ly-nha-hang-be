import { UserModel } from "../models/UserModel.js";

const userEmail = (data) => {
  const { username, email, avatar, password, verification } = data;
  const clientEmail = {
    username,
    email,
    avatar,
    password,
    verification,
  };
  return clientEmail;
};

const userPhone = (data) => {
  const { username, phone, password, avatar, verification } = data;
  const clientPhone = {
    username,
    avatar,
    email: undefined,
    phone: phone,
    password,
    verification,
  };
  return clientPhone;
};

const get = async (data) => {
  return await UserModel.find(data);
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

export default { get, getOne, create, userEmail, userPhone, update, del };
