import express from "express";
import { config } from "dotenv";
import connectdb from "./database/db.js";
import useRouter from "./routers/authroute.js";
config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use("/auth", useRouter);

connectdb();
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
