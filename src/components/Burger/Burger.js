import React from 'react'

import Classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let tansformedIngredients = Object.keys(props.ingredients).map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_, i) => {
            return <BurgerIngredient key={igkey + i} type = {igkey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    },[]);
    if(tansformedIngredients.length === 0) {
        tansformedIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={Classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {tansformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default Burger
