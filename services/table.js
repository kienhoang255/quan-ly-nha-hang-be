import { TableModel } from "../models/TableModel.js";

export const createTableService = (data) => {
  const newTable = new TableModel(data);
  newTable.save();
  return newTable;
};

export const findOneTableService = async (props) => {
  return await TableModel.findOne(props);
};

export const delTableService = (data) => {
  return TableModel.deleteOne(data);
};

export const updateTableStatusService = (data, status) => {
  return TableModel.findOneAndUpdate(
    { _id: data.id_table },
    { status: status }
  );
};
