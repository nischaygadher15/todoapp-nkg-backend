import userModel from "../Model/UserSchema.js";

const markVital = async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  //   console.log(data);

  try {
    let updatedUser = await userModel.updateOne(
      {
        _id: req.user._id,
        "tasks._id": id,
      },
      {
        $set: {
          "tasks.$.isVitalTask": data.isVitalTask,
        },
      }
    );
    // console.log(updatedUser);
    res.status(200).json({ success: true, message: "Task marked as vital." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error from editTaskById." });
  }
};

export default markVital;
