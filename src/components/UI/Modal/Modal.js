import React, { Component } from 'react'
import classes from './Modal.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backrdop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, _) {
        return nextProps.visible !== this.props.visible || nextProps.children !== this.props.children
    }

    render() {
        return (
            <Aux>
                <Backdrop visible={this.props.visible} backdropClicked={this.props.backdropClickHandler} />
                <div className={classes.Modal}
                    style={{
                        textAlign: 'center',
                        opacity: !this.props.visible ? '0' : '1',
                        transform: !this.props.visible ? 'translateY(-100vh)' : 'translateY(0)'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal