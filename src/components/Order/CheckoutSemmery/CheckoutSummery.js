import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import Classes from './CheckoutSummery.css'

const CheckoutSummery = ( props ) => {
    return(
        <div className={Classes.CheckoutSummery}>
            <h1>We hope it tastes well!</h1>
            <div style={{
                width: '100%',
                margin: 'auto'
            }}>
                <Burger  ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummery;