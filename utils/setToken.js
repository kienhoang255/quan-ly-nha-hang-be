import jwt from "jsonwebtoken";

export const setAccessToken = (username, role, job) => {
  let accessToken = jwt.sign(
    {
      username: username,
      role: role,
      job: job,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "4h",
    }
  );
  return accessToken;
};
