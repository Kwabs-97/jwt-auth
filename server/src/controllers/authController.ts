import { Request, Response } from "express";
import userDb from "../models/usersModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const registerHandler = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    //validate input
    if (!username || !email || !password)
      return res.status(400).json({ message: "please enter credentials" });

    //hash received password from the client
    const saltRounds: number = 10;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);

    //check if email already exits
    const existingUser = await userDb.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "user already exists" });

    // create a new user collection from the received fields from the client
    const newUser = new userDb({
      username,
      email,
      passwordHash: hashedPassword,
    });

    //save the user to the database
    const savedUser = await newUser.save();

    //send response to the client

    res.status(201).json({
      message: "user created successfully",
      data: { email: savedUser.email, username: savedUser.username },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error creating user" });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // find user
    const user = await userDb.findOne({ email });
    if (!user)
      return res.status(401).json({
        message:
          "user with email does not exist. Please sign up to get started",
      });

    //compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "invalid email or password. Please try again" });

    //Generating JWT on successful login
    const payload = { userId: user.userId };
    const jwtSecretKey: any = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "3600s" });

    //generate refresh token
    const refreshToken = jwt.sign(payload, jwtSecretKey, { expiresIn: "7d" });

    //send the token to the client in a cookie
    res.cookie("auth-Token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    //send the refresh token as well to the client

    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    //response message on successful login
    res.status(200).json({
      message: "user has successfully logged in",
      data: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "error authenticating user" });
  }
};
