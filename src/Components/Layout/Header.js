import { Fragment } from "react";

import classes from "./Header.module.css"
import HeaderCart from "./HeaderCart";

import mealsImage from "../../Assets/meals.jpg"

const Header = (props) => {

    return(
        <Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCart onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="mealsImage" />
            </div>
        </Fragment>
    )
};

export default Header;