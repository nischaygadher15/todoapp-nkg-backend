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
      .json({ message: "Task do not found, Internal server error" });
  }
};

export default getTaskById;
