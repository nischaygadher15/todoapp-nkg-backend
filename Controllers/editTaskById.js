import userModel from "../Model/UserSchema.js";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const editTaskById = async (req, res) => {
  let { id } = req.params;
  let data = { ...req.body };
  let file = req.file;
  let findUserTask = req.user.tasks.find((tsk) => tsk._id == id);
  let updatedUserData = {
    "tasks.$.tasktitle": data.tasktitle,
    "tasks.$.taskdate": data.taskdate,
    "tasks.$.priority": data.priority,
    "tasks.$.taskdesc": data.taskdesc,
    "tasks.$.updatedAt": new Date(),
    "tasks.$.taskimage": data.taskimage,
  };
  console.log(file, data);

  try {
    if (file && data.newUpload) {
      //Delete old image
      let deleteResult = await cloudinary.uploader.destroy(
        findUserTask.taskimage.public_id,
        { invalidate: true }
      );

      // console.log("Delete image", deleteResult);

      //Uploading new file
      let base64File = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;

      let cloudinaryOptions = {
        secure: true,
        public_id: findUserTask.taskimage.public_id.split("/").at(-1),
        folder: `TodoApp_Nkg/${req.user._id}`,
        overwrite: true,
        unique_filename: false,
      };

      let uploadResult = await cloudinary.uploader.upload(
        base64File,
        cloudinaryOptions
      );

      // console.log("new image uploaded image", uploadResult);

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

      delete data.newUpload;
    } else {
      delete updatedUserData["tasks.$.taskimage"];
    }

    //Update user data in database
    let updatedUser = await userModel.updateOne(
      {
        _id: req.user._id,
        "tasks._id": id,
      },
      {
        $set: updatedUserData,
      }
    );
    console.log("FInally updated user:", updatedUser);

    res.status(200).json({
      success: true,
      message: "Task added successfully.",
      upload: true,
      uploadMessage: "Image uploaded and replaced successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default editTaskById;
