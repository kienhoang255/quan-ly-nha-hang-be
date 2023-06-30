import { ClientModel } from "../models/ClientModel.js";

const clientEmail = (data) => {
  const { username, email, password, verification } = data;
  const clientEmail = {
    username,
    email,
    password,
    verification,
  };
  return clientEmail;
};

const clientPhone = (data) => {
  const { username, email, password, verification } = data;
  const clientPhone = {
    username,
    email: undefined,
    phone: email,
    password,
    verification,
  };
  return clientPhone;
};

const create = async (data) => {
  const newClient = new ClientModel(data);
  await newClient.save();
  return newClient;
};

const update = async (id, data) => {
  return await ClientModel.findOneAndUpdate(id, data);
};

const find = async (data) => {
  return await ClientModel.find(data);
};

const findOne = async (data) => {
  return await ClientModel.findOne(data);
};

export default { clientEmail, clientPhone, create, update, find, findOne };
