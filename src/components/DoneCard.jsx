import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';
import '../styles/FavoriteRecipes.css';

function DoneCard({ recipe, index }) {
  const {
    image,
    name,
    category,
    nationality,
    alcoholicOrNot,
    type,
    id,
    doneDate,
    tags,
  } = recipe;

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
      <Link to={ `/${type}s/${id}` }>
        <img
          className="fav-card-img"
          src={ image }
          alt={ `Foto de um(a) ${name}` }
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>

      <p data-testid={ `${index}-horizontal-done-date` }>{`Done in: ${doneDate}`}</p>

      <div>
        {
          tags.map((tag, tagIndex) => (
            <p
              key={ tagIndex }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          ))
        }
      </div>

      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${recipeCategory}`}
      </p>

      <ShareButton type={ `${type}s` } id={ id } index={ index } />
    </div>
  );
}

DoneCard.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneCard;
