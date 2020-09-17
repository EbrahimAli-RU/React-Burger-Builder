import React from 'react'

import Classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'
const NavigationItems = () => (
    <ul className={Classes.NavigationItems}>
        <NavigationItem Link="/" active>Burger Builder</NavigationItem>
        <NavigationItem Link="/">Checkout</NavigationItem>
    </ul>
)

export default NavigationItems
