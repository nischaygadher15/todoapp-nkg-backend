import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./Routes/router.js";
import connectDB from "./Model/DbConnector.js";
import cookieParser from "cookie-parser";

let app = express();

connectDB();

app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: "https://todomasterfordev.netlify.app",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use("/", router);

app.post("/data", (req, res) => {
  res.status(200).json({ Data: req.body });
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on Port: 3000.`)
);
