import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UnfavoriteButton from './UnfavoriteButton';
import ShareButton from './ShareButton';

function FavoriteCard({ recipe, index }) {
  const { image, name, category, nationality, alcoholicOrNot, type, id } = recipe;

  const [recipeCategory, setRecipeCategory] = useState('');

  useEffect(() => {
    switch (type) {
    case 'meal':
      setRecipeCategory(category);
      break;
    default:
      setRecipeCategory(alcoholicOrNot);
      break;
    }
  }, [type, category, alcoholicOrNot]);

  return (
    <div>
      <img
        src={ image }
        alt={ `Foto de um(a) ${name}` }
        data-testid={ `${index}-horizontal-image` }
      />

      <p data-testid={ `${index}-horizontal-name` }>{name}</p>

      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${recipeCategory}`}
      </p>

      <ShareButton type={ `${type}s` } id={ id } index={ index } />

      <UnfavoriteButton id={ id } index={ index } />
    </div>
  );
}

FavoriteCard.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteCard;
