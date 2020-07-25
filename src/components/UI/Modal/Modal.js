import React from 'react'
import classes from './Modal.css'
import Backdrop from './Backrdop/Backdrop'
import Aux from '../../../hoc/Aux'

const modal = (props) => (
    <Aux>
        <Backdrop visible={props.purchasing} backdropClicked={props.backdropClickHandler} />
        <div className={classes.Modal}
            style={{
                opacity: !props.purchasing ? '0' : '1',
                transform: !props.purchasing ? 'translateY(-100vh)' : 'translateY(0)'
            }}>
            {props.children}
        </div>
    </Aux>
)

export default modal