import "dotenv/config";
import DecryptData from "./DecryptData.js";
import userModel from "../Model/UserSchema.js";
import {
  GenerateAccessToken,
  GenerateRefreshToken,
} from "../Utils/generateToken.js";
import { v4 as uuidv4 } from "uuid";

let login = async (req, res) => {
  // let { data } = req.body;
  // let decryptedData = JSON.parse(DecryptData(data));
  let { useremail, password, rememberMe } = req.body;

  try {
    let findUser = await userModel.findOne({ useremail: useremail });

    if (findUser) {
      if (useremail == findUser.useremail && password == findUser.password) {
        let accessToken = GenerateAccessToken(findUser._id);

        let { rowToken, expiresAt } = GenerateRefreshToken();
        console.log(rowToken, expiresAt);

        if (rowToken) {
          let tokenId = uuidv4();
          let refreshTokenResp = await userModel.updateOne(
            { _id: findUser._id },
            {
              $set: {
                refreshToken: {
                  token: rowToken,
                  tokenId,
                  expiresAt,
                },
              },
            }
          );
          console.log(tokenId);
        }

        res.cookie("refreshToken", rowToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: expiresAt - Date.now(), // cookie expiry = token expiry
        });

        res.status(200).json({
          isAuthenticated: true,
          token: accessToken,
          data: findUser,
          message: "You have logged in successfully.",
        });
      } else {
        console.log("invalid credentials");
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
    } else {
      console.log("invalid credentials");
      res.status(401).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export default login;
