import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./Routes/router.js";
import connectDB from "./Model/DbConnector.js";

let app = express();

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
  })
);

app.use("/", router);

app.post("/data", (req, res) => {
  res.status(200).json({ Data: req.body });
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on Port: 3000.`)
);
