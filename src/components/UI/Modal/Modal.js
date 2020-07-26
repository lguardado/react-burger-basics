import React, { Component } from 'react'
import classes from './Modal.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backrdop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.purchasing !== this.props.purchasing
    }

    render() {
        return (
            <Aux>
                <Backdrop visible={this.props.purchasing} backdropClicked={this.props.backdropClickHandler} />
                <div className={classes.Modal}
                    style={{
                        opacity: !this.props.purchasing ? '0' : '1',
                        transform: !this.props.purchasing ? 'translateY(-100vh)' : 'translateY(0)'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal