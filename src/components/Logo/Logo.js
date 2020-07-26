import React from 'react'

import logoImage from '../../assets/images/logo.png'
import classes from './Logo.css'

const logo = () => (
    <div className={classes.Logo}>
        <img src={logoImage} alt='My vegan burger'/>
    </div>
)

export default logo