import React from 'react'

import Classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'
const NavigationItems = () => (
    <ul className={Classes.NavigationItems}>
        <NavigationItem Link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem Link="/orders">Orders</NavigationItem>
    </ul>
)

export default NavigationItems
