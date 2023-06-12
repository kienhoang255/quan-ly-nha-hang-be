import mongoose from "mongoose";

const FoodOrderedSchema = new mongoose.Schema(
  {
    id_table: { type: String },
    id_bill: { type: String },
    id_food: { type: String },
    quantity: { type: Number },
    status: { type: String, default: "cooking" },
    price: { type: Number },
    nameTable: { type: String },
  },
  { timestamps: true }
);

export const FoodOrderedModel = mongoose.model(
  "foodOrdered",
  FoodOrderedSchema
);
