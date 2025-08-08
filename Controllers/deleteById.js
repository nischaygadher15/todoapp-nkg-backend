import userModel from "../Model/UserSchema.js";

const deleteById = async (req, res) => {
  let { id } = req.params;

  try {
    let deletedUser = await userModel.updateOne(
      { _id: req.user._id },
      {
        $pull: {
          tasks: { _id: id },
        },
      }
    );
    console.log(deletedUser);
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error from deleteById." });
  }
};

export default deleteById;
