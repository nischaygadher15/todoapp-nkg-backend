import mongoose from "mongoose";

let taskSchema = new mongoose.Schema(
  {
    tasktitle: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      default: null,
    },
    taskdate: { type: String, required: true },
    completedOn: { type: String, default: null },
    isVitalTask: { type: Boolean, required: true, default: false },
    category: { type: String, required: true, default: "no category" },
    status: { type: String, required: true, default: "not started" },
    priority: { type: String, required: true, default: "low" },
    taskdesc: { type: String, required: true, default: null },
    taskimage: {
      public_id: { type: String, default: "" },
      secure_url: { type: String, default: "" },
      format: { type: String, default: "" },
      width: { type: Number, default: "" },
      height: { type: Number, default: "" },
      created_at: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

let refreshTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    tokenId: { type: String, required: true },
    expiresAt: { type: Number, required: true },
    created_at: { type: String },
  },
  {
    timestamps: true,
  }
);

let regUserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    useremail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    iagreewithterms: { type: String, required: true },
    tasks: [taskSchema],
    refreshToken: refreshTokenSchema,
  },
  {
    timestamps: true,
  }
);

let userModel =
  mongoose.models.todoUsers || new mongoose.model("todoUsers", regUserSchema);

export default userModel;
