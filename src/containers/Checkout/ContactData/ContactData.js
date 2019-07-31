import React, {Component} from "react";
import {connect} from "react-redux";

import classes from "./ContactData.css"
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    };
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ing,
            price: this.props.price,
            customer: {
                name: "Kate",
                address: {
                    street: "Teststreet 1",
                    zipCode: "23456",
                    country: "Poland"
                },
                email: "test@gmail.com"
            },
            deliveryMethod: "fastest"
        };
        axios.post("/orders.json", order)
            .then(response => {
                this.setState({loading: false})
            })
            .catch(error => {
                this.setState({loading: false})
            })
    };

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Entry your contact data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
      ing: state.ingredients,
      price: state.totalPrice
  }
};

export default connect(mapStateToProps)(ContactData);