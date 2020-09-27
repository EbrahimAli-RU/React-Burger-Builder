import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../Store/actions/index";
// import BurgerBuilder from '../BurgerBuilder/BurgerBuilder'
class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return (
      // <Route path="/" component={BurgerBuilder} />
      <Redirect to="/" />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(action.authLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
