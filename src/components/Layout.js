import React, { Component } from 'react';
import classNames from 'classnames';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { SideMenu } from './Menu/SideMenu';
import Logo from '../assets/images/logo.svg';
import LogoWhite from '../assets/images/logo-white.svg';

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      layoutMode: 'static',
      layoutColorMode: 'light',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
    };

    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.onSidebarClick = this.onSidebarClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.createMenu();
  }

  onWrapperClick() {
    if (!this.menuClick) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false,
      });
    }

    this.menuClick = false;
  }

  onToggleMenu(event) {
    this.menuClick = true;

    if (this.isDesktop()) {
      if (this.state.layoutMode === 'overlay') {
        this.setState({
          overlayMenuActive: !this.state.overlayMenuActive,
        });
      } else if (this.state.layoutMode === 'static') {
        this.setState({
          staticMenuInactive: !this.state.staticMenuInactive,
        });
      }
    } else {
      const mobileMenuActive = this.state.mobileMenuActive;
      this.setState({
        mobileMenuActive: !mobileMenuActive,
      });
    }

    event.preventDefault();
  }

  onSidebarClick() {
    this.menuClick = true;
  }

  onMenuItemClick(event) {
    if (!event.item.items) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false,
      });
    }
  }

  createMenu() {
    this.menu = [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
      {
        label: 'Menu Modes',
        icon: 'pi pi-fw pi-cog',
        items: [
          { label: 'Static Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutMode: 'static' }) },
          { label: 'Overlay Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutMode: 'overlay' }) },
        ],
      },
      {
        label: 'Menu Colors',
        icon: 'pi pi-fw pi-align-left',
        items: [
          { label: 'Dark', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutColorMode: 'dark' }) },
          { label: 'Light', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutColorMode: 'light' }) },
        ],
      },
      {
        label: 'Components',
        icon: 'pi pi-fw pi-globe',
        badge: '9',
        items: [
          { label: 'Sample Page', icon: 'pi pi-fw pi-th-large', to: '/sample' },
          { label: 'Forms', icon: 'pi pi-fw pi-file', to: '/forms' },
          { label: 'Data', icon: 'pi pi-fw pi-table', to: '/data' },
          { label: 'Panels', icon: 'pi pi-fw pi-list', to: '/panels' },
          { label: 'Overlays', icon: 'pi pi-fw pi-clone', to: '/overlays' },
          { label: 'Menus', icon: 'pi pi-fw pi-plus', to: '/menus' },
          { label: 'Messages', icon: 'pi pi-fw pi-spinner', to: '/messages' },
          { label: 'Charts', icon: 'pi pi-fw pi-chart-bar', to: '/charts' },
          { label: 'Misc', icon: 'pi pi-fw pi-upload', to: '/misc' },
        ],
      },
    ];
  }

  addClass(element, className) {
    if (element.classList) element.classList.add(className);
    else element.className += ' ' + className;
  }

  removeClass(element, className) {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
        ' ',
      );
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  componentDidUpdate() {
    if (this.state.mobileMenuActive) this.addClass(document.body, 'body-overflow-hidden');
    else this.removeClass(document.body, 'body-overflow-hidden');
  }

  render() {
    const logo = this.state.layoutColorMode === 'dark' ? LogoWhite : Logo;

    const wrapperClass = classNames('layout-wrapper', {
      'layout-overlay': this.state.layoutMode === 'overlay',
      'layout-static': this.state.layoutMode === 'static',
      'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
      'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive,
    });

    const sidebarClassName = classNames('layout-sidebar', {
      'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
      'layout-sidebar-light': this.state.layoutColorMode === 'light',
    });

    return (
      <div className={wrapperClass} onClick={this.onWrapperClick}>
        <Header onToggleMenu={this.onToggleMenu} />
        <div ref={el => (this.sidebar = el)} className={sidebarClassName} onClick={this.onSidebarClick}>
          <div className="layout-logo">
            <img alt="Logo" src={logo} />
          </div>
          <SideMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
        </div>
        <div className="layout-main">{this.props.children}</div>
        <Footer />
        <div className="layout-mask"></div>
      </div>
    );
  }
}

export default Layout;
