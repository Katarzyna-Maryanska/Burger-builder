import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {BrowserRouter, Route, Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div>
              <Layout>
                  <Switch>
                      <Route path="/checkout" component={Checkout}></Route>
                      <Route path="/" exact component={BurgerBuilder}></Route>
                  </Switch>
              </Layout>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
