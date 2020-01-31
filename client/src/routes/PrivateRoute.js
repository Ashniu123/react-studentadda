import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import "./Route.scss";

export const PrivateRoute = ({
  // isLoggedIn,
  token,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) =>
      // isLoggedIn ? (
      token ? (
        <div>
          <main className="wrapper">
            <Header />
            <Component {...props} />
          </main>
          <Footer />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  // isLoggedIn: !!state.auth.isLoggedIn // uncomment for dev-server only
  token: !!state.auth.token,
});

export default connect(mapStateToProps)(PrivateRoute);
