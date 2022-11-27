import jwt from "jsonwebtoken";

export const authorizationToken = async (req, res, next) => {
  const accessToken = req.header("Authorization")?.replace("Bearer ", "");
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.status(403).json({ message: "You are not authorized!" });
    } else {
      next();
    }
  });
};

