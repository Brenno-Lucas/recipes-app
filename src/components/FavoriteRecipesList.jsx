import React from 'react';
import copy from 'clipboard-copy';
import share from '../images/shareIcon.svg';
import like from '../images/blackHeartIcon.svg';

export default function FavoriteRecipesList({ list }) {
  

  const handleShareMeal = (id) => {
    copy(`http://localhost:3000/meals/${id}`);
    console.log('copiei');
  };

  const handleShareDrink = (id) => {
    copy(`http://localhost:3000/drinks/${id}`);
    console.log('copiei');
  };

  return (
    <div>
      {
        list.map((item, index) => {
          const {
            image,
            name,
            category,
            nationality,
            alcoholicOrNot,
            type,
            id,
          } = item;

          if (type === 'meal') {
            return (
              <div>
                <img
                  src={ image }
                  alt={ `Foto de ${name}` }
                  data-testid={ `${index}-horizontal-image` }
                />
                <p data-testid={ `${index}-horizontal-name` }>{name}</p>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${nationality} - ${category}`}
                </p>
                <button type="button" onClick={ () => handleShareMeal(id) }>
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ share }
                    alt="Share Icon"
                  />
                </button>
                <button type="button">
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ like }
                    alt="Like Icon"
                  />
                </button>
              </div>
            );
          }
          return (
            <div key={ index }>
              <img
                src={ image }
                alt={ `Foto de ${name}` }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{name}</p>
              <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
              <p>{nationality}</p>
              <button type="button" onClick={ () => handleShareDrink(id) }>
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ share }
                  alt="Share Icon"
                />
              </button>
              <button type="button">
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ like }
                  alt="Like Icon"
                />
              </button>
            </div>
          );
        })
      }
    </div>
  );
}
