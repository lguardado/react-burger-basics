import React from 'react'
import classes from './Modal.css'

const Modal = (props) => (
    <div className={classes.Modal}
        style={{
            opacity: !props.purchasing ? '0' : '1',
            transform: !props.purchasing ? 'translateY(-100vh)' : 'translateY(0)'
        }}>
        {props.children}
    </div>
)

export default Modal