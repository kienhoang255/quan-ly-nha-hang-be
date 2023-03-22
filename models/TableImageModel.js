import mongoose from "mongoose";

const TableImageSchema = mongoose.Schema({
  id_table: { type: String },
  image1: { type: String },
  image2: { type: String },
  image3: { type: String },
  image4: { type: String },
  options: { type: Array },
});

export const TableImageModel = mongoose.model("tableImage", TableImageSchema);
