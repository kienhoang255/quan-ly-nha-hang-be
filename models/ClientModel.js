import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ClientSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  sex: { type: String },
  birth: { type: String },
  verification: {
    type: String,
  },
});

ClientSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  }
});

export const ClientModel = mongoose.model("client", ClientSchema);
