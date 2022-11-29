import { FoodOrderedModel } from "../models/FoodOrderedModel.js";

export const createFoodOrderedService = async (data) => {
  const newFOrdered = new FoodOrderedModel(data);
  await newFOrdered.save();
  return newFOrdered;
};

export const updateFoodOrderedStatusService = (data, status) => {
  return FoodOrderedModel.findOneAndUpdate(
    { _id: data.id_foodOrdered },
    { status: status }
  );
};

export const findFOrderedService = async (data) => {
  return await FoodOrderedModel.find(data);
};

export const findOneAndDeleteFOService = async (data) => {
  return await FoodOrderedModel.findOneAndDelete(data);
};
