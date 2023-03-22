import { TableModel } from "../models/TableModel.js";

const create = (data) => {
  const newTable = new TableModel(data);
  newTable.save();
  return newTable;
};

const find = async (data) => {
  return await TableModel.find(data);
};

const findOne = async (data) => {
  return await TableModel.findOne(data);
};

const del = (data) => {
  return TableModel.deleteOne(data);
};

const updateStatus = (data, status) => {
  return TableModel.findOneAndUpdate(
    { _id: data.id_table },
    { status: status }
  );
};

const updateCheckout = (data, status) => {
  return TableModel.findOneAndUpdate(
    { _id: data.id_table },
    { status: status, id_bill: [] }
  );
};

const findOneAndUpdate = (filter, data) => {
  return TableModel.findOneAndUpdate(filter, data);
};

const findStage = (stage) => {
  return TableModel.find({ stage: stage });
};

const findDistinct = async (option) => await TableModel.distinct(option);

export default {
  create,
  find,
  findOne,
  updateStatus,
  updateCheckout,
  findOneAndUpdate,
  findStage,
  del,
  findDistinct,
};
