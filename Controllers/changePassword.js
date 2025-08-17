import Joi from "joi";

const changePassword = (req, res) => {
  let { password, newPassword, confNewPassword } = { ...req.body };
  //   password: 'sdsdf',
  //   newPassword: 'Nisc@2203',
  //   confNewPassword: 'Nisc@2203'

  let passwordSchema = Joi.object({
    password: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (value == req.user.password) return value;
        else return helpers.error("any.invalid");
      })
      .messages({
        "string.base": "password must be string",
        "any.required": "password is required",
        "any.invalid": "current password do not match",
      }),
    newPassword: Joi.string()
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[~!@#%^&*()[]_+-=?<>])[A-Za-zd~!@#%^&*()[]_+-=?<>]{6,}$/
      )
      .messages({
        "string.base": "new password must be string",
        "any.required": "new password is required",
        "string.pattern.base":
          "new password must have 1 aphabet, 1 capital aphabet, 1 number, 1 special character and total 6 characters at least",
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

  res.json({ error });
};

export default changePassword;
