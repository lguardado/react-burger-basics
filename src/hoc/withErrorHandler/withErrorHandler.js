import React, { Component } from 'react'

import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => (
    class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                if (error) {
                    this.setState({ error: error })
                }
            })
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            })
        }

        errorDismissHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal
                        visible={this.state.error}
                        backdropClickHandler={this.errorDismissHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }

        componentWillUnmount() {
            axios.interceptors.response.eject(this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor)
            
            
        }

    }
)

export default withErrorHandler
