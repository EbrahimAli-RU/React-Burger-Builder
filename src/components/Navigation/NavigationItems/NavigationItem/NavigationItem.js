import React from 'react'

import Classes from './NavigationItem.css'
const NavigationItem = (props) => (
    <li className={Classes.NavigationItem}>
        <a href={props.Link} className={props.active ? Classes.active : null}>{props.children}</a>
        </li>
)

export default NavigationItem 