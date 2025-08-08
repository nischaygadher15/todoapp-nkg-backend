import mongoose from "mongoose";

let taskSchema = new mongoose.Schema(
  {
    tasktitle: { type: String, required: true },
    taskdate: { type: String, required: true },
    completedOn: { type: String, default: null },
    isVitalTask: { type: Boolean, required: true, default: false },
    category: { type: String, required: true, default: "no category" },
    status: { type: String, required: true, default: "not started" },
    priority: { type: String, required: true, default: "low" },
    taskdesc: { type: String, required: true, default: null },
    taskimage: { type: String, default: "no image" },
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
    cnfpassword: { type: String, required: true },
    iagreewithterms: { type: String, required: true },
    tasks: [taskSchema],
  },
  {
    timestamps: true,
  }
);

let userModel =
  mongoose.models.todoUsers || new mongoose.model("todoUsers", regUserSchema);

export default userModel;
