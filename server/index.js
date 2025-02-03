import express from "express";
import { config } from "dotenv";
import { connectDB } from "./database/db.js";
import { router } from "./routers/router.js";
import cors from "cors";
config();

const app = express();

const port = process.env.PORT || 4040;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use("/auth", router);
connectDB();
app.listen(port, () => {
  console.log("server is running");
});
