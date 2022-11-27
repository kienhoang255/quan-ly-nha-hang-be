import { ShiftModel } from "../models/ShiftModel.js";

const distinguish = (time) => {
  return time < 14 ? "Sáng " : "Tối";
};

const isCheckIn = (data, staff_id) => {
  let result;
  data.staff.forEach((element) => {
    if (element.staff_id === staff_id) {
      result = true;
    } else result = false;
  });
  return result;
};

export const checkIn = async (res, req) => {
  try {
    const staff = {
      staff_id: res?.body._id,
      time: `${res?.body.hour}h${res?.body.minute}m`,
    };
    const session = distinguish(res.body.hour);
    const newShift = ShiftModel({
      staff: staff,
      session: session,
      day: res.body.day,
      month: res.body.month,
      year: res.body.year,
    });

    const findShift = await ShiftModel.findOne({
      $and: [
        { day: res.body.day },
        { month: res.body.month },
        { year: res.body.year },
        { session: session },
      ],
    });

    if (findShift) {
      if (isCheckIn(findShift, res.body._id)) {
        req.status(200).json({ message: "Da check-in" });
      } else {
        await ShiftModel.findOneAndUpdate(
          {
            $and: [
              { day: res.body.day },
              { month: res.body.month },
              { year: res.body.year },
              { session: session },
            ],
          },
          { $push: { staff: staff } }
        );
        req.status(201).json({ message: "Successful check-in" });
      }
    } else {
      await newShift.save();
      req.status(201).json({ message: "Successful check-in" });
    }
  } catch (error) {
    req.status(500).json({ error });
  }
};

export const getShift = async (res, req) => {
  try {
    const day = res.body.day;
    const month = res.body.month;
    const year = res.body.year;

    const findShift = await ShiftModel.find({ day, month, year });

    req.status(202).json({ findShift });
  } catch (error) {
    req.status(500).json({ error });
  }
};

export const getAllShift = async (res, req) => {
  try {
    const findShift = await ShiftModel.find();

    req.status(202).json({ findShift });
  } catch (error) {
    req.status(500).json({ error });
  }
};
