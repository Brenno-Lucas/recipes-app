import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchMealsById } from '../services/mealsApi';
import { fetchDrinks } from '../services/drinksApi';
import DrinkSuggestions from './DrinkSuggestions';
import '../styles/RecipeDetails.css';
import RecipeButton from './RecipeButton';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

export default function MealRecipe({ match }) {
  const { id: mealId } = match.params;
  const [mealInfo, setMealInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [listOfIngredients, setListOfIngredients] = useState([]);
  const [listOfSuggestions, setListOfSuggestions] = useState([]);

  const {
    idMeal,
    strArea,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = mealInfo;

  useEffect(() => {
    const getRecipeDetails = async () => {
      setMealInfo(await fetchMealsById(mealId));
    };

    const getSuggestions = async () => {
      const MAX_NUMBER_OF_SUGGESTIONS = 6;
      let suggestions = await fetchDrinks();
      suggestions = suggestions.filter((item, index) => (
        index < MAX_NUMBER_OF_SUGGESTIONS));
      setListOfSuggestions([...suggestions]);
    };

    getRecipeDetails();
    getSuggestions();
  }, [mealId]);

  useEffect(() => {
    const MAX_NUMBER_OF_INGREDIENTS = 20;
    let auxIngredients = [];
    for (let index = 1; index <= MAX_NUMBER_OF_INGREDIENTS; index += 1) {
      const ingredient = `strIngredient${index}`;
      const quantity = `strMeasure${index}`;

      auxIngredients = [...auxIngredients,
        {
          ingredient: mealInfo[ingredient],
          quantity: mealInfo[quantity],
        }];
    }

    auxIngredients = auxIngredients.filter(({ ingredient }) => ingredient !== '');

    setListOfIngredients([...auxIngredients]);
    setLoading(false);
  }, [mealInfo, loading]);

  return (
    <section className="recipe-details-container">
      <ShareButton />
      {
        Object.keys(mealInfo).length
        && (
          <FavoriteButton
            id={ idMeal }
            type="meal"
            nationality={ strArea }
            category={ strCategory }
            name={ strMeal }
            image={ strMealThumb }
          />
        )
      }
      <img
        src={ strMealThumb }
        alt={ `Foto de um ${strMeal}` }
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{strMeal}</p>
      <p data-testid="recipe-category">{strCategory}</p>

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

      <iframe
        width="853"
        height="480"
        src={ strYoutube }
        frameBorder="0"
        allowFullScreen
        title="Embedded youtube"
        data-testid="video"
      />

      <DrinkSuggestions listOfSuggestions={ listOfSuggestions } />

      <RecipeButton id={ mealId } type="meals" />
    </section>
  );
}

MealRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
