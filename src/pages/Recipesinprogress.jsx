import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import { fetchMealsById } from '../services/mealsApi';
import { fetchDrinksById } from '../services/drinksApi';

export default function RecipesInProgress({ match }) {
  const { id } = match.params;
  const { location: { pathname } } = useHistory();
  const recipeID = pathname.split('/');
  const [recipe, setRecipe] = useState({});
  const [listOfIngredients, setListOfIngredients] = useState([]);
  useEffect(() => {
    const setMeals = async () => {
      setRecipe(await fetchMealsById(id));
    };
    const setDrinks = async () => {
      setRecipe(await fetchDrinksById(id));
    };
    switch (window.location.href.includes('meals')) {
    case true:
      setMeals();
      break;
    default:
      setDrinks();
      break;
    }
  }, [id]);

  useEffect(() => {
    const MAX_NUMBER_OF_INGREDIENTS = 20;
    let auxIngredients = [];
    for (let index = 1; index <= MAX_NUMBER_OF_INGREDIENTS; index += 1) {
      const ingredient = `strIngredient${index}`;
      const quantity = `strMeasure${index}`;

      auxIngredients = [...auxIngredients,
        {
          ingredient: recipe[ingredient],
          quantity: recipe[quantity],
        }];
    }
    auxIngredients = auxIngredients.filter(({ ingredient }) => ingredient !== ''
      && ingredient);
    setListOfIngredients([...auxIngredients]);
  }, [recipe]);

  return (
    <div>
      <img
        src={ recipeID[1] === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <p
        data-testid="recipe-title"
      >
        { recipeID[1] === 'meals' ? recipe.strMeals : recipe.strDrink }
      </p>
      <FavoriteButton />
      <ShareButton />
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
      <section>
        {
          listOfIngredients.map(({ ingredient, quantity }, index) => (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              htmlFor="check"
            >
              {ingredient}
              -
              {quantity}
              <input type="checkbox" name="" id="check" />
            </label>
          ))
        }
      </section>
    </div>
  );
}

RecipesInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
