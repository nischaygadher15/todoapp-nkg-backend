import jwt from "jsonwebtoken";
import "dotenv/config";
import userModel from "../Model/UserSchema.js";

const verifyToken = async (req, res, next) => {
  let token;

  if (!req.headers.authorization) {
    res.status(401).json({
      isTokenExpired: false,
      message: "token do not found",
    });
  } else {
    token = req.headers?.authorization.split(" ")[1];
  }

  if (token) {
    try {
      let decoded = jwt.verify(token, process.env.SECRET);
      let findUser = await userModel.findOne({ _id: decoded.userId });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        res.status(401).json({
          isTokenExpired: false,
          message: "unauthorised user",
        });
      }
    } catch (error) {
      if (error.name == "TokenExpiredError") {
        res.status(401).json({
          message: "Token expired. Please log in again.",
          isTokenExpired: true,
        });
      }
    }
  }
};

export default verifyToken;
