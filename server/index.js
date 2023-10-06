import express from "express";
import { trainRouter } from "./router/train.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/train", trainRouter);

app.listen("5000", () => console.log("Server is running in port 5000"));
