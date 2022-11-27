import { TableModel } from "../models/TableModel.js";
import {
  createTableService,
  delTableService,
  findOneTableService,
  updateTableStatusService,
} from "../services/table.js";

export const createTable = async (req, res) => {
  try {
    const { numOfPeople, id_bill, status, stage } = req.body;
    const create = await createTableService({
      numOfPeople,
      id_bill,
      status,
      stage,
    });
    res.status(200).json({ message: "Create successful", create });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createTableController = async (data) => {
  const create = await createTableService(data);
  return create;
};

export const getTable = async (req, res) => {
  try {
    const findTable = await findOneTableService();
    res.status(200).json(findTable);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const findTable = async (req, res) => {
  try {
    const find = req.body.find;
    const conditions = { $or: [{ numOfPeople: find }, { stage: find }] };
    const findTable = await findOneTableService(conditions);
    res.status(200).json(findTable);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const findTableStage = async (req, res) => {
  try {
    const find = { stage: req.body.find };
    const findTable = await findOneTableService(find);
    res.status(200).json(findTable);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const findTableEmpty = async (req, res) => {
  try {
    const find = { status: "empty" };
    const findTable = await findOneTableService(find);
    res.status(200).json(findTable);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const delTable = async (req, res) => {
  try {
    const id = { _id: req.body.id_table };
    const findTable = await findOneTableService(id);
    if (findTable) {
      await delTableService(id);
      res.status(200).json({ message: "Delete successful" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateTableStatusController = async (id_table, status) => {
  const updateTable = await updateTableStatusService(id_table, status);
  console.log(updateTable);
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
