import userModel from "../Model/UserSchema.js";
import { GenerateAccessToken } from "../Utils/generateToken.js";

export const refreshToken = async (req, res) => {
  try {
    let refToken = req.cookies.refreshToken;
    let { userId } = req.body;
    console.log(req.body);
    if (!refToken || !userId) {
      res.json({ success: false, message: "Unauthorised request" });
    }

    let findUser = await userModel.findOne({ _id: userId });

    if (!findUser) {
      res.json({
        success: false,
        message: "Unauthorised request",
      });
    }

    if (!findUser.refreshToken) {
      res.json({
        success: false,
        message: "Session expired please login again",
      });
    }

    if (findUser.refreshToken.token !== refToken) {
      res.json({
        success: false,
        message: "Unauthorised request",
      });
    }

    if (!findUser.refreshToken.expiresAt > Date.now()) {
      res.json({
        success: false,
        message: "Session expired, please login again",
      });
    }

    let accessToken = GenerateAccessToken(findUser._id);

    res.status(200).json({
      success: true,
      token: accessToken,
      data: findUser,
      message: "You have logged in successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};
