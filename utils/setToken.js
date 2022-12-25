import jwt from "jsonwebtoken";

export const setAccessToken = (username, role, job, email, phone, address) => {
  let accessToken = jwt.sign(
    {
      username,
      role,
      job,
      email,
      phone,
      address,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "4h",
    }
  );
  return accessToken;
};

export const verifyToken = (password) => {
  let accessToken = jwt.verify(password);
  return accessToken;
};
