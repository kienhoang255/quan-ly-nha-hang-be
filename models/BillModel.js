import mongoose from "mongoose";

const BillSchema = new mongoose.Schema(
  {
    id_table: {
      type: String,
    },
    id_user: {
      type: String,
    },
    orders: {
      type: Array,
    },
    status: {
      type: String,
      default: "using",
    },
    totalPrice: {
      type: String,
    },
  },
  { timestamps: true }
);

export const BillModel = mongoose.model("bill", BillSchema);
