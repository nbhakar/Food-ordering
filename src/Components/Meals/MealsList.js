import React,{Fragment} from 'react'

import AvailableMeals from './AvailabelMeals'
import MealsSummary from './MealsSummary'

function MealsList() {
    return (
        <Fragment>
            <MealsSummary/>
            <AvailableMeals/>
        </Fragment>
    )
}

export default MealsList
