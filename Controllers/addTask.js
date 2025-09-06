import userModel from "../Model/UserSchema.js";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let addTask = async (req, res) => {
  let data = { ...req.body };
  // console.log(data);
  let file = req.file;

  if (file) {
    let base64File = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    let cloudinaryOptions = {
      secure: true,
      folder: `TodoApp_Nkg/${req.user._id}`,
      public_id: `${file.originalname.split(".")[0]}_${Date.now()}`,
      unique_filename: false,
      overwrite: true,
    };

    try {
      let uploadResult = await cloudinary.uploader.upload(
        base64File,
        cloudinaryOptions
      );
      console.log(uploadResult);
      if (uploadResult) {
        let { public_id, secure_url, format, width, height, created_at } =
          uploadResult;
        data["taskimage"] = {
          public_id,
          secure_url,
          format,
          width,
          height,
          created_at,
        };
        // console.log(data);

        let updatedUser = await userModel.findByIdAndUpdate(
          req.user._id,
          { $push: { tasks: data } },
          { new: true, runValidators: true }
        );
        console.log(updatedUser);
        res.status(201).json({
          success: true,
          message: "Task added successfully.",
          upload: true,
          uploadMessage: "Image uploaded successfully.",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
};

export default addTask;
