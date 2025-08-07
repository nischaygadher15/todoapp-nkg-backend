import "dotenv/config";
import CryptoJS from "crypto-js";

const DecryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, process.env.SECRET);
  let decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};

export default DecryptData;
