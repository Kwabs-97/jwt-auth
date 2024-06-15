import mongoose from "mongoose";
import env from "dotenv";

env.config();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`Database is live and running on ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
