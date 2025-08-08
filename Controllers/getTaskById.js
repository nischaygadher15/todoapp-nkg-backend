import userModel from "../Model/UserSchema.js";

const getTaskById = (req, res) => {
  let { id } = req.params;
  let tasks = req.user.tasks;

  let task = tasks.find((tsk) => tsk._id == id);
  if (task) {
    res.status(200).json({ task });
  } else {
    res
      .status(404)
      .json({ message: "Internal server error - Task do not found" });
  }
};

export default getTaskById;
