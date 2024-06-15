import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  //extract header from request
  const authHeader = req.headers["authorization"];

  //handle errors if header doesn't exist
  if (!authHeader || !authHeader.startsWith("Bearer"))
    return res.status(401).json({ Message: "Unauthorized" });

  //extract token from the header
  const token = authHeader.split(" ")[1];

  if (process.env.JWT_SECRET_KEY) {
    try {
      //decode the token extracted from the header
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //add the decoded token to the request object
      (req as any).user = decoded;
    } catch (error) {
      res.status(403).json({ Message: "Invalid token" });
    }
  }

  next();
};

export default verifyJWT;
