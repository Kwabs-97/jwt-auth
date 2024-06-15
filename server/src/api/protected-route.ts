import { Request, Response } from "express";
export const protectedRoute = async (req: Request, res: Response) => {
  res.send("<h2>You have successfully implemented jwt</h2>");
};
