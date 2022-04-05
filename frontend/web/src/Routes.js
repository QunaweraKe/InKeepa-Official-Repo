import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React  from 'react';
import HomeComponent from "./components/HomeComponent";
import SignInComponent from "./components/SignInComponent";
import SignUpComponent from "./components/SignUpComponent";
import SalesComponent from "./components/Support/SalesComponent";
import HelpComponent from "./components/Support/HelpComponent";
import CartComponent from "./components/CartComponent";
import AccountComponent from "./components/AccountComponent";
import PageNotFoundComponent from "./layouts/PageNotFoundComponent";
import PrivateRoute from "./PrivateRoute";

export const routes = {
  root: "/",
  signin: "/signin",
  signup: "/signup",
  account: "/account",
  cart: "/cart",
  help:"/help",
  sales:"/sales",
};

export default function Routes() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path={routes.root} exact component={HomeComponent} />
        <PrivateRoute
          path={routes.account}
          exact
          component={AccountComponent}
        />
        <PrivateRoute path={routes.cart} exact component={CartComponent} />
        <Route path={routes.signin} exact component={SignInComponent} />
        <Route path={routes.signup} exact component={SignUpComponent} />
        <Route path={routes.sales} exact component={SalesComponent} />
        <Route path={routes.help} exact component={HelpComponent} />
        <Route component={PageNotFoundComponent} />
      </Switch>
    </Router>
  );
}
