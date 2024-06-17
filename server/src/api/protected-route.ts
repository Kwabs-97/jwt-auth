import { Request, Response } from "express";
const certifiedLoverBoy_or_certifiedPedophile = {
  name: "BBL Drizzy",
  gender: "male but female when he stands besides other women",
  genre: "scam artist",
  offense: "acting tough",
};

export const protectedRoute = async (req: Request, res: Response) => {
  return res.status(200).json({
    message: "You finally made it here",
    case: certifiedLoverBoy_or_certifiedPedophile,
  });
};
