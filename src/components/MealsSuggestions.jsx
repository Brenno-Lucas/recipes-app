import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Suggestions.css';

export default function MealsSuggestions({ listOfSuggestions }) {
  return (
    <div className="suggestions-container">
      {
        listOfSuggestions.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <Link
            key={ strMeal }
            to={ `/meals/${idMeal}` }
          >
            <div
              className="suggestion-card"
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                className="suggestion-img"
                src={ strMealThumb }
                alt={ `Foto de um ${strMeal}` }
              />
              <p
                className="suggestion-title"
                data-testid={ `${index}-recommendation-title` }
              >
                {strMeal}
              </p>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

MealsSuggestions.propTypes = {
  listOfSuggestions: PropTypes.arrayOf(),
}.isRequired;
