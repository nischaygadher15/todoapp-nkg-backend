import jwt from "jsonwebtoken";
import "dotenv/config";
import userModel from "../Model/UserSchema.js";

export const VerifyToken = async (req, res) => {
  let token = req.headers?.authorization.split(" ")[1];
  if (token) {
    try {
      let { useremail, username, exp } = jwt.verify(token, process.env.SECRET);
      let findUser = await userModel.findOne({ useremail: useremail });

      if (findUser) {
        res.status(200).json({
          isAuthenticated: true,
          data: findUser,
        });
      } else {
        res.status(401).json({
          message: "unauthorised user",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.name == "TokenExpiredError") {
        res.status(401).json({
          message: "Token expired. Please log in again.",
        });
      }
    }
  } else {
    res.status(401).json({
      message: "token do not found",
    });
  }
};
