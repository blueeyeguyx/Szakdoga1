export const generatePlan = (user, macros) => {
    const meals = [
        {name: "Zabkása", calories: 400},
        {name: "Csirkemell rizzsel", calories: 600},
        {name: "Túrós vacsora", calories: 300}
    ];

    const workouts =
        user.goal == "fogyás" ? ["HIIT", "Futás", "Teljes testes edzés"] : ["Mell", "Hát", "Láb"];

    return {meals, workouts};
};