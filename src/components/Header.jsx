import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends Component {
  state = {
    searchInputVisibility: 'false',
    pages: ['Profile', 'Done Recipes', 'Favorite Recipes'],
  };

  pageTitle = () => {
    const url = window.location.href;
    const pageTitle = url.split('/');
    if (pageTitle[3].includes('-')) {
      const test = pageTitle[3].split('-').map((item) => item[0].toLocaleUpperCase()
      + item.substring(1));
      return `${test[0]} ${test[1]}`;
    }
    const upperTitle = pageTitle[3][0].toUpperCase() + pageTitle[3].substring(1);
    return upperTitle;
  };

  changeInputVisibility = () => {
    const { searchInputVisibility } = this.state;
    if (searchInputVisibility === 'false') {
      this.setState({
        searchInputVisibility: 'true',
      });
    } else {
      this.setState({
        searchInputVisibility: 'false',
      });
    }
  };

  render() {
    const { searchInputVisibility, pages } = this.state;
    const pageTitle = pages.some((item) => this.pageTitle() === item) === true;
    return (
      <div>
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <p data-testid="page-title">
          { this.pageTitle() }
        </p>
        {pageTitle.toString() === 'false' && (
          <input
            type="image"
            src={ searchIcon }
            alt="search-icon"
            name="search-icon"
            data-testid="search-top-btn"
            onClick={ this.changeInputVisibility }
          />
        )}
        {searchInputVisibility === 'true' && (
          <input
            type="text"
            name="search-input"
            data-testid="search-input"
          />
        )}
      </div>
    );
  }
}

export default Header;
