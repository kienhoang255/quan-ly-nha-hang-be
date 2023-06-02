import billService from "../services/billService.js";
import clientService from "../services/clientService.js";
import foodOrderedService from "../services/foodOrderedService.js";
import foodService from "../services/foodService.js";
import tableService from "../services/tableService.js";
import { ClientController } from "./index.js";

const search = async (q, date, page) => {
  let get;

  if (!date) {
    get = {
      $or: [
        { "orders.id_bill": { $regex: q, $options: "i" } },
        { id_client: { $regex: q, $options: "i" } },
        {
          createdAt: {
            $gte: new Date(q).getTime(),
            $lte: new Date(q).getTime() + 86400000,
          },
        },
        {
          updatedAt: {
            $gte: new Date(q).getTime(),
            $lte: new Date(q).getTime() + 86400000,
          },
        },
      ],
    };
  } else if (!q) {
    get = {
      $or: [
        {
          createdAt: {
            $gte: new Date(date).getTime(),
            $lte: new Date(date).getTime() + 86400000,
          },
        },
        {
          updatedAt: {
            $gte: new Date(date).getTime(),
            $lte: new Date(date).getTime() + 86400000,
          },
        },
      ],
    };
  } else {
    get = {
      $or: [
        { "orders.id_bill": { $regex: q, $options: "i" } },
        { id_client: { $regex: q, $options: "i" } },
        {
          createdAt: {
            $gte: new Date(date).getTime(),
            $lte: new Date(date).getTime() + 86400000,
            // $gte: new Date(new Date(date).getTime()),
            // $lte: new Date(new Date(date).getTime() + 86400000),
          },
        },
        {
          updatedAt: {
            $gte: new Date(date).getTime(),
            $lte: new Date(date).getTime() + 86400000,
          },
        },
      ],
    };
  }

  const paginationCount = await billService.count(get);
  const paginationLimit = 12;
  const paginationPage = Math.ceil(paginationCount / paginationLimit);

  const data = await billService.findPagination(
    get,
    paginationLimit,
    page * paginationLimit
  );
  return { paginationCount, paginationPage, paginationLimit, data };
};

const getClientInfoByIdBill = async (id) => {
  const { id_client } = await billService.findBillByIdBill(id);

  const { avatar, username, email, phone } = await clientService.findOne({
    _id: id_client,
  });

  return { avatar, username, email, phone };
};

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
      // { status: "using", $push: { id_bill: createBill1._id } }
      { status: "using", id_bill: createBill1._id }
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

const createWalkInGuest = async (data) => {
  // Create a new client
  const createClient = await ClientController.createWalkInGuest();
  // Create a new bill for walk-in guest
  const createBill = await findTableAndCreate({
    id_client: createClient._id,
    id_table: data.id_table,
  });
  // Update table guest used
  await tableService.findOneAndUpdate(
    { _id: data.id_table },
    { status: "using", id_bill: createBill._id }
  );
  // Find table for return
  const table = await tableService.findOne({
    _id: data.id_table,
  });
  return { createBill, table };
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

  if (findFood[0]) {
    console.log("luu");
    findFood.forEach((foodOrdered) => {
      if (foodOrdered.status === "served")
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
  } else {
    console.log("xoa");
    await billService.findOneAndDelete({ _id: data.id_bill });
  }

  return await tableService.findOne({ _id: findTable.id_table });
};

const checkStatus = async (data) => {};

const getOne = async (data) => {
  return await billService.findOne(data);
};

const getAllUsing = async () => {
  return await billService.find({ status: "using" });
};

const getBillByIdUser = async (id) => {
  return await billService.find({ id_client: id });
};

const changeTable = async (data) => {
  // Change bill(id_table)
  await billService.findOneAndUpdate(
    { id_bill: data.id_bill },
    {
      id_table: data.id_table_to,
    }
  );

  // Change table(id_bill,status)
  await tableService.findOneAndUpdate(
    { _id: data.id_table },
    {
      status: "empty",
      id_bill: "",
    }
  );

  await tableService.findOneAndUpdate(
    { _id: data.id_table_to },
    { status: "using", id_bill: data.id_bill }
  );

  const tableTo = await tableService.findOne({ _id: data.id_table_to });
  const table = await tableService.findOne({ _id: data.id_table });

  return { tableTo: tableTo, table: table };
};

const getBillByIdBill = async (id) =>
  await billService.findOne({ id_bill: id });

const getAllInfo = async (data) => {
  const { name, stage } = await tableService.findOne({ _id: data.id_table });
  const { email, phone, username } = await clientService.findOne({
    _id: data.id_client,
  });

  let foodName = {};
  let { orders } = await getBillByIdBill(data.id_bill);

  if (!orders[0]) {
    orders = await foodOrderedService.find({ id_bill: data.id_bill });
  }

  for (const food of orders) {
    const { name } = await foodService.findOne({ _id: food.id_food });
    foodName = { ...foodName, [food.id_food]: name };
  }

  return { name, stage, email: email || phone || username, foodName };
};

export default {
  create,
  createWalkInGuest,
  findTableAndCreate,
  preCheckOut,
  checkStatus,
  getOne,
  getAllUsing,
  checkOut,
  getClientInfoByIdBill,
  getBillByIdUser,
  changeTable,
  getBillByIdBill,
  search,
  getAllInfo,
};
