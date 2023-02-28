import { FoodModel } from "../models/FoodModel.js";

const create = async (data) => {
  const newFood = new FoodModel(data);
  await newFood.save();
  return newFood;
};

const find = async (data) => await FoodModel.find(data);

const findDistinct = async (option) => await FoodModel.distinct(option);

const findOne = async (data) => {
  return await FoodModel.findOne(data);
};

const findOneAndDel = async (data) => {
  return await FoodModel.findOneAndDelete(data);
};

const findOneAndUpdate = async (id, data) => {
  return await FoodModel.findOneAndUpdate({ _id: id }, data);
};

export default {
  create,
  find,
  findOne,
  findDistinct,
  findOneAndUpdate,
  findOneAndDel,
};
