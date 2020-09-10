import React, { Component } from 'react';

export class NotFoundPage extends Component {
  render() {
    return (
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <h1>Sorry! Page Not Found.</h1>
            <p>Maybe this page moved or deleted? </p>
            <p>
              Let's go <a href="/">home</a> and try from there.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
