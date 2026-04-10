import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    weight: "",
    height: "",
    goal: "fenntartás",
    dailyTime: ""
  });

  const [calories, setCalories] = useState(null);
  const [macros, setMacros] = useState(null);
  const [plan, setPlan] = useState(null);
  const [mostRecentPlan, setMostRecentPlan] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(formData);
    try{
      const res = await axios.post("http://localhost:5000/api/calculate",
      formData
      );
      console.log(res.data);
      setCalories(res.data.calories);
      setMacros(res.data.macros);
      console.log(res.data.plan);
      setPlan(res.data.plan);

    }
    catch(err){
      console.error(err);
    }
  };

  const handleLastPlanReq = async (e) =>{
    e.preventDefault();
    try{
      const res = await axios.get("http://localhost:5000/api/plans1");
      setMostRecentPlan(res.data[0]);
    }
    catch(err){
      console.error("Hiba a legutolsó terv lekérdezésekor: ", err);
    }
  }


  useEffect(() => {
    axios.get("http://localhost:5000/api/health")
      .then(res => console.log(res.data))
      .catch(err => console.error("Axios hiba:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
    .then(res => console.log(res.data.user))
    .catch(err => console.error("Axios hiba a users-nel: ", err));
  }, []);
  return ( <div style={{ padding: "20px" }}>
      <h1>Szakdoga App</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Név"
          onChange={handleChange}
        />

        <input
          name="age"
          type="number"
          placeholder="Életkor"
          onChange={handleChange}
        />

        <input
          name="weight"
          type="number"
          placeholder="Súly (kg)"
          onChange={handleChange}
        />

        <input
          name="height"
          type="number"
          placeholder="Magasság (cm)"
          onChange={handleChange}
        />

        {/* Gender */}
        <select name="gender" onChange={handleChange}>
          <option value="male">Férfi</option>
          <option value="female">Nő</option>
        </select>

        {/* Goal */}
        <select name="goal" onChange={handleChange}>
          <option value="fogyás">Fogyás</option>
          <option value="izomtömeg">Izomtömeg</option>
          <option value="fenntartás">Fenntartás</option>
        </select>

        <input
          name="dailyTime"
          placeholder="Napi edzésidő (perc)"
          onChange={handleChange}
        />

        <button type="submit">Számol</button>
      </form>
      <form onSubmit={handleLastPlanReq}>
        <button type="submit">Mutasd a legutóbbit</button>
      </form>


      {calories !== null && (<h2>Napi kalória: {calories}</h2>)}
      {macros && (<div>
        <p>Fehérje: {macros.protein}</p>
        <p>Szénhidrát: {macros.carbs}</p>
        <p>Zsír: {macros.fat}</p>
      </div>)}
      {plan && (<div>
       <>
          <h3>Étrend</h3>
          {plan.meals.map(m => (
            <p key={m.name}>{m.name}</p>
          ))}

          <h3>Edzés</h3>
          {plan.workouts.map(w => (
            <p key={w}>{w}</p>
          ))}
          
        </>
      </div>)}
      {
        mostRecentPlan && (<div>
          <>
          <h3>Étrend</h3>
          {
            mostRecentPlan.meals.map(m => (
              <p key={m.name}>{m.name}</p>
            ))
          }
          <h3>Edzés</h3>
          {
            mostRecentPlan.workouts.map(w => (
              <p key={w}>{w}</p>
            ))
          }
          </>
          </div>
          )
      }
    </div>);
}

export default App;