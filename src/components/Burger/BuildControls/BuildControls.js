import React from 'react'

import Classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type:'salad'},
    { label: 'Bacon', type:'bacon'},
    { label: 'Cheese', type:'cheese'},
    { label: 'Meat', type:'meat'}
]
const BuildControls = (props) => {
    const allControls = controls.map(el => {
        return <BuildControl key={el.label} label={el.label} 
        added={() => props.ingredientAdded(el.type)}
        removed={() => props.ingredientRemoved(el.type)}
        disabled={props.disabled[el.type]}
        />
    })
    return (
        <div className={Classes.BuildControls}>
            <p>Current Price: <strong>{props.price}</strong></p>
            {allControls}
            <button
                onClick={props.orderd}
                className={Classes.OrderButton} 
                disabled={!props.purchasable}>ORDER NOW
            </button>
        </div>
    )
}

export default BuildControls
