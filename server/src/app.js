import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {User} from "./models/User.js";
import userRoutes from "./routes/userRoutes.js";
import { generatePlan } from "./services/planGenerator.js";
import { Plan } from "./models/Plan.js";

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
    const age = Number(req.body.age);
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);
    const gender = req.body.gender;
    const goal = req.body.goal;
    const bar = 10*weight + 6.25*height - 5*age + (gender === "male" ? 5 : -161 );
    const calories = goal === "fogyás" ? bar*0.8 : goal === "izomtömeg" ? bar*1.2 : bar;
    const protein1 = goal === "izomtömeg" ? weight * 2 : goal === "fogyás" ? weight * 1.8 : weight * 1.6;

    const fat1 = weight * 0.8;

    const remainingCalories =
      calories - (protein1 * 4 + fat1 * 9);

    const carbs1 = remainingCalories / 4;
      const user = await User.create({
        age,
        weight,
        height,
        gender,
        goal,
        calories
      });
    const macros = {
      protein: protein1,
      fat: fat1,
      carbs: carbs1
    }
    const planData = generatePlan(req.body, macros);
    const plan = await Plan.create({
      userId: user._id,
      calories,
      macros,
      meals: planData.meals,
      workouts: planData.workouts
    });
    res.json({macros, plan, calories, user});

});

app.get("/api/plans0", async (req, res) =>{
  const plans = await Plan.find();
  res.json(plans);
});

app.get("/api/plans1", async (req, res) =>{
  const plans = await Plan.find().sort({createdAt: -1});
  res.json(plans);
});

app.get("api/users", async (req, res) => {
  const users = await User.find();
  res.json({users});
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});