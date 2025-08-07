import mongoose from "mongoose";

let taskSchema = new mongoose.Schema(
  {
    tasktitle: { type: String, required: true },
    taskdate: { type: String, required: true },
    completedOn: { type: String, required: true, default: "not completed" },
    isVitalTask: { type: String, default: false },
    category: { type: String, required: true, default: "no category" },
    status: { type: String, default: "not started" },
    priority: { type: String, default: "low" },
    taskdesc: { type: String },
    taskimage: { type: String },
    createdAt: String,
    updatedAt: String,
  },
  {
    timestamps: { currentTime: () => new Date().toLocaleString() },
  }
);

let regUserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    useremail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cnfpassword: { type: String, required: true },
    iagreewithterms: { type: String, required: true },
    tasks: [taskSchema],
    createdAt: String,
    updatedAt: String,
  },
  {
    timestamps: { currentTime: () => new Date().toLocaleString() },
  }
);

let userModel =
  mongoose.models.todoUsers || new mongoose.model("todoUsers", regUserSchema);

export default userModel;
