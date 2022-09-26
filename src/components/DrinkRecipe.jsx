import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchDrinksById } from '../services/drinksApi';
import fetchMeals from '../services/mealsApi';
import MealsSuggestions from './MealsSuggestions';
import '../styles/RecipeDetails.css';

export default function DrinkRecipe({ match }) {
  const { id: drinkId } = match.params;
  const [drinkInfo, setDrinkInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [listOfIngredients, setListOfIngredients] = useState([]);
  const [listOfSuggestions, setListOfSuggestions] = useState([]);

  const {
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
  } = drinkInfo;

  useEffect(() => {
    const getRecipeDetails = async () => {
      setDrinkInfo(await fetchDrinksById(drinkId));
    };
    getRecipeDetails();
  }, [drinkId, loading]);

  useEffect(() => {
    const getSuggestions = async () => {
      const MAX_NUMBER_OF_SUGGESTIONS = 6;
      let suggestions = await fetchMeals();
      suggestions = suggestions.filter((item, index) => (
        index < MAX_NUMBER_OF_SUGGESTIONS));
      setListOfSuggestions([...suggestions]);
    };

    getSuggestions();
  }, []);

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
  }, [drinkInfo]);

  return (
    <section className="recipe-details-container">
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
