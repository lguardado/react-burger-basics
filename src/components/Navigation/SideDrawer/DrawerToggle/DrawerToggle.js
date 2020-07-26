import React from 'react';

import hamburger from '../../../../assets/images/hamburger.png'
import classes from './DrawerToggle.css'

const drawerToggle = ( props ) => (
        <div onClick={props.drawerToggleClicked}>
            <img className={classes.img} src={hamburger} alt='menu'/>
        </div>
    )

export default drawerToggle