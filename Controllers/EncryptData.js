import "dotenv/config";
import CryptoJS from "crypto-js";

const EncryptData = (data) => {
  let encrypted = CryptoJS.AES.encrypt(data, process.env.SECRET).toString();
  return encrypted;
};

export default EncryptData;
