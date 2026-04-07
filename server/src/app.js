import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {User} from "./models/User.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api",userRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB megy! :D"))
.catch(err => console.error("MongoDB nem megy :c  :", err));

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend működik 🚀" });
});

app.post("/api/calculate", async (req, res) => {
    const age = req.body.age;
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);
    const gender = Number(req.body.gender);
    const goal = Number(req.body.goal);
    const bar = 10*weight + 6.25*height - 5*age + (gender === "male" ? 5 : -161 );
    const calories = goal === "fogyás" ? bar*0.8 : goal === "izomtömeg" ? bar*1.2 : bar;
    const protein = goal === "izomtömeg" ? weight * 2 : goal === "fogyás" ? weight * 1.8 : weight * 1.6;

    const fat = weight * 0.8;

    const remainingCalories =
      calories - (protein * 4 + fat * 9);

    const carbs = remainingCalories / 4;
      const user = await User.create({
        age,
        weight,
        height,
        gender,
        goal,
        calories
      });

    res.json({macros: {protein, fat, carbs}, calories, user});
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});