import React from 'react'
import { NavLink } from 'react-router-dom'
import Classes from './NavigationItem.css'
const NavigationItem = (props) => (
    <li className={Classes.NavigationItem}>
        <NavLink 
            to={props.Link}
            exact={props.exact}
            activeClassName={Classes.active}>{props.children}</NavLink>
        </li>
)

export default NavigationItem 