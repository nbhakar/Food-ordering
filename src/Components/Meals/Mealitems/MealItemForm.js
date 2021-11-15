import React,{useRef} from "react";

import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css"

function MealItemForm(props) {
  const amountRef = useRef();
  
  const submitFormHandler = (event) => {
    event.preventDefault();
    const totalAmountString = amountRef.current.value;
    const totalAmountNumber = +totalAmountString;
    if(totalAmountString.trim().length === 0 || totalAmountNumber<1 || totalAmountNumber>5){
      return;
    }
    props.onCartAdd(totalAmountNumber)
  }
    
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
          step: "1",
        }}
      />
      <button >+ Add</button>
    </form>
  );
}

export default MealItemForm;
