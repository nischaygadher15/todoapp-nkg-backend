import userModel from "../Model/UserSchema.js";

const editTaskById = async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  // console.log(data);
  try {
    let updatedUser = await userModel.updateOne(
      {
        _id: req.user._id,
        "tasks._id": id,
      },
      {
        $set: {
          "tasks.$.tasktitle": data.tasktitle,
          "tasks.$.taskdate": data.taskdate,
          "tasks.$.priority": data.priority,
          "tasks.$.taskdesc": data.taskdesc,
          "tasks.$.updatedAt": new Date(),
        },
      }
    );
    // console.log(updatedUser);
    res
      .status(200)
      .json({ success: true, message: "Task updated successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error from editTaskById." });
  }
};

export default editTaskById;
