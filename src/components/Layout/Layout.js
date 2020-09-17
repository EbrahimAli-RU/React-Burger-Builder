import React, { Component} from 'react'

import Auxilary from '../../hoc/Auxilary'
import Classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedrawer  from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    opensideDrawerHandler = () => {
        this.setState((preState) => {
            return { showSideDrawer: !preState.showSideDrawer }
        })
    }
    render() {
        return (
            <Auxilary>
                <Toolbar open={this.opensideDrawerHandler}/>
                <Sidedrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={ Classes.Content }>
                    {this.props.children}
                </main>
            </Auxilary>
        )
    }
}

export default Layout;