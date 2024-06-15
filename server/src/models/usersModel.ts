import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    default: uuidv4(),
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const userDb = mongoose.model("userDb", userSchema);
export default userDb;
