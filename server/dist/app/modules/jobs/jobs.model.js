"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobs = void 0;
const mongoose_1 = require("mongoose");
const jobs_interface_1 = require("./jobs.interface");
const jobSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    jobType: { type: String, enum: ["Fixed Price", "Hourly"] },
    minBudget: { type: Number, required: true },
    maxBudget: { type: Number, required: true },
    skillsRequired: {
        type: String,
        enum: {
            values: Object.values(jobs_interface_1.ESkills),
            message: "{VALUE} is not a valid Role",
        },
    },
    level: { type: String, enum: ["Junior", "Mid", "Senior"] },
    locationType: { type: String, enum: ["Remote", "On-site", "Hybrid"] },
}, { versionKey: false, timestamps: true });
exports.Jobs = (0, mongoose_1.model)("Jobs", jobSchema);
