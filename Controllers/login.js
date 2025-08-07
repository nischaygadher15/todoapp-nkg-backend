import jwt from "jsonwebtoken";
import "dotenv/config";
import DecryptData from "./DecryptData.js";
import userModel from "../Model/UserSchema.js";

let login = async (req, res) => {
  // let { data } = req.body;
  // let decryptedData = JSON.parse(DecryptData(data));
  let { useremail, password, rememberMe } = req.body;

  let findUser = await userModel.findOne({ useremail: useremail });

  if (findUser) {
    if (useremail == findUser.useremail && password == findUser.password) {
      let token = jwt.sign(
        { useremail, username: findUser.username },
        process.env.SECRET,
        {
          expiresIn: `${rememberMe ? "7d" : "30m"}`,
        }
      );

      res.status(200).json({
        isAuthenticated: true,
        token,
        data: findUser,
        message: "You have logged in successfully.",
      });
    }
  } else {
    res.status(401).json({
      message: "Invalid Credentials",
    });
  }
};

export default login;
