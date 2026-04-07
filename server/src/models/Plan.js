import mongoose, { Mongoose } from "mongoose";

const planSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    calories: Number,
    macros: Object,
    meals: Array,
    workouts: Array,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Plan = mongoose.model("Plan", planSchema);