import { Fragment, useState } from "react";

import Header from "./Components/Layout/Header";
import MealsList from "./Components/Meals/MealsList";
import Cart from "./Components/Cart/Cart";

function App() {

  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  }

  const closeCartHandler = () => {
    setShowCart(false);
  }

  return (
    <>
      {showCart && <Cart onClose={closeCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
      <MealsList/>
      </main>
    </>
  );
}

export default App;
