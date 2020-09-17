import React from 'react'

import BurgerLogo from '../../assets/images/burger-logo.png'
import Classes from './Logo.css'
const Logo = () => (
    <div className={Classes.Logo}>
        <img src={BurgerLogo} alt="MyBurger"></img>
    </div>
)

export default Logo
