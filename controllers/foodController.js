import foodService from "../services/foodService.js";

const create = async (data) => {
  const createFood = await foodService.create(data);
  return createFood;
};

const find = async (data) => {
  return await foodService.find(data);
};

const findOne = async (data) => {
  return await foodService.findOne(data);
};

const findDistinct = async (option = "_id") =>
  await foodService.findDistinct(option);

const findById = async (data) => {
  return await foodService.findOne({ _id: data });
};

const findOneAndUpdate = async (data) => {
  await foodService.findOneAndUpdate({ _id: data._id }, data);
  return await foodService.findOne({ _id: data._id });
};

const findOneAndDel = async (data) => {
  return await foodService.findOneAndDel({ _id: data._id });
};

export default {
  create,
  find,
  findDistinct,
  findById,
  findOneAndUpdate,
  findOneAndDel,
  findOne,
};
