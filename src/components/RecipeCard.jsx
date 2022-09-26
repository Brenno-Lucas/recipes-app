import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ index, recipeName, recipeImage }) {
  return (
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
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipeName: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired,
};
