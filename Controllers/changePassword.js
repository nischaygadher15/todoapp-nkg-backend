import Joi from "joi";
import userModel from "../Model/UserSchema.js";

const changePassword = async (req, res) => {
  let { password, newPassword, confNewPassword } = { ...req.body };

  let passwordSchema = Joi.object({
    password: Joi.string().required().messages({
      "string.base": "password must be string",
      "any.required": "password is required",
      "any.invalid": "current password do not match",
    }),
    newPassword: Joi.string()
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#%^&*()\[\]_+\-=?<>])[A-Za-z\d~!@#%^&*()\[\]_+\-=?<>]{6,}$/
      )
      .messages({
        "string.base": "new password must be string",
        "any.required": "new password is required",
        "string.pattern.base":
          "password must have 1 aphabet, capital alphabet, number, special character and 6 characters",
      }),
    confNewPassword: Joi.string()
      .required()
      .valid(Joi.ref("newPassword"))
      .messages({
        "any.only": "Confirm password must match with new password",
      }),
  });

  let { error } = passwordSchema.validate(req.body, {
    abortEarly: false,
  });

  if (!error && password !== req.user.password) {
    res.json({ success: false, message: "Current password do not match" });
  }

  if (!error) {
    try {
      await userModel.updateOne(
        { _id: req.user._id },
        { $set: { password: newPassword } }
      );
      res.json({ success: true, message: "Password change successfully" });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  }

  res.json({ error });
};

export default changePassword;
