import crypto from "crypto";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const GenerateRefreshToken = () => {
  let rowToken = crypto.randomBytes(40).toString("hex");
  let expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  return { rowToken, expiresAt: expiresAt.getTime() };
};

export const GenerateAccessToken = (userId) => {
  let accToken = jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: `15m`,
  });
  return accToken;
};
