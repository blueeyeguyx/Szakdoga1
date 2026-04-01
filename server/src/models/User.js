import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({

    name: String,
    age: Number,
    gender: String,
    weight: Number,
    height: Number,
    goal: String,
    intolerances: [String],
    dailyTime: String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    calories: Number
});

export const User = mongoose.model("User", userSchema);