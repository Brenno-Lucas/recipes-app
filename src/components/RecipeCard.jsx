import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RecipeCard({ index, linkTo, recipeName, recipeImage }) {
  return (
    <Link to={ linkTo }>
      <div data-testid={ `${index}-recipe-card` }>
        <span data-testid={ `${index}-card-name` }>
          { recipeName }
        </span>
        <figure>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipeImage }
            alt={ recipeName }
          />
        </figure>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipeName: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};
