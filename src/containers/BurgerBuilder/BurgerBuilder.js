import React from 'react';
import {connect} from "react-redux";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axios-orders";
import * as actionTypes from "../../store/actions";


class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            purchasing: false,
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        // axios.get("https://react-my-burger-2e92f.firebaseio.com/reducer.json")
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     })
    }

    updatePurchaseState (ing) {

        const sum = Object.keys(ing)
            .map(igKey => {
                return ing[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout");
    };

    render() {
        const disabledInfo = {
            ...this.props.ing
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //{salad: true, meat: false,...}

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.props.ing) {
            burger = (
                <Auxiliary>
                <Burger ingredients={this.props.ing}/>
                <BuildControls
                    ingredientAdded={this.props.addIngredient}
                    ingredientRemoved={this.props.removeIngredient}
                    disabled={{disabledInfo}}
                    purchasable={this.updatePurchaseState(this.props.ing)}
                    ordered={this.purchaseHandler}
                    price={this.props.price}/>
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ing}
                price={this.props.price.toFixed(2)}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}
//przypisanie stanu z redux
const mapStateToProps = state => {
    return {
        ing: state.ingredients,
        price: state.totalPrice
    }
};
//wysyłanie akcji z komponenetu
const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGR, ingredientName: ingName}),
        removeIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGR, ingredientName: ingName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
