import React from 'react'
import classes from './BurgerIngredient.css'
import PropTypes from 'prop-types'

const BurgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type) {
        case ('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>
            break;
        case ('bread-top'):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            )
            break;
        case ('beans-medallion'):
            ingredient = <div className={classes.BeansMedallion}></div>
            break;

        case ('cheese'):
            ingredient = <div className={classes.Cheese}></div>
            break;

        case ('seitan'):
            ingredient = <div className={classes.Seitan}></div>
            break;

        case ('avocado'):
            ingredient = <div className={classes.Avocado}></div>
            break;
        default:
            ingredient = null
    }
    return ingredient
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient