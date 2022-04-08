import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Layout from './Layout';

export default class AuthenticatedRoute extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    isPublic: PropTypes.bool,
  };

  static defaultProps = {
    isPublic: false,
  };

  render() {
    const { component: Component, isPublic, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          if (!isPublic) {
            return sessionStorage.getItem('accessToken') ? (
              <Layout>
                <Component {...props} />
              </Layout>
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location },
                }}
              />
            );
          } else {
            return (
              <div className="layout-wrapper">
                <div className="layout-main">
                  <div className="p-grid">
                    <div className="p-col-4" />
                    <div className="p-col-4">
                      <Component {...props} />
                    </div>
                    <div className="p-col-4" />
                  </div>
                </div>
              </div>
            );
          }
        }}
      />
    );
  }
}
