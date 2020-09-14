import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="p-grid">
      <div className="p-col-12">
        <div className="card">
          <h1>Sorry! Page Not Found.</h1>
          <p>Maybe this page moved or deleted? </p>
          <p>
            Lets go <a href="/">home</a> and try from there.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
