import React, { Component } from 'react';
import Logo from '../../assets/images/logo.svg';
export class Footer extends Component {
  render() {
    return (
      <div className="layout-footer">
        <span className="footer-text" style={{ marginRight: '5px' }}>
          PrimeReact
        </span>
        <img src={Logo} alt="" width="80" />
        <span className="footer-text" style={{ marginLeft: '5px' }}>
          Theme and Layout
        </span>
      </div>
    );
  }
}
