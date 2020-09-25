import React, { Component } from "react";
import { connect } from "react-redux";
import Auxilary from "../../hoc/Auxilary";
import Classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  opensideDrawerHandler = () => {
    this.setState((preState) => {
      return { showSideDrawer: !preState.showSideDrawer };
    });
  };
  render() {
    return (
      <Auxilary>
        <Toolbar
          isAuthenticate={this.props.token}
          open={this.opensideDrawerHandler}
        />
        <Sidedrawer
          isAuthenticate={this.props.token}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={Classes.Content}>{this.props.children}</main>
      </Auxilary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Layout);
