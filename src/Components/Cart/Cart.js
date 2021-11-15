import React, { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./Cart.module.css";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import { useDispatch } from "react-redux";
import Checkout from "./Checkout";

function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const Amount = useSelector((state) => state.totalAmount);
  const totalAmount = `$${Amount.toFixed(2)}`;
  const hasItems = items.length > 0;

  const cartItemAddHandler = (item) => {
    dispatch({ type: "ADD", item: { ...item, amount: 1 } });
  };
  const cartItemRemoveHandler = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalAction = (
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={() => setIsCheckout(true)}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch(
      "https://ninja-firegram-2b3dc-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: items,
        }),
      }
    );
    setDidSubmit(true);
    setIsSubmitting(false);
    dispatch({type: 'CLEAR'})
  };

  const isSubmittingModalContent = <p>Sending Order Data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          close
        </button>
      </div>
    </React.Fragment>
  );

  const modalCartItem = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalAction}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && modalCartItem}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  );
}

export default Cart;
