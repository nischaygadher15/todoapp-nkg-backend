import userModel from "../Model/UserSchema.js";

const getTasks = async (req, res) => {
  res.status(200).json({ user: req.user });
};

export default getTasks;
