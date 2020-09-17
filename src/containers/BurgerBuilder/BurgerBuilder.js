import React, { Component } from 'react'
import Auxilary from '../../hoc/Auxilary'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/OrderSummery/OrderSummery'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

export class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchasable (ingredients) {
        const ingredientsValue = Object.values(ingredients);
        let sum = 0;
        ingredientsValue.forEach(element => {
            sum = sum + element;
        });
        this.setState({purchasable: sum > 0})

    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients:updatedIngredient
        })
        this.updatePurchasable(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients:updatedIngredient
        })
        this.updatePurchasable(updatedIngredient)
    }

    modalClosedHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseCanceledHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true })
        const order = {
            ingredient: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ebrahim',
                address: {
                    street: 'test',
                    zipCode: '55654',
                    country: 'Bangladesh'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(res => {
            this.setState({ loading: false, purchasing: false })
        }).catch(err => {
            this.setState({ loading: false, purchasing: false })
        })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummery  = <OrderSummery ingredient={this.state.ingredients} 
            canclePurchase={this.purchaseCanceledHandler}
            continueParchase={this.purchaseContinueHandler}
            price={this.state.totalPrice.toFixed(2)}
    />
        if(this.state.loading) {
            orderSummery = <Spinner />
        }
        return (
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.modalClosedHandler}>
                    {orderSummery}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice.toFixed(2)}
                    orderd={this.purchaseHandler}
                />
            </Auxilary>
        )
    }
}

export default BurgerBuilder
