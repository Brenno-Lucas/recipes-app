import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveItemInStorage, getItemFromStorage } from '../services/localStorageHandler';
import { FAVORITE_RECIPES } from '../utils/constants';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { changeFavorites } from '../redux/actions';

function UnfavoriteButton({ id: recipeId, index, changeFavoritesRecipes }) {
  const removeFromFavorites = () => {
    const recipesData = getItemFromStorage(FAVORITE_RECIPES);
    const updatedRecipes = recipesData.filter(({ id }) => id !== recipeId);
    saveItemInStorage(FAVORITE_RECIPES, updatedRecipes);
    changeFavoritesRecipes();
  };

  return (
    <button
      type="button"
      onClick={ removeFromFavorites }
    >
      <figure>
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt="Ícone de coração"
        />
      </figure>
    </button>
  );
}

UnfavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  changeFavoritesRecipes: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  changeFavoritesRecipes: (type) => dispatch(changeFavorites(type)),
});

export default connect(null, mapDispatchToProps)(UnfavoriteButton);
