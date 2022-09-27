import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function StartRecipeButton({ id: recipeId, type }) {
  const [recipeHasBeenDone, setRecipeHasBeenDone] = useState(false);
  const [recipeIsInProgress, setRecipeIsInProgress] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const verifyIfRecipeHasBeenFinished = () => {
      const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));

      if (doneRecipesList) {
        const isDone = doneRecipesList.find(({ id }) => id === recipeId);
        setRecipeHasBeenDone(isDone);
      }
    };
    verifyIfRecipeHasBeenFinished();

    const verifyIfRecipeIsInProgress = () => {
      const inProgressRecipesList = JSON.parse(localStorage.getItem('inProgressRecipes'));

      if (inProgressRecipesList) {
        const isInProgress = inProgressRecipesList[type][recipeId] !== undefined;
        setRecipeIsInProgress(isInProgress);
      }
    };
    verifyIfRecipeIsInProgress();
  }, [recipeId, type]);

  const handleClick = () => {
    history.push(`/${type}/${recipeId}/in-progress`);
  };

  return (
    <div className="recipe-button-container">
      {
        !recipeHasBeenDone && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleClick }
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
