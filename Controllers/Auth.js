import jwt from "jsonwebtoken";
import "dotenv/config";
import userModel from "../Model/UserSchema.js";

const Auth = async (req, res) => {
  let token = req.headers?.authorization.split(" ")[1];
  let { useremail, username, exp } = jwt.verify(token, process.env.SECRET);
  let findUser = await userModel.findOne({ useremail: useremail });

  if (findUser) {
    res.status(200).json({
      isAuthenticated: true,
      data: findUser,
    });
  }
};

export default Auth;
