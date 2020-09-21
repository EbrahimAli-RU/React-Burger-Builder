import React, { Component } from 'react'
import CheckoutSummery from '../../../components/Order/CheckoutSemmery/CheckoutSummery'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
class Checkout extends Component {
    state ={
        ingredients: null,
        totalprice: 0
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1]
            } else {
                ingredients[param[0]] = +param[1]
            }
            
        }
        this.setState({ ingredients: ingredients, totalprice: price})
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        return (
            <div>
                <CheckoutSummery 
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} 
                    render={( props ) =>(<ContactData ingredients={this.state.ingredients} price={this.state.totalprice} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout;