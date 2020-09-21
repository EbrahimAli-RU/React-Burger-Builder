import React, { Component } from "react";
import Button from "../../../../components/UI/Button/Button";
import Classes from "./ContactData.css";
import axios from "../../../../axios-orders";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Input from "../../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: {
          required: true,
          length: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          option: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        valid: true,
      },
    },
    loading: false,
    formIsValid: false,
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    console.log(value);
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.length) {
      isValid = value.length === 5 && isValid;
    }
    return isValid;
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value;
    }
    const order = {
      ingredient: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (e, inputidentifyer) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = { ...updatedOrderForm[inputidentifyer] };
    updatedFormElement.value = e.target.value;
    if (updatedFormElement.validation) {
      updatedFormElement.valid = this.checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    }
    updatedFormElement.touched = true;
    console.log(updatedFormElement);
    updatedOrderForm[inputidentifyer] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    let formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => (
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
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={Classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
