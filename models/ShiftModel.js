import mongoose, { Schema } from "mongoose";

const shiftSchema = new mongoose.Schema({
  staff: {
    type: Array,
  },
  session: {
    type: String,
  },
  day: {
    type: String,
  },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
});

export const ShiftModel = mongoose.model("shift", shiftSchema);
