
import CartIcon from "../Cart/CartIcon";
import { useSelector } from 'react-redux';

import classes from "./HeaderCart.module.css"
import { useEffect, useState } from "react";

const HeaderCart = props => {
    const items = useSelector(state => state.items);
    const [btnAnimation, setBtnAnimation] = useState(false);

    const itemsInCart = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
      }, 0);
      const btnClasses = `${classes.button} ${btnAnimation ? classes.bump : ''}`

      useEffect(() => {
          if(items.length === 0){
              return;
          }
          setBtnAnimation(true);

          const timer = setTimeout( () => {setBtnAnimation(false)},300)
          return () => {
              clearTimeout(timer);
          }
      }, [items])

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>{itemsInCart}</span>
        </button>
    )
}

export default HeaderCart;