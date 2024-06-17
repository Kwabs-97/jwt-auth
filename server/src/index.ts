import express from "express";
import env from "dotenv";
import connectDB from "./config/db";
import router from "./routes/authRoute";
import bodyParser, { urlencoded } from "body-parser";
import cors from "cors";

const app = express();

//configs
env.config();
connectDB();

//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//route

app.use(router);

app.listen(`${process.env.PORT}`, () => {
  console.log(`server is listening for requests`);
});
