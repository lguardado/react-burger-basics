import React from 'react'

import classes from './Backdrop.css'

const backdrop = (props) => (
    props.visible &&
    <div 
        className={classes.Backdrop}
        onClick={props.backdropClicked}
        >
    </div>
)

export default backdrop