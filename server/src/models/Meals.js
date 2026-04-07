import mongoose, { Mongoose } from "mongoose";

const mealSchema = new mongoose.Schema({

    name: String,
    calories: Number,
    carbs: Number,
    fat: Number,
    protein: Number
});

export const Meal = mongoose.model("Meal", mealSchema);