import Joi from "joi";
import DecryptData from "../Controllers/DecryptData.js";
import userModel from "../Model/UserSchema.js";

const register = async (req, res) => {
  let userData = req.body;

  // console.log(userData);

  let userDataSchema = Joi.object({
    firstname: Joi.string().required().min(3).messages({
      "string.base": "firstname must be string",
      "any.required": "first is required!",
      "string.min": "firstname can not be less than 3 characters.",
    }),
    lastname: Joi.string().required().min(3).messages({
      "string.base": "lastname must be string",
      "any.required": "lastname is required!",
      "string.min": "lastname can not be less than 3 characters.",
    }),
    username: Joi.string().required("username is required!").messages({
      "string.base": "username must be string",
      "any.required": "username is required!",
      "string.min": "username can not be less than 3 characters.",
    }),
    useremail: Joi.string().required().email().messages({
      "string.base": "useremail must be string",
      "any.required": "useremail is required!",
      "string.email": "invalid email formate",
    }),
    password: Joi.string().required().min(6).messages({
      "string.base": "password must be string",
      "any.required": "password is required!",
      "string.min": "password must be atleast 6 character long.",
    }),
    cnfpassword: Joi.string()
      .required("confirm password is required!")
      .min(6)
      .messages({
        "string.base": "confirm password must be string",
        "any.required": "confirm password is required!",
        "string.min": "confirm password must be atleast 6 character long.",
      }),
    iagreewithterms: Joi.boolean()
      .required("Agreement with terms is required!")
      .messages({
        "boolean.base": "agreement with terms must be boolean",
        "any.required": "agreement with terms is required!",
      }),
  });

  try {
    let { error } = userDataSchema.validate(userData, {
      abortEarly: false,
    });

    if (error && error.length != 0) {
      let userDataErrors = {};
      error.details.forEach((err) => {
        userDataErrors[err.context.key] = err.message;
      });
      res.status(400).json({ errors: userDataErrors });
    } else {
      let findUser = await userModel.findOne({ useremail: userData.useremail });

      if (findUser) {
        res.status(409).json({ message: "useremail already registered" });
      } else {
        let result = await userModel.create({ ...userData });
        // console.log(result);
        res
          .status(201)
          .json({ isRegistered: true, message: "user created successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default register;
