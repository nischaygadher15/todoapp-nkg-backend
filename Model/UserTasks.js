import { required } from "joi";
import mongoose from "mongoose";

let taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    createdAt: String,
    updatedAt: String,
    completedOn: { type: String },
    isVitalTask: { type: String, default: false },
    category: { type: String, required: true, default: "no category" },
    status: { type: String, default: "not started" },
    priority: { type: String, default: "low" },
    desp: { type: String },
    image: { type: String },
  },
  {
    timestamps: { currentTime: () => new Date().toLocaleString() },
  }
);

let userTaskSchema = mongoose.Schema({
  username: { type: string, required: true },
  tasks: [taskSchema],
});

let userTaskModel =
  mongoose.models.todotasks || new mongoose.Model("todotasks", userTaskSchema);

export default userTaskModel;
