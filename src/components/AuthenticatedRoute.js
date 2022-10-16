import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
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
    const { ...rest } = this.props;

    return (
      <Layout>
        <Route {...rest} />
      </Layout>
    );
  }
}
