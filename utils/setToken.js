import jwt from "jsonwebtoken";

export const setAccessToken = (_id, username, job) => {
  let accessToken = jwt.sign(
    {
      _id,
      username,
      job,
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
