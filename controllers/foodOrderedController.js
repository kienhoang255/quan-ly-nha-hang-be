import foodOrderedService from "../services/foodOrderedService.js";
import foodService from "../services/foodService.js";
import tableService from "../services/tableService.js";

const find = async () => {
  return await foodOrderedService.find();
};

const findByStatus = async (status) => {
  return await foodOrderedService.find({ status });
};

const create = async (data) => {
  let result;

  result = await foodOrderedService.insertMulti(data).then((value) => value);
  return result;
};

const createMulti = async (data) => {
  let result;
  const { id_table, id_bill, id_food, quantity } = data;
};

const findOne = async (data) => {
  let result;
  result = await foodService.findOne(data);
  return result;
};

const updateServed = async (data) => {
  let result;
  const { id_table, id_food } = await foodOrderedService.updateStatus(
    data,
    "served"
  );
  const { name: nameTable } = await tableService.findOne({ id_table });
  const foodOrdered = await foodOrderedService.findOne({
    _id: data.id_foodOrdered,
  });
  const { name: nameFood } = await foodService.findOne({
    _id: id_food,
  });
  result = {
    foodOrdered,
    nameFood,
    nameTable,
    time: foodOrdered.updatedAt,
    id_food,
  };
  return result;
};

const updateCancel = async (data) => {
  await foodOrderedService.updateStatus(data, "cancel");
  return await foodOrderedService.findOne({
    _id: data.id_foodOrdered,
  });
};

const requestCancelFood = async (data) => {
  const update = await foodOrderedService.findOneAndUpdate(
    { _id: data._id },
    { cancelRequest: "request" }
  );
  const { name } = await foodService.findOne({ _id: update.id_food });
  const food = await foodOrderedService.findOne({ _id: data._id });
  return { food, nameFood: name, nameTable: data.nameTable };
};

const updateCancelAdmin = async (data) => {
  return await foodOrderedService.updateStatus(data, "cancel");
};

const getFoodByBill = async (data) => {
  return await foodOrderedService.find(data);
};

const updateCancelRequest = async (_id, option) => {
  return await foodOrderedService.findOneAndUpdate(
    { _id },
    { cancelRequest: option }
  );
};

export default {
  create,
  findOne,
  updateServed,
  updateCancel,
  updateCancelAdmin,
  getFoodByBill,
  find,
  findByStatus,
  requestCancelFood,
  updateCancelRequest,
};
