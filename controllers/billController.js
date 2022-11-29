import {
  createBillService,
  findOneAndUpdateBillService,
  findOneBillService,
} from "../services/billService.js";
import {
  findOneTableService,
  updateTableStatusService,
} from "../services/tableService.js";
import { updateTableStatusController } from "./tableController.js";
import {
  createClientController,
  findOneClientController,
} from "./clientController.js";
import {
  findFOrderedService,
  findOneAndDeleteFOService,
} from "../services/foodOrderedService.js";

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

export const createBillController = async (data) => {
  /**
   * findClient
   * If exist => create bill
   * If not, create client then create bill
   */
  let result;
  const findClient = await findOneClientController(data);
  console.log(findClient);
  if (findClient !== null) {
    const newData = { id_client: findClient._id, id_table: data.id_table };

    console.log(
      "🚀 ~ file: billController.js ~ line 33 ~ createBillController ~ newData",
      newData
    );
    const createBill1 = await findTableAndCreateBillController(newData);
    const test = await updateTableStatusController(
      { id_table: data.id_table },
      "using"
    );
    result = createBill1;
  } else {
    const createClient = await createClientController(client(data.email));
    const newDataWhenCreateClient = {
      email: createClient.email,
      id_table: data.id_table,
    };
    const createBill2 = await createBillController(newDataWhenCreateClient);
    result = createBill2;
  }
  return result;
};

export const findTableAndCreateBillController = async (data) => {
  let result;
  const findTable = await findOneTableService(data);
  if (findTable) {
    const createBill = createBillService(data);
    result = createBill;
  }
  return result;
};

export const preCheckOutBillController = async (data) => {
  /**
   * false means there is food cooking
   */
  let result = true;
  const checkFood = await findFOrderedService(data);
  checkFood.forEach((element) => {
    if (element.status === "cooking") result = false;
  });

  return result;
};

export const checkOutBillController = async (data) => {
  const findFood = await findFOrderedService(data);
  const findTable = await findOneBillService(data);
  await updateTableStatusService(findTable, "empty");

  let totalPrice = 0;

  findFood.forEach((foodOrdered) => {
    totalPrice += foodOrdered.price * foodOrdered.quantity;
    findOneAndUpdateBillService(data, { $push: { orders: foodOrdered } });
    findOneAndDeleteFOService({ _id: foodOrdered._id });
  });
  await findOneAndUpdateBillService(data, { totalPrice, status: "finished" });
};

export const checkBillStatusController = async (data) => {};

export const getBillController = async (data) => {
  return await findOneBill(data);
};
