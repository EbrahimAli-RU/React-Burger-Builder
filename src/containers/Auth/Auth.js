import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Classes from "./Auth.css";
import * as action from "../../Store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "password",
        },
        value: "",
        validation: {
          required: true,
          length: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.length) {
      isValid = value.length >= 6 && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (e, inputidentifyer) => {
    const updatedControls = {
      ...this.state.controls,
    };
    const updatedFormElement = { ...updatedControls[inputidentifyer] };
    updatedFormElement.value = e.target.value;
    if (updatedFormElement.validation) {
      updatedFormElement.valid = this.checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    }
    updatedFormElement.touched = true;
    updatedControls[inputidentifyer] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state.controls);
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };
  render() {
    let formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        Invalid={!formElement.config.valid}
        Touched={formElement.config.touched}
        ShouldValidate={formElement.config.validation}
        changed={(e) => this.inputChangedHandler(e, formElement.id)}
      />
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    let authRedirect = null;
    if (this.props.isAuthenticate) {
      authRedirect = <Redirect to="/" />;
    }
    return (
      <div className={Classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            SUBMIT
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          Switch to {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticate: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(action.auth(email, password, isSignUp)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
