import React, { Component } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends Component {
  pageTitle = () => {
    const currentURL = window.location.href;
    const number = 22;
    const pageTitle = currentURL.substring(number);
    const upperTitle = pageTitle[0].toUpperCase() + pageTitle.substring(1);
    return upperTitle;
  };

  render() {
    return (
      <div>
        <h1>Header</h1>
        <img
          src={ profileIcon }
          alt="profile-icon"
          data-testid="profile-top-btn"
        />
        <p data-testid="page-title">
          { this.pageTitle() }
        </p>
        <img
          src={ searchIcon }
          alt="search-icon"
          data-testid="search-top-btn"
        />
      </div>
    );
  }
}

export default Header;
