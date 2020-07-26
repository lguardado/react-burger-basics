import React, { Component } from 'react';

import classes from './BurgerBuilder.css'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
    'seitan': 0.6,
    'avocado': 0.9,
    'beans-medallion': 2,
    'cheese': 1
}

class BurgerBuilder extends Component {
    state = {
        burgers: [],
        ingredients: {
            'seitan': 0,
            'avocado': 0,
            'beans-medallion': 0,
            'cheese': 0,
        },
        totalPrice: 4,
        canOrder: false,
        isPurchasing: false,
    }

    purchaseHandler = () => {
        this.setState({ isPurchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ isPurchasing: false })
    }

    purchaseContinueHandler = () => {
        alert('your order has been placed!')
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

        return (
            <div className={classes.BurgerBuilder}>
                <Modal purchasing={this.state.isPurchasing} backdropClickHandler={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        total={this.state.totalPrice}
                    ></OrderSummary>
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

export default BurgerBuilder