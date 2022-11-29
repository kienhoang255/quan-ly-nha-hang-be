import { ClientModel } from "../models/ClientModel.js";

export const clientEmail = (data) => {
  const { username, email, password, verification } = data;
  const clientEmail = {
    username,
    email,
    password,
    verification,
  };
  return clientEmail;
};

export const clientPhone = (data) => {
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

export const createClientService = async (data) => {
  const newClient = new ClientModel(data);
  await newClient.save();
  return newClient;
};

export const updateClientService = async (id, data) => {
  return await ClientModel.findOneAndUpdate(id, data);
};

export const findClientService = async () => {
  return await ClientModel.find();
};

export const findOneClientService = async (data) => {
  return await ClientModel.findOne(data);
};
