import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

const menus = [
  {
    name: 'Trang Chủ',
    to: '/',
    exact: true,
  },
  {
    name: 'Quản Lý Sản Phẩm',
    to: '/product-list',
    exact: false,
  },
];

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      // eslint-disable-next-line react/no-children-prop
      children={({ match }) => {
        var active = match ? 'active' : '';
        return (
          <li className={active}>
            <Link to={to}>{label}</Link>
          </li>
        );
      }}
    />
  );
};

MenuLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  activeOnlyWhenExact: PropTypes.bool.isRequired,
};

MenuLink.defaultProps = {
  data: [],
};

class Menu extends Component {
  render() {
    return (
      <div className="navbar navbar-default">
        <a className="navbar-brand">CALL API</a>
        <ul className="nav navbar-nav">{this.showMenus(menus)}</ul>
      </div>
    );
  }

  showMenus = menus => {
    var result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return <MenuLink key={index} label={menu.name} to={menu.to} activeOnlyWhenExact={menu.exact} />;
      });
    }
    return result;
  };
}

export default Menu;
