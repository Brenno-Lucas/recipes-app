import React from 'react';

export default function StartRecipeButton() {
  return (
    <div className="recipe-button-container">
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}
