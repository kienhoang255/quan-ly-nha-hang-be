import { UserModel } from "../models/UserModel.js";

export const userEmail = (data) => {
  const { username, email, password, role, job, verification } = data;
  const userEmail = {
    username,
    email,
    password,
    role,
    job,
    verification,
  };
  return userEmail;
};

export const userPhone = (data) => {
  const { username, email, password, role, job, verification } = data;
  const userPhone = {
    username,
    email: undefined,
    phone: email,
    password,
    role,
    job,
    verification,
  };
  return userPhone;
};

export const createUserService = async (data) => {
  const newUser = new UserModel(data);
  await newUser.save();
  return newUser;
};

export const findOneUserService = async (props) => {
  return await UserModel.findOne(props);
};

// export const delTableService = (data) => {
//   return TableModel.deleteOne(data);
// };
