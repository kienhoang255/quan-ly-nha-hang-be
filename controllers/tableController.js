import { TableModel } from "../models/TableModel.js";
import tableService from "../services/tableService.js";

const get = async () => {
  return await tableService.find();
};

const create = async (data) => {
  const { numOfPeople, id_bill, status, stage, special } = data;
  const findTable = await tableService.findStage(data.stage);
  let count = 0;
  findTable.forEach((e) => (count += 1));
  const newData = {
    numOfPeople,
    id_bill,
    status,
    stage,
    special,
    name: `${stage}-${count + 1}`,
  };
  const create = await tableService.create(newData);
  return create;
};

const updateStatus = async (id_table, status) => {
  const updateTable = await tableService.updateStatus(id_table, status);
  return updateTable;
};

const update = async (data) => {
  await tableService.findOneAndUpdate({ _id: data._id }, data);

  return await tableService.findOne({ _id: data._id });
};

const del = async (data) => {
  return await tableService.del({ _id: data.id });
};

const checkStatus = async (data) => {
  let result;
  const findTable = await tableService.findOne({
    _id: data.id_table,
  });
  if (findTable.status === "using") {
    // if (findTable.special === "true") {
    //   result = true;
    // } else {
    result = false;
    // }
  } else {
    result = true;
  }
  return result;
};

export default { get, create, update, del, updateStatus, checkStatus };
