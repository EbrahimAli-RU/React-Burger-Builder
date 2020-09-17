import React from 'react'

import Auxilary from '../../hoc/Auxilary'
import Button from '../UI/Button/Button'
const OrderSummery = (props) => {
    const ingredientsSummery = Object.keys(props.ingredient)
        .map(igKey => {
            return(
                <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}:</span> {props.ingredient[igKey]}</li>
            )
        })

    return (
        <Auxilary>
            <h3>your Order</h3>
            <p>A delicious Burger with the following ingredients:</p>
            <ul>
                {ingredientsSummery}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.canclePurchase}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueParchase}>CONTINUE</Button>
        </Auxilary>
    )
}

export default OrderSummery
