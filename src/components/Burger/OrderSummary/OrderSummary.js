import React from 'react'

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'
import classes from './OrderSummary.css'

const orderSummary = (props) => {

    const renderIngredients = () => (
        Object.keys(props.ingredients)
            .map(ingKey => (
                <li key={ingKey}><span style={{ textTransform: 'capitalize' }}>{ingKey}</span> : { props.ingredients[ingKey]}</li>
            ))
    )
    return (
        <Aux>
            <h3> Your order </h3>
            <p> A delicious burger with these ingredients!</p>
            <ul>
                {renderIngredients()}
            </ul>
            <p><strong>Total price: {props.total.toFixed(2)}</strong></p>
            <div className={classes.ModalControls}>
                <Button type='Success' click={props.purchaseContinued}>CONTINUE</Button>
                <Button type='Danger' click={props.purchaseCancelled}>CANCEL</Button>
            </div>
        </Aux>)
}

export default orderSummary