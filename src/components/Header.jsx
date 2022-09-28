import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [formData, setFormData] = useState({
    searchInputVisibility: 'false',
  });

  const { searchInputVisibility } = formData;
  const { location: { pathname } } = useHistory();
  const pages = ['Profile', 'Done Recipes', 'Favorite Recipes'];

  const pageTitle = () => {
    const pageTitleX = pathname.split('/');
    if (pageTitleX[1].includes('-')) {
      const test = pageTitleX[1].split('-').map((item) => item[0].toLocaleUpperCase()
      + item.substring(1));
      return `${test[0]} ${test[1]}`;
    }
    const upperTitle = pageTitleX[1][0].toUpperCase() + pageTitleX[1].substring(1);
    return upperTitle;
  };

  const pageVerification = pages.some((item) => pageTitle() === item) === true;

  const changeInputVisibility = () => {
    if (searchInputVisibility === 'false') {
      setFormData({
        searchInputVisibility: 'true',
      });
    } else {
      setFormData({
        searchInputVisibility: 'false',
      });
    }
  };
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
        { pageTitle() }
      </p>
      {pageVerification.toString() === 'false' && (
        <input
          type="image"
          src={ searchIcon }
          alt="search-icon"
          name="search-icon"
          data-testid="search-top-btn"
          onClick={ changeInputVisibility }
        />
      )}
      {searchInputVisibility === 'true' && (
        <SearchBar />
      )}
    </div>
  );
}

export default Header;
