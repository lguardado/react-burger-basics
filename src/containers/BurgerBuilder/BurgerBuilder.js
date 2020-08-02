import React, { Component, ReactDOM } from 'react';

import classes from './BurgerBuilder.css'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
    'seitan': 0.6,
    'avocado': 0.9,
    'beans-medallion': 2,
    'cheese': 1
}

class BurgerBuilder extends Component {
    initialState = {
        ingredients: {
            'seitan': 0,
            'avocado': 0,
            'beans-medallion': 0,
            'cheese': 0,
        },
        totalPrice: 4,
        canOrder: false,
        isPurchasing: false,
        loading: false,
    }

    state = { ...this.initialState }

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
        const payload = {
            ingredients: this.state.ingredients,
            // this price should be calculated in the BE
            price: this.state.totalPrice,
            customer: {
                name: 'Lucas',
                address: {
                    street: 'Test street 123',
                    zipCode: '12345',
                    country: 'Argentina',
                },
                email: 'test@a.com',
            },
            deliveryMethod: 'fastest'
        }
        this.setState({ loading: true })
        axios.post('/orders.json', payload)
            .then(response => {
                this.resetBurger()
            })
            .catch(error => {
            }).finally(() => {
                this.setState({ loading: false , isPurchasing: false})
            })

    }

    resetBurger() {
           // it restarts the app state
           this.setState(this.initialState)
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
        let summary = <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            total={this.state.totalPrice}
        ></OrderSummary>

        if (this.state.loading) {
            summary = <Spinner />
        }

        return (
            <div className={classes.BurgerBuilder}>
                <Modal 
                visible={this.state.isPurchasing} 
                backdropClickHandler={this.purchaseCancelHandler}>
                    {summary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                {this.renderBuildControls}
                <BuildControls
                    total={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    canOrder={this.state.canOrder}
                    purchase={this.purchaseHandler}
                />
            </div>)
    };
}

export default withErrorHandler(BurgerBuilder, axios)