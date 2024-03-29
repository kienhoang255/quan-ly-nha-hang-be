import mongoose from "mongoose";

const BillSchema = mongoose.Schema({
  numOfPeople: { type: Number },
  id_bill: { type: Array },
  name: { type: String },
  status: { type: String, default: "empty" },
  stage: { type: Number },
  special: { type: String },
  visible: { type: Boolean, default: true },
});

export const TableModel = mongoose.model("table", BillSchema);
