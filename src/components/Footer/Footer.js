import React, { Component } from 'react';

export class Footer extends Component {

    render() {
        return  (
            <div className="layout-footer">
                <span className="footer-text" style={{'marginRight': '5px'}}>PrimeReact</span>
                <img src="assets/images/logo.svg" alt="" width="80"/>
                <span className="footer-text" style={{'marginLeft': '5px'}}>Theme and Layout</span>
            </div>
        );
    }
}