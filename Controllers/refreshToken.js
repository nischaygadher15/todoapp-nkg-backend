import userModel from "../Model/UserSchema.js";
import { GenerateAccessToken } from "../Utils/generateToken.js";

export const refreshToken = async (req, res) => {
  try {
    let refToken = req.cookies.refreshToken;
    let { userId } = req.body;

    if (!refToken) {
      return res.json({
        success: false,
        message: "Session expired, please login again",
      });
    }

    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorised request - no userId found",
      });
    }

    let findUser = await userModel.findOne({ _id: userId });

    if (!findUser) {
      return res.json({
        success: false,
        message: "Unauthorised request - invalid userId",
      });
    }

    if (findUser.refreshToken.token !== refToken) {
      return res.json({
        success: false,
        message: "Unauthorised request - Invalid refresh token",
      });
    }

    let accessToken = GenerateAccessToken(findUser._id);

    return res.status(200).json({
      success: true,
      token: accessToken,
      data: findUser,
      message: "You have logged in successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};
