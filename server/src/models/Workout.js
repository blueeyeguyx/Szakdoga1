import mongoose, { Mongoose } from "mongoose";

const workoutSchema = new mongoose.Schema({

    name: String,
    muscleGroup: String,
    duration: Number,
    difficulty: String
});

export const Workout = mongoose.model("Workout", workoutSchema);