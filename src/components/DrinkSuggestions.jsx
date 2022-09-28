import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Suggestions.css';

export default function DrinkSuggestions({ listOfSuggestions }) {
  return (
    <div className="suggestions-container">
      {
        listOfSuggestions.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <Link
            key={ strDrink }
            to={ `/drinks/${idDrink}` }
          >
            <div
              className="suggestion-card"
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                className="suggestion-img"
                src={ strDrinkThumb }
                alt={ `Foto de um ${strDrink}` }
              />
              <p
                className="suggestion-title"
                data-testid={ `${index}-recommendation-title` }
              >
                {strDrink}
              </p>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

DrinkSuggestions.propTypes = {
  listOfSuggestions: PropTypes.arrayOf(),
}.isRequired;
