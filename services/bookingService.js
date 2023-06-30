import { BookingModel } from "../models/BookingModel.js";

const create = async (data) => {
  const create = new BookingModel(data);
  await create.save();
  return create;
};

const find = async (data) => {
  return await BookingModel.find(data).sort({ timeCheckIn: 1 });
};

const get = async (data, limit, skip) =>
  await BookingModel.find(data).limit(limit).skip(skip);

const count = async (data) => await BookingModel.find(data).count();

const findOne = async (id, data) => {
  return await BookingModel.findOne(id, data);
};

const update = async (id, data) => {
  return await BookingModel.findOneAndUpdate(id, data).sort({ timeCheckIn: 1 });
};

const findOneAndDelete = async (id) => {
  return await BookingModel.findOneAndDelete(id);
};

export default { create, findOne, find, update, get, count, findOneAndDelete };
