import React from "react";

import classes from "./MealItem.module.css";

import MealItemForm from "./MealItemForm";
import { useDispatch } from "react-redux";

function MealItems(props) {
  const price = `$${props.price.toFixed(2)}`;
  const dispatch = useDispatch();
  const addCartHandler = (amount) => {
    dispatch({
      type: "ADD",
      item: {
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      },
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onCartAdd={addCartHandler} />
      </div>
    </li>
  );
}

export default MealItems;
