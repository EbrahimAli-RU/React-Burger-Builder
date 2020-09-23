import React, { Component } from "react";
import Auxilary from "../../hoc/Auxilary";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummery from "../../components/OrderSummery/OrderSummery";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as action from "../../Store/actions/index";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }
  updatePurchasable(ingredients) {
    const ingredientsValue = Object.values(ingredients);
    let sum = 0;
    ingredientsValue.forEach((element) => {
      sum = sum + element;
    });
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  modalClosedHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseCanceledHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummery = null;

    let burger = this.props.error ? (
      <p>Ingredients Can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Auxilary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchasable(this.props.ings)}
            price={this.props.price.toFixed(2)}
            orderd={this.purchaseHandler}
          />
        </Auxilary>
      );
      orderSummery = (
        <OrderSummery
          ingredient={this.props.ings}
          canclePurchase={this.purchaseCanceledHandler}
          continueParchase={this.purchaseContinueHandler}
          price={this.props.price.toFixed(2)}
        />
      );

      //   if (this.state.loading) {
      //     orderSummery = <Spinner />;
      //   }
    }
    return (
      <Auxilary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.modalClosedHandler}
        >
          {orderSummery}
        </Modal>
        {burger}
      </Auxilary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(action.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(action.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(action.initIngredients()),
    onInitPurchase: () => dispatch(action.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
