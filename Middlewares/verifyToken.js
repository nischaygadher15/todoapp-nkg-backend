import jwt from "jsonwebtoken";
import "dotenv/config";
import userModel from "../Model/UserSchema.js";

const verifyToken = async (req, res, next) => {
  let token;

  if (!req.headers.authorization) {
    res.status(401).json({
      message: "token do not found",
    });
  } else {
    token = req.headers?.authorization.split(" ")[1];
  }

  if (token) {
    try {
      let { useremail, username, exp } = jwt.verify(token, process.env.SECRET);
      let findUser = await userModel.findOne({ useremail: useremail });

      if (findUser) {
        req.user = findUser;
        next();
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
  }
};

export default verifyToken;
