import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {User} from "./models/User.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB megy! :D"))
.catch(err => console.error("MongoDB nem megy :c  :", err));

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend működik 🚀" });
});

app.post("/api/calculate", async (req, res) => {
    const {age, weight, height, gender, goal} = req.body;
    const bar = 10*weight + 6.25*height - 5*age + (gender === "male" ? 5 : -161 );
    const calories = goal === "fogyás" ? bar*0.8 : goal === "izomtömeg" ? bar*1.2 : bar;
    const user = await User.create({
      age,
      weight,
      height,
      gender,
      goal,
      calories
    });
    res.json({calories, user});
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});