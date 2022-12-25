import { FoodOrderedModel } from "../models/FoodOrderedModel.js";

const create = async (data) => {
  const newFOrdered = new FoodOrderedModel(data);
  await newFOrdered.save();
  return newFOrdered;
};

const updateStatus = (data, status) => {
  return FoodOrderedModel.findOneAndUpdate(
    { _id: data.id_foodOrdered },
    { status: status }
  );
};

const find = async (data) => {
  return await FoodOrderedModel.find(data);
};

const insertMulti = async (data) => {
  return await FoodOrderedModel.insertMany(data).then((value) => {
    return value;
  });
};

const findOne = async (data) => {
  return await FoodOrderedModel.findOne(data);
};

const findOneAndDelete = async (data) => {
  return await FoodOrderedModel.findOneAndDelete(data);
};

export default {
  create,
  updateStatus,
  find,
  findOneAndDelete,
  findOne,
  insertMulti,
};
