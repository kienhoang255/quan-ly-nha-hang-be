import { TableImageModel } from "../models/TableImageModel.js";

const create = async (data) => {
  const newTableImage = new TableImageModel(data);
  await newTableImage.save();
  return newTableImage;
};

const find = async (data) => await TableImageModel.find(data);

const findOne = async (data) => await TableImageModel.findOne(data);

const findOneUpdate = async (id, data) =>
  await TableImageModel.findOneAndUpdate(id, data);

const findDistinct = async (option) => await TableImageModel.distinct(option);

const findOneAndDelete = async (data) =>
  await TableImageModel.findOneAndDelete(data);

export default {
  create,
  find,
  findOne,
  findOneUpdate,
  findDistinct,
  findOneAndDelete,
};
