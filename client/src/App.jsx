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

    }
    catch(err){
      console.error(err);
    }
  };


  useEffect(() => {
    axios.get("http://localhost:5000/api/health")
      .then(res => console.log(res.data))
      .catch(err => console.error("Axios hiba:", err));
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

      {calories && <h2>Napi kalória: {calories}</h2>}
    </div>);
}

export default App;