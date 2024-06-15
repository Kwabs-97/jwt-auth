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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//route

app.use(router);

app.listen(8080, () => {
  console.log(` listening on port ${process.env.PORT}`);
  console.log(process.env.PORT);
});
