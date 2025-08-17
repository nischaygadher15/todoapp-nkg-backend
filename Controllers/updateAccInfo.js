import userModel from "../Model/UserSchema.js";

let updateAccInfo = async (req, res) => {
  let { id } = req.params;
  let data = { ...req.body };
  // console.log(id, data, req.user);

  try {
    let updateAccInfoResult = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          firstname: data.firstname,
          lastname: data.lastname,
          username: data.username,
          useremail: data.useremail,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({ success: true, data: updateAccInfoResult });
    // console.log(updateAccInfoResult);
  } catch (error) {
    if (error.codeName == "DuplicateKey") {
      res.status(409).json({
        message: `A user with thid useremail already exists.`,
      });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export default updateAccInfo;
