import { BillModel } from "../models/BillModel.js";

export const createBillService = async (data) => {
  const newBill = new BillModel(data);
  await newBill.save();
  return newBill;
};
