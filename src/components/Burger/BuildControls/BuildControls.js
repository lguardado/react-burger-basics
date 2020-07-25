import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Beans Medallion', type: 'beans-medallion' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Seitan', type: 'seitan' },
    { label: 'Avocado', type: 'avocado' },
]

const buildControls = (props) => {
    const renderControls = controls.map(control => {
        return <BuildControl
            key={control.label}
            label={control.label}
            addClick={() => props.ingredientAdded(control.type)}
            removeClick={() => props.ingredientRemoved(control.type)}
            disabled={props.disabledInfo[control.type]}
        />
    })

    return (
        <div className={classes.BuildControls}>
            <p>Total price: <strong>{props.total.toFixed(2)}</strong></p>
            {renderControls}
            <button
                className={classes.OrderButton}
                disabled={!props.canOrder}
                onClick={props.purchase}
            >ORDER NOW</button>
        </div>
    );
}

export default buildControls