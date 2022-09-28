import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchDrinksById } from '../services/drinksApi';
import { fetchMeals } from '../services/mealsApi';
import MealsSuggestions from './MealsSuggestions';
import '../styles/RecipeDetails.css';
import RecipeButton from './RecipeButton';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

export default function DrinkRecipe({ match }) {
  const { id: drinkId } = match.params;
  const [drinkInfo, setDrinkInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [listOfIngredients, setListOfIngredients] = useState([]);
  const [listOfSuggestions, setListOfSuggestions] = useState([]);

  const {
    idDrink,
    strCategory,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
  } = drinkInfo;

  useEffect(() => {
    const getRecipeDetails = async () => {
      setDrinkInfo(await fetchDrinksById(drinkId));
    };

    const getSuggestions = async () => {
      const MAX_NUMBER_OF_SUGGESTIONS = 6;
      let suggestions = await fetchMeals();
      suggestions = suggestions.filter((item, index) => (
        index < MAX_NUMBER_OF_SUGGESTIONS));
      setListOfSuggestions([...suggestions]);
    };

    getRecipeDetails();
    getSuggestions();
  }, [drinkId]);

  useEffect(() => {
    const MAX_NUMBER_OF_INGREDIENTS = 15;
    let auxIngredients = [];
    for (let index = 1; index <= MAX_NUMBER_OF_INGREDIENTS; index += 1) {
      const ingredient = `strIngredient${index}`;
      const quantity = `strMeasure${index}`;

      auxIngredients = [...auxIngredients,
        {
          ingredient: drinkInfo[ingredient],
          quantity: drinkInfo[quantity],
        }];
    }

    auxIngredients = auxIngredients.filter(({ ingredient }) => ingredient !== null);

    setListOfIngredients([...auxIngredients]);
    setLoading(false);
  }, [drinkInfo, loading]);

  return (
    <section className="recipe-details-container">
      <ShareButton />
      {
        Object.keys(drinkInfo).length
        && (
          <FavoriteButton
            id={ idDrink }
            type="drink"
            category={ strCategory }
            alcoholicOrNot={ strAlcoholic }
            name={ strDrink }
            image={ strDrinkThumb }
          />
        )
      }
      <img
        src={ strDrinkThumb }
        alt={ `Foto de um ${strDrink}` }
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{strDrink}</p>
      <p data-testid="recipe-category">{strAlcoholic}</p>

      <ul>
        {
          listOfIngredients.map(({ ingredient, quantity }, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
              -
              {quantity}
            </li>
          ))
        }
      </ul>

      <p data-testid="instructions">{strInstructions}</p>

      <MealsSuggestions listOfSuggestions={ listOfSuggestions } />

      <RecipeButton id={ drinkId } type="drinks" />
    </section>
  );
}

DrinkRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
