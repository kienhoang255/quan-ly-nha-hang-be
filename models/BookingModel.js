import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    id_table: { type: String },
    id_client: { type: String },
    timeCheckIn: { type: String },
    timeCheckOut: { type: String },
    dateCheckIn: { type: String },
    specialRequired: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const BookingModel = mongoose.model("booking", BookingSchema);
