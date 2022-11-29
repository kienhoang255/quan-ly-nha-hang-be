import { BillModel } from "../models/BillModel.js";

export const createBillService = async (data) => {
  const newBill = new BillModel(data);
  await newBill.save();
  return newBill;
};

export const findOneBillService = async (data) => {
  return await BillModel.findOne({ _id: data.id_bill });
};

export const findOneAndUpdateBillService = async (id, data) => {
  return await BillModel.findOneAndUpdate({ _id: id.id_bill }, data);
};
