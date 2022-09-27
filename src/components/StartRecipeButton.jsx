import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function StartRecipeButton({ id: recipeId }) {
  const [recipeHasBeenDone, setRecipeHasBeenDone] = useState(false);

  useEffect(() => {
    const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));

    if (doneRecipesList) {
      const validation = doneRecipesList.find(({ id }) => id === recipeId);
      setRecipeHasBeenDone(validation);
    }
  }, [recipeId]);

  return (
    <div className="recipe-button-container">
      {
        !recipeHasBeenDone && (
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
        )
      }
    </div>
  );
}

StartRecipeButton.propTypes = {
  id: PropTypes.string.isRequired,
};
