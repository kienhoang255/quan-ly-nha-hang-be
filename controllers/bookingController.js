import bookingService from "../services/bookingService.js";
import clientService from "../services/clientService.js";
import { isEmail } from "../validate/validate.js";

const create = async (data) => {
  const { dateCheckIn, timeCheckIn, id_table } = data;
  const splitTime = timeCheckIn.split(":");
  const timeStart = `${splitTime[0] < 10 ? `0${splitTime[0]}` : splitTime[0]}${
    splitTime[1]
  }`;

  const timeEnd = `${Number(splitTime[0]) + 4}${splitTime[1]}`;

  const findBooking = await bookingService.find({
    $and: [
      { status: "pending" },
      {
        $or: [
          { timeCheckIn: { $gte: timeStart, $lte: timeEnd } },
          { timeCheckOut: { $gte: timeStart, $lte: timeEnd } },
        ],
        id_table: id_table,
        dateCheckIn: dateCheckIn,
      },
    ],
  });
  if (!findBooking[0]) {
    return await bookingService.create({
      ...data,
      timeCheckIn: timeStart,
      timeCheckOut: timeEnd,
    });
  } else throw new Error("Booking is exist same date/time check in");
};

const createByEmployee = async (data) => {
  const {
    dateCheckIn,
    timeCheckIn,
    id_table,
    username,
    email,
    phone,
    specialRequired,
  } = data;

  let findClient;
  if (email && phone) {
    findClient = await clientService.findOne({
      $and: [{ email: email }, { phone: phone }],
    });
  } else if (email && !phone) {
    findClient = await clientService.findOne({ email: email });
  } else findClient = await clientService.findOne({ phone: phone });

  const EmailClient = clientService.clientEmail({
    ...data,
    password: "12341234",
    verification: false,
  });
  const PhoneClient = clientService.clientPhone({
    ...data,
    email: phone,
    password: "12341234",
    verification: false,
  });
  if (!findClient) {
    if (!isEmail(data.email)) {
      const { _id } = await clientService.create(PhoneClient);
      return await create({
        id_table,
        id_client: _id,
        timeCheckIn,
        dateCheckIn,
        specialRequired,
      });
    } else {
      const { _id } = await clientService.create(EmailClient);
      return await create({
        id_table,
        id_client: _id,
        timeCheckIn,
        dateCheckIn,
        specialRequired,
      });
    }
  } else {
    return await create({
      id_table,
      id_client: findClient._id,
      timeCheckIn,
      dateCheckIn,
      specialRequired,
    });
  }
};

const find = async (req) => {
  const get = {
    dateCheckIn: req.dateCheckIn,
    status: req.status,
  };
  const paginationCount = await bookingService.count(get);
  const paginationLimit = 6;
  const paginationPage = Math.ceil(paginationCount / paginationLimit);

  const data = await bookingService.get(
    get,
    paginationLimit,
    req.page * paginationLimit
  );

  return { paginationCount, paginationPage, paginationLimit, data };
};

const get = async (data) => await bookingService.find(data);

const findOne = async (data) => await bookingService.findOne(data);

const findOneAndUpdate = async (data) => {
  await bookingService.update(
    { _id: data._id },
    { specialRequired: data.specialRequired, status: data.status }
  );
  return bookingService.findOne({ _id: data._id });
};

const findOneAndDelete = async (data) =>
  await bookingService.findOneAndDelete({ _id: data._id });

export default {
  create,
  find,
  get,
  findOne,
  createByEmployee,
  findOneAndUpdate,
  findOneAndDelete,
};
