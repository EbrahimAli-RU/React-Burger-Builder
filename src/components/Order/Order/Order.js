import React from 'react'
import Classes from './Order.css'

const Order = ( props ) => {
    const Ingredients = [];
    for ( let i in props.ingredients) {
        Ingredients.push({
            name: i,
            amount: props.ingredients[i]
        })
    }

    const IngredientOutput = Ingredients.map(ig => {
    return <span key={ig.name} style={{
        textTransform: 'capitalize',
        display:'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'

    }}> {ig.name} {ig.amount}</span>
    })
    return(
        <div className={Classes.Order}>
            <p>Ingredients: {IngredientOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order