import { TableModel } from "../models/TableModel.js";
import bookingService from "../services/bookingService.js";
import tableImageService from "../services/tableImageService.js";
import tableService from "../services/tableService.js";
import HttpError from "../utils/HttpError.js";
import tableImageController from "./tableImageController.js";

const get = async (data) => {
  return await tableService.find(data);
};

const search = async (data) => {
  const { stage, numOfPeople, timeCheckIn, dateCheckIn } = data;

  const findTable = async () => {
    if (stage)
      return await tableService.find({
        numOfPeople: { $gte: numOfPeople ? numOfPeople : 0 },
        stage: stage,
      });
    else
      return await tableService.find({
        numOfPeople: { $gte: numOfPeople ? numOfPeople : 0 },
      });
  };

  let result = await findTable();

  if (timeCheckIn && dateCheckIn) {
    const splitTime = timeCheckIn?.split(":");
    const timeStart = `${
      splitTime[0] < 10 ? `0${splitTime[0]}` : splitTime[0]
    }${splitTime[1]}`;

    const timeEnd = `${Number(splitTime[0]) + 4}${splitTime[1]}`;

    const findBooking = await bookingService.find({
      $and: [
        { status: "pending" },
        {
          $or: [
            { timeCheckIn: { $gte: timeStart, $lte: timeEnd } },
            { timeCheckOut: { $gte: timeStart, $lte: timeEnd } },
          ],
          dateCheckIn: dateCheckIn,
        },
      ],
    });

    findBooking.forEach((book) => {
      let count = 0;
      result.forEach((table) => {
        if (table._id.toString() === book.id_table) {
          result.splice(count, 1);
        }
        count++;
      });
    });
  }
  return result;
};

const searchByFilter = async (data) => {
  const { timeCheckIn, dateCheckIn, options, stage, numOfPeople } = data;

  const findTable = await tableImageController.find(options);

  let result = [];

  // if (stage && numOfPeople) {
  //   result = findTable.filter(
  //     (e) => e.stage === stage && e.numOfPeople >= numOfPeople
  //   );
  // } else if (!stage && numOfPeople) {
  //   result = findTable.filter((e) => e.numOfPeople >= numOfPeople);
  // } else if (stage && !numOfPeople) {
  //   result = findTable.filter((e) => e.stage === stage);
  // } else
  result = findTable;

  if (timeCheckIn && dateCheckIn) {
    const splitTime = timeCheckIn?.split(":");
    const timeStart = `${
      splitTime[0] < 10 ? `0${splitTime[0]}` : splitTime[0]
    }${splitTime[1]}`;

    const timeEnd = `${Number(splitTime[0]) + 4}${splitTime[1]}`;

    const findBooking = await bookingService.find({
      $and: [
        { status: "pending" },
        {
          $or: [
            { timeCheckIn: { $gte: timeStart, $lte: timeEnd } },
            { timeCheckOut: { $gte: timeStart, $lte: timeEnd } },
          ],
          dateCheckIn: dateCheckIn,
        },
      ],
    });

    findBooking.forEach((book) => {
      let count = 0;
      result.forEach((table) => {
        if (table._id.toString() === book.id_table) {
          result.splice(count, 1);
        }
        count++;
      });
    });
  }
  return result;
};

const create = async (data) => {
  const { numOfPeople, stage, image1, image2, image3, image4, options } = data;
  const findTable = await tableService.findStage(stage);
  let count = 0;
  let numberMissing;
  findTable.forEach((e) => {
    count += 1;
    if (e.name !== `${stage}-${count}`) {
      numberMissing = count;
    }
  });
  const newData = {
    numOfPeople,
    stage,
    name: `${stage}-${numberMissing || count + 1}`,
  };
  const table = await tableService.create(newData);
  const tableImage = await tableImageController.create({
    id_table: table._id,
    image1,
    image2,
    image3,
    image4,
    options,
  });
  return { table, tableImage };
};

const updateStatus = async (id_table, status) => {
  const updateTable = await tableService.updateStatus(id_table, status);
  return updateTable;
};

const update = async (data) => {
  const { _id, numOfPeople, stage, image1, image2, image3, image4, options } =
    data;

  const checkStage = await tableService.findOne({ _id: _id });

  if (Number(checkStage.stage) === Number(stage)) {
    const findStage = await tableService.findStage(stage);

    let count = 0;
    let numberMissing;
    findStage.forEach((e) => {
      count += 1;
      if (e.name !== `${stage}-${count}`) {
        if (!numberMissing) numberMissing = count;
      }
    });
    if (numberMissing) {
      await tableService.findOneAndUpdate(
        { _id: data._id },
        {
          numOfPeople: data.numOfPeople,
          name: `${stage}-${numberMissing}`,
        }
      );
    } else
      await tableService.findOneAndUpdate(
        { _id: data._id },
        {
          numOfPeople: data.numOfPeople,
        }
      );
  } else {
    const findStage = await tableService.findStage(stage);
    let count = 0;
    let numberMissing;
    findStage.forEach((e) => {
      count += 1;
      if (e.name !== `${stage}-${count}`) {
        numberMissing = count;
      }
    });
    const newData = {
      numOfPeople,
      stage,
      name: `${stage}-${numberMissing || count + 1}`,
    };
    await tableService.findOneAndUpdate({ _id: data._id }, newData);
  }

  const findTableImage = await tableImageController.findOne({ id_table: _id });
  if (findTableImage) {
    await tableImageController.update({
      id_table: _id,
      image1,
      image2,
      image3,
      image4,
      options,
    });
  } else {
    await tableImageController.create({
      id_table: _id,
      image1,
      image2,
      image3,
      image4,
      options,
    });
  }

  const table = await tableService.findOne({ _id });
  const tableImage = await tableImageController.findOne({ id_table: _id });

  return { table, tableImage };
};

const findOneAndDelete = async (id) => {
  await tableImageService.findOneAndDelete({ id_table: id });
  return await tableService.del({ _id: id });
};

const checkStatus = async (data) => {
  const findTable = await tableService.findOne({
    _id: data.id_table,
  });
  if (findTable.status === "using") {
    throw new HttpError("Table is using", 400);
  } else {
    return true;
  }
};

const getDistinct = async (data) => await tableService.findDistinct(data);

const findOne = async (id) => await tableService.findOne({ _id: id });

export default {
  get,
  search,
  create,
  update,
  findOneAndDelete,
  updateStatus,
  checkStatus,
  getDistinct,
  findOne,
  searchByFilter,
};
