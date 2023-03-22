import { BookingModel } from "../models/BookingModel.js";

const create = async (data) => {
  const create = new BookingModel(data);
  await create.save();
  return create;
};

const find = async (data) => {
  return await BookingModel.find(data);
};

const findOne = async (id, data) => {
  return await BookingModel.findOne(id, data);
};

const update = async (id, data) => {
  return await BookingModel.findOneAndUpdate(id, data);
};

export default { create, findOne, find, update };
