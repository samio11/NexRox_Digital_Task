import { model, Schema } from "mongoose";
import { ESkills, IJob } from "./jobs.interface";

const jobSchema = new Schema<IJob>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    jobType: { type: String, enum: ["Fixed Price", "Hourly"] },
    minBudget: { type: Number, required: true },
    maxBudget: { type: Number, required: true },
    skillsRequired: {
      type: String,
      enum: {
        values: Object.values(ESkills),
        message: "{VALUE} is not a valid Role",
      },
    },
    level: { type: String, enum: ["Junior", "Mid", "Senior"] },
    locationType: { type: String, enum: ["Remote", "On-site", "Hybrid"] },
  },
  { versionKey: false, timestamps: true }
);

export const Jobs = model<IJob>("Jobs", jobSchema);
