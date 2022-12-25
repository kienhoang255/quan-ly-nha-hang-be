import foodService from "../services/foodService.js";

const create = async (data) => {
  const createFood = await foodService.create(data);
  return createFood;
};

const find = async () => {
  return await foodService.find();
};

const findOneAndUpdate = async (data) => {
  await foodService.findOneAndUpdate({ _id: data._id }, data);
  return await foodService.findOne({ _id: data._id });
};

const findOneAndDel = async (data) => {
  return await foodService.findOneAndDel({ _id: data._id });
};

export default { create, find, findOneAndUpdate, findOneAndDel };
