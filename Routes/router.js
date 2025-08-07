import express from "express";
import login from "../Controllers/login.js";
import register from "../Controllers/register.js";
import addTask from "../Controllers/addTask.js";
import Auth from "../Controllers/Auth.js";
import verifyToken from "../Middlewares/verifyToken.js";

let router = express.Router();

//Welcome Page
router.get("/", (req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.write(
    "<p style='text-align:center; margin-top:50px'>Jay Shree Krishna</p>"
  );
  res.write(
    "<h1 style='text-align:center'}>This Backend server for TodoApp-Nkg</h1>"
  );
  res.end();
});

router.post("/login", login);

router.post("/register", register);

router.post("/auth", verifyToken, Auth);

router.post("/addtask", verifyToken, addTask);

export default router;
