import bookingService from "../services/bookingService.js";

const create = async (data) => {
  const { dateCheckIn, timeCheckIn, id_table } = data;
  const splitTime = timeCheckIn.split(":");
  const timeStart = `${splitTime[0] < 10 ? `0${splitTime[0]}` : splitTime[0]}${
    splitTime[1]
  }`;

  const timeEnd = `${Number(splitTime[0]) + 4}${splitTime[1]}`;

  const findBooking = await bookingService.find({
    $or: [
      { timeCheckIn: { $gte: timeStart, $lte: timeEnd } },
      { timeCheckOut: { $gte: timeStart, $lte: timeEnd } },
    ],
    id_table: id_table,
    dateCheckIn: dateCheckIn,
  });
  if (!findBooking[0]) {
    return await bookingService.create({
      ...data,
      timeCheckIn: timeStart,
      timeCheckOut: timeEnd,
    });
  } else throw new Error("Booking is exist same date/time check in");
};

const find = async (data) => await bookingService.find({ dateCheckIn: data });

const findOne = async (data) => await bookingService.findOne(data);

export default {
  create,
  find,
  findOne,
};
