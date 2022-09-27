import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function StartRecipeButton({ id: recipeId, type }) {
  const [recipeHasBeenDone, setRecipeHasBeenDone] = useState(false);
  const [recipeIsInProgress, setRecipeIsInProgress] = useState(false);

  useEffect(() => {
    const getFinishedRecipes = () => {
      const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));

      if (doneRecipesList) {
        const validation = doneRecipesList.find(({ id }) => id === recipeId);
        setRecipeHasBeenDone(validation);
      }
    };
    getFinishedRecipes();

    const getRecipesInProgress = () => {
      const inProgressRecipesList = JSON.parse(localStorage.getItem('inProgressRecipes'));

      if (inProgressRecipesList) {
        const validation = inProgressRecipesList[type][recipeId] !== undefined;
        setRecipeIsInProgress(validation);
      }
    };
    getRecipesInProgress();
  }, [recipeId, type]);

  return (
    <div className="recipe-button-container">
      {
        !recipeHasBeenDone && (
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            {recipeIsInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )
      }
    </div>
  );
}

StartRecipeButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
