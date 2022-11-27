import { UserModel } from "../models/UserModel.js";
import { BillModel } from "../models/BillModel.js";
import { createBillService } from "../services/bill.js";
import { findOneTableService } from "../services/table.js";
import { createUserController, findOneUserController } from "./users.js";
import { updateTableStatusController } from "./table.js";

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

export const clientCheckIn = async (req, res) => {
  try {
    const id_table = req.body.id_table;
    const email = req.body.email;
    // const id_user = findEmail?._id;

    // const newBill = new BillModel({ id_table });
    const findEmail = await UserModel.findOne({
      $or: [{ email: email }, { phone: email }],
    });
    if (findEmail) {
      res.status(200).json({ table, findEmail });
    } else {
      await createUser(client(email));
      // res.status(201).json({ message: "Khong tim thay" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export const createBillController = async (data) => {
  /**
   * findUser
   * If exist => create bill
   * If not, create user then create bill
   */
  let result;
  const findUser = await findOneUserController(data);
  if (findUser !== null) {
    const newData = { id_user: findUser._id, id_table: data.id_table };
    const createBill1 = await findTableAndCreateBillController(newData);
    const test = await updateTableStatusController(
      { id_table: data.id_table },
      "using"
    );
    console.log(
      "🚀 ~ file: bill.js ~ line 53 ~ createBillController ~ test",
      test
    );
    result = createBill1;
  } else {
    const createUser = await createUserController(client(data.email));
    const newDataWhenCreateUSer = {
      email: createUser.email,
      id_table: data.id_table,
    };
    const createBill2 = await createBillController(newDataWhenCreateUSer);
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

export const checkBillStatusController = async (data) => {};
