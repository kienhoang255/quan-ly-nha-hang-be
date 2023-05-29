import { BillModel } from "../models/BillModel.js";

const findBillByIdBill = async (id) => await BillModel.findById({ _id: id });

const create = async (data) => {
  const newBill = new BillModel(data);
  await newBill.save();
  return newBill;
};

const findOne = async (data) => {
  return await BillModel.findOne({ _id: data.id_bill });
};

const find = async (data) => {
  return await BillModel.find(data);
};

const findPagination = async (data, limit, skip) => {
  return await BillModel.find(data).limit(limit).skip(skip);
};

const findOneAndUpdate = async (id, data) => {
  return await BillModel.findOneAndUpdate({ _id: id.id_bill }, data);
};

const findOneAndDelete = async (id) => {
  return await BillModel.findByIdAndDelete(id);
};

const findDistinct = async (option) => {
  return await BillModel.distinct(option);
};

const count = async (data) => {
  return await BillModel.find(data).count();
};

export default {
  create,
  findOne,
  findOneAndUpdate,
  findOneAndDelete,
  find,
  findBillByIdBill,
  findDistinct,
  findPagination,
  count,
};
