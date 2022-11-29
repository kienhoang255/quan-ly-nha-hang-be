import { TableModel } from "../models/TableModel.js";
import {
  createTableService,
  delTableService,
  findOneTableService,
  findStageTableService,
  updateTableStatusService,
} from "../services/tableService.js";

export const createTableController = async (data) => {
  const { numOfPeople, id_bill, status, stage, special } = data;
  const findTable = await findStageTableService(data.stage);
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
  const create = await createTableService(newData);
  return create;
};

export const updateTableStatusController = async (id_table, status) => {
  const updateTable = await updateTableStatusService(id_table, status);
  return updateTable;
};

export const checkTableStatusController = async (data) => {
  let result;
  const findTable = await findOneTableService({ _id: data.id_table });
  if (findTable.status === "using") {
    if (findTable.special === "true") {
      result = true;
    } else {
      result = false;
    }
  } else {
    result = true;
  }
  return result;
};
