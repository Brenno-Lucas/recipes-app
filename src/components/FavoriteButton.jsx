import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { saveItemInStorage, getItemFromStorage } from '../services/localStorageHandler';
import { FAVORITE_RECIPES } from '../utils/constants';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteButton(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id, type, nationality, category, alcoholicOrNot, name, image } = props;
  const recipesData = getItemFromStorage(FAVORITE_RECIPES) ?? [];
  const isRecipeFavorite = recipesData.find(({ id: favoriteId }) => favoriteId === id);

  const saveFavorite = () => {
    const recipeData = { id, type, nationality, category, alcoholicOrNot, name, image };

    if (!isRecipeFavorite) {
      saveItemInStorage(FAVORITE_RECIPES, [...recipesData, recipeData]);
      setIsFavorite(true);
    } else {
      const updatedRecipes = recipesData.filter((recipe) => recipe !== isRecipeFavorite);
      saveItemInStorage(FAVORITE_RECIPES, updatedRecipes);
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    if (isRecipeFavorite) setIsFavorite(true);
    else setIsFavorite(false);
  }, [isFavorite, isRecipeFavorite]);

  return (
    <button
      type="button"
      onClick={ saveFavorite }
    >
      <figure>
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Icone de coração"
        />
      </figure>
    </button>
  );
}

FavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

FavoriteButton.defaultProps = {
  alcoholicOrNot: '',
  nationality: '',
};
