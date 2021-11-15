import classes from "./AvailabelMeals.module.css";
import Card from "../UI/Card";

import MealItems from "./Mealitems/MealItems";
import { useEffect, useState } from "react";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState()
  useEffect(() => {
    const fetchMeals = async() => {
      const response = await fetch('https://ninja-firegram-2b3dc-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok){
        throw new Error('Cannot fetch');
      }
      const responseData = await response.json();
      const loadedMeals = [];

      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, [])

  if(isLoading){
    return <section className={classes.mealsLoading}>
      <p>Loading...</p>
    </section>
  }
  if(error){
    return <section className={classes.mealsLoading}>
      <p>{error}</p>
    </section>
  }

  const mealsItems = meals.map((meal) => (
    <MealItems
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsItems}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
