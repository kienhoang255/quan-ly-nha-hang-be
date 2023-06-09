import bcrypt from "bcryptjs";

export const comparePassword = async (password, bcryptPassword) => {
  if (!password) throw new Error("Password is missing,can not compare");
  try {
    const result = await bcrypt.compare(password, bcryptPassword);
    return result;
  } catch (error) {
    console.log("Error while comparing password!", error.message);
  }
};
