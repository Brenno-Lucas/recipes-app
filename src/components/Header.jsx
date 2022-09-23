import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
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
    const { history } = this.props;
    return (
      <div>
        <h1>Header</h1>
        <div
          role="button"
          tabIndex={ 0 }
          onClick={ history.push('/game') }
          onKeyDown={ history.push('/game') }
        >
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
          />
        </div>
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

Header.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(Connect(Header));
