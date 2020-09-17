import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxilary from '../../../hoc/Auxilary'
import Classes from './SideDrawer.css'

const SideDrawer = (props) =>{
    let attachedClasses = [Classes.SideDrawer, Classes.Close]
    if(props.open) {
        attachedClasses = [Classes.SideDrawer, Classes.Open]
    }
    return (
        <Auxilary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={Classes.Logo}>
                        <Logo />
                </div>
                <nav>
                    <NavigationItems />   
                </nav> 
            </div>
        </Auxilary>
        
    )
}

export default SideDrawer
