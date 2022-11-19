import jwt from "jsonwebtoken";

/**
 * Access token là khi mình dùng chức năng thì server sẽ kiểm tra token có còn hạn không
 * dồng thời kiểm tra token có authorization không?
 * Khi mà tất cả đều hợp lý thì sẽ cho sử dụng chức năng.
 *
 * Refresh token -> Khi access token hết hạn refresh token để tạo mới access token,...
 */
export const authorizationToken = async (req, res, next) => {
  // console.log(req.headers.authorization);
  const accessToken = req.header("Authorization").replace("Bearer ", "");
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.status(403).json({ err: "You are not authorized!" });
    } else {
      next();
    }
    // console.log(data);
    // next();
  });
};
