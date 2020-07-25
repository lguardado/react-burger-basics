import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {

    const renderIngredients = () => (
        Object.keys(props.ingredients)
            .map(ingKey => (
            <li key={ingKey}><span style={{textTransform:'capitalize'}}>{ingKey}</span> : { props.ingredients[ingKey] }</li>
            ))
    )
    return (
        <Aux>
            <h3> Your order </h3>
            <p> A delicious burger with these ingredients!</p>
            <ul>
            {renderIngredients()}
            </ul>
            <Button type='Success'><div>CONTINUE</div></Button>
            <Button type='Danger' click={props.orderCancel}>CANCEL</Button>
        </Aux>)
}

export default orderSummary