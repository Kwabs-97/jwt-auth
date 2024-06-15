import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const handleRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //extract the refreshToken from the request headers or body
  const refreshToken = req.body.refreshToken || req.headers["x-refresh-token"];
  if (!refreshToken) {
    return res.status(400).json({ message: "missing refresh token" });
  }
  try {
    if (process.env.JWT_SECRET_KEY) {
      //decoded the refresh token
      const decoded: any = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

      //generate a new access_token
      const { userId } = decoded;
      const newAccessToken = jwt.sign(userId, process.env.JWT_SECRET_KEY);
      return res.status(200).json({ accessToken: newAccessToken });
    } else {
      res.status(401).json({ message: "Internal error" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal error. please try again later" });
  }
};
