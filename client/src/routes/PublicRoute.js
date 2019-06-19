import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import './Route.css';

export const PublicRoute = ({
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
        <Redirect to="/dashboard" />
      ) : (
        <div>
          <main className="wrapper">
            <Header />
            <Component {...props} />
          </main>
          <Footer />
        </div>
      )
    }
  />
);

const mapStateToProps = (state) => ({
  // isLoggedIn: !!state.auth.isLoggedIn // uncomment for dev-server only
  token: !!state.auth.token
});

export default connect(mapStateToProps)(PublicRoute);
