import billService from "../services/billService.js";
import foodOrderedService from "../services/foodOrderedService.js";
import tableService from "../services/tableService.js";
import { ClientController } from "./index.js";

const client = (email) => {
  const result = {
    username: email,
    email: email,
    password: "12341234",
    role: "0",
    verification: "false",
    status: "",
  };
  return result;
};

const create = async (data) => {
  let result;
  const findClient = await ClientController.findOne(data);
  if (findClient) {
    const newData = { id_client: findClient._id, id_table: data.id_table };
    const createBill1 = await findTableAndCreate(newData);
    await tableService.findOneAndUpdate(
      { _id: data.id_table },
      { status: "using", $push: { id_bill: createBill1._id } }
    );
    const table = await tableService.findOne({
      _id: data.id_table,
    });
    result = { createBill1, table };
  } else {
    const createClient = await ClientController.create(client(data.email));
    const newDataWhenCreateClient = {
      email: createClient.email || createClient.phone,
      id_table: data.id_table,
    };
    result = await create(newDataWhenCreateClient);
  }
  return result;
};

const findTableAndCreate = async (data) => {
  let result;
  const findTable = await tableService.findOne({
    _id: data.id_table,
  });
  if (findTable) {
    const createBill = billService.create(data);
    result = createBill;
  }
  return result;
};

const preCheckOut = async (data) => {
  let result = true;
  const checkFood = await foodOrderedService.find(data);
  checkFood.forEach((element) => {
    if (element.status === "cooking") result = false;
  });

  return result;
};

const checkOut = async (data) => {
  const findFood = await foodOrderedService.find(data);
  const findTable = await billService.findOne(data);
  await tableService.updateCheckout(findTable, "empty");

  let totalPrice = 0;

  findFood.forEach((foodOrdered) => {
    totalPrice += foodOrdered.price * foodOrdered.quantity;
    billService.findOneAndUpdate(data, {
      $push: { orders: foodOrdered },
    });
    foodOrderedService.findOneAndDelete({ _id: foodOrdered._id });
  });
  await billService.findOneAndUpdate(data, {
    totalPrice,
    status: "finished",
  });

  return await tableService.findOne({ _id: findTable.id_table });
};

const checkStatus = async (data) => {};

const getOne = async (data) => {
  return await billService.findOne(data);
};

const getAllUsing = async () => {
  return await billService.find({ status: "using" });
};

export default {
  create,
  findTableAndCreate,
  preCheckOut,
  checkStatus,
  getOne,
  getAllUsing,
  checkOut,
};
