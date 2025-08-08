import userModel from "../Model/UserSchema.js";

let addTask = async (req, res) => {
  let data = { ...req.body };

  try {
    let updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      { $push: { tasks: data } },
      { new: true, runValidators: true }
    );
    // console.log(updatedUser);
    res
      .status(201)
      .json({ success: true, message: "Task added successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in adding task" });
  }
};

export default addTask;
