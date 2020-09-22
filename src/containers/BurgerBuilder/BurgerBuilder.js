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
import * as actionTypes from "../../Store/action";

export class BurgerBuilder extends Component {
  state = {
    // ingredients: {
    //     salad: 0,
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0
    // },
    // ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    err: false,
  };

  componentDidMount() {
    // axios.get('https://react-my-burger-84bca.firebaseio.com/ingredients.json')
    // .then( response => {
    //     // console.log(response.data)
    //     this.setState({ ingredients: response.data})
    // }).catch(err => {
    //     // console.log('ERROR')
    //     this.setState({ err: err })
    // })
  }
  updatePurchasable(ingredients) {
    const ingredientsValue = Object.values(ingredients);
    let sum = 0;
    ingredientsValue.forEach((element) => {
      sum = sum + element;
    });
    this.setState({ purchasable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  //   addIngredientHandler = (type) => {
  //     const oldCount = this.state.ingredients[type];
  //     const updatedCount = oldCount + 1;
  //     const updatedIngredient = {
  //       ...this.state.ingredients,
  //     };
  //     updatedIngredient[type] = updatedCount;
  //     const priceAddition = INGREDIENT_PRICE[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice + priceAddition;
  //     this.setState({
  //       totalPrice: newPrice,
  //       ingredients: updatedIngredient,
  //     });
  //     this.updatePurchasable(updatedIngredient);
  //   };

  //   removeIngredientHandler = (type) => {
  //     const oldCount = this.state.ingredients[type];
  //     if (oldCount <= 0) {
  //       return;
  //     }
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredient = {
  //       ...this.state.ingredients,
  //     };
  //     updatedIngredient[type] = updatedCount;
  //     const priceDeduction = INGREDIENT_PRICE[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice - priceDeduction;
  //     this.setState({
  //       totalPrice: newPrice,
  //       ingredients: updatedIngredient,
  //     });
  //     this.updatePurchasable(updatedIngredient);
  //   };

  modalClosedHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseCanceledHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // this.setState({ loading: true })
    // const order = {
    //     ingredient: this.state.ingredients,
    //     price: this.state.totalPrice,
    //     customer: {
    //         name: 'Ebrahim',
    //         address: {
    //             street: 'test',
    //             zipCode: '55654',
    //             country: 'Bangladesh'
    //         },
    //         email: 'test@gmail.com'
    //     },
    //     deliveryMethod: 'fastest'
    // }
    // axios.post('/orders.json', order).then(res => {
    //     this.setState({ loading: false, purchasing: false })
    // }).catch(err => {
    //     this.setState({ loading: false, purchasing: false })
    // })
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummery = null;
    // if(this.state.loading) {
    //     orderSummery = <Spinner />
    // }
    let burger = this.state.err ? (
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
            purchasable={this.state.purchasable}
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

      if (this.state.loading) {
        orderSummery = <Spinner />;
      }
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
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
