import { FoodModel } from "../models/FoodModel.js";

export const createFoodService = async (data) => {
  const newFood = new FoodModel(data);
  await newFood.save();
  return newFood;
};

export const findFoodService = async (data) => {
  return await FoodModel.find(data);
};

export const findOneFoodService = async (data) => {
  return await FoodModel.findOne(data);
};

export const findOneFoodAndUpdateService = async (id, data) => {
  return await FoodModel.findOneAndUpdate({ _id: id }, data);
};
