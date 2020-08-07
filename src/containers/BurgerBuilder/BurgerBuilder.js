import React, { Component, ReactDOM } from 'react';

import classes from './BurgerBuilder.css'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux/Aux'

const INGREDIENTS_PRICES = {
    'seitan': 0.6,
    'avocado': 0.9,
    'beans-medallion': 2,
    'cheese': 1
}

class BurgerBuilder extends Component {
    initialState = {
        ingredients: null,
        totalPrice: 4,
        canOrder: false,
        isPurchasing: false,
        loading: false,
        error: false,
    }

    state = { ...this.initialState }

    componentWillMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data, loading: false })
            })
            .catch(err => this.setState({ error: true }))
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextProps === this.initialState) {
            ReactDOM.findDOMNode(this).scrollTop = 0;
        }
    }

    purchaseHandler = () => {
        this.setState({ isPurchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ isPurchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout', this.state.ingredients)
        // const payload = {
        //     ingredients: this.state.ingredients,
        //     // this price should be calculated in the BE
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Lucas',
        //         address: {
        //             street: 'Test street 123',
        //             zipCode: '12345',
        //             country: 'Argentina',
        //         },
        //         email: 'test@a.com',
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // this.setState({ loading: true })

        // axios.post('/orders.json', payload)
        //     .then(response => {
        //         this.resetBurger()
        //     })
        //     .catch(error => {
        //     }).finally(() => {
        //         this.setState({ loading: false, isPurchasing: false })
        //     })
    }

    resetBurger() {
        // it restarts the app state
        // commenting this rather than implementing 
        // a better solution just to stick to the course.
        // this.setState(this.initialState)
    }

    updateCanOrder() {
        const counter = Object.values(this.state.ingredients)
            .reduce((count, el) => {
                return count + el
            }, 0)
        this.setState({ canOrder: counter > 0 })
    }

    addIngredientHandler = (type) => {
        const oldTotal = this.state.totalPrice
        let updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]++
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: oldTotal + INGREDIENTS_PRICES[type]
        }, this.updateCanOrder)

    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] === 0) {
            return
        }
        const oldTotal = this.state.totalPrice
        let updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]--
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: oldTotal - INGREDIENTS_PRICES[type]
        }, this.updateCanOrder)
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0
        }
        let renderSummary = null

        if (this.state.loading) {
            renderSummary = <Spinner />
        }

        let renderBurger = this.state.error ? <p>Can't get ingredients</p> : <Spinner />

        if (this.state.ingredients) {
            renderBurger = <Aux><Burger ingredients={this.state.ingredients} />
                {this.renderBuildControls}
                <BuildControls
                    total={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    canOrder={this.state.canOrder}
                    purchase={this.purchaseHandler}
                />
            </Aux>
            renderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                total={this.state.totalPrice}
            ></OrderSummary>

        }

        return (
            <div className={classes.BurgerBuilder}>
                <Modal
                    visible={this.state.isPurchasing}
                    backdropClickHandler={this.purchaseCancelHandler}>
                    {renderSummary}
                </Modal>
                {renderBurger}
            </div>)
    };
}

export default withErrorHandler(BurgerBuilder, axios)