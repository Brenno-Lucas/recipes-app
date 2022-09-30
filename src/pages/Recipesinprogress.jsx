import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import { getItemFromStorage, saveItemInStorage } from '../services/localStorageHandler';
import { fetchMealsById } from '../services/mealsApi';
import { fetchDrinksById } from '../services/drinksApi';

export default function RecipesInProgress({ match }) {
  const { id } = match.params;
  const { location: { pathname }, push } = useHistory();
  const actualPage = pathname.split('/');
  const [recipe, setRecipe] = useState({});
  const [listOfIngredients, setListOfIngredients] = useState([]);
  const [checkValue, setCheckbox] = useState('');
  const [allCheckbox, checkAllCheckBox] = useState(true);

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
    checkAllCheckBox(() => {
      const check = document.getElementsByName('checkValue');
      return ![...check].every((ele) => ele.checked);
    });
  }, [checkValue]);

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

  const isIngredientInProgress = (ingredients, targetIngredient) => {
    const isIngredientInStorage = ingredients.includes(targetIngredient);

    if (isIngredientInStorage) {
      return ingredients.filter((ingredient) => ingredient !== targetIngredient);
    }

    return [...ingredients, targetIngredient];
  };

  const handleChange = ({ target }) => {
    const { name, checked } = target;
    setCheckbox({
      ...checkValue,
      [name]: checked,
    });
    const inProgressRecipes = getItemFromStorage('inProgressRecipes') ?? {};
    const recipesInProgress = inProgressRecipes?.[actualPage[1]] ?? {};
    const recipeIngredients = Object.keys(recipesInProgress).length
      ? recipesInProgress?.[id] ?? []
      : [];
    const ingredientList = isIngredientInProgress(recipeIngredients, target
      .getAttribute('data-ingredient-name'));

    saveItemInStorage('inProgressRecipes', {
      ...inProgressRecipes,
      [actualPage[1]]: {
        ...recipesInProgress,
        [id]: ingredientList,
      },
    });
  };

  const isIngredientChecked = (ingredient) => {
    const recipeIngredients = getItemFromStorage('inProgressRecipes')
      ?.[actualPage[1]]?.[id] ?? [];
    return recipeIngredients.includes(ingredient);
  };

  const finishRecipeBTN = () => {
    push('/done-recipes');
  };

  const renderFavoriteButton = () => {
    const { strCategory } = recipe;
    if (actualPage[1] === 'meals') {
      const {
        idMeal,
        strArea,
        strMealThumb,
        strMeal,
      } = recipe;
      return (
        <FavoriteButton
          id={ idMeal }
          type="meal"
          nationality={ strArea }
          category={ strCategory }
          name={ strMeal }
          image={ strMealThumb }
        />
      );
    }

    const {
      idDrink,
      strDrinkThumb,
      strDrink,
      strAlcoholic,
    } = recipe;
    return (
      <FavoriteButton
        id={ idDrink }
        type="drink"
        category={ strCategory }
        alcoholicOrNot={ strAlcoholic }
        name={ strDrink }
        image={ strDrinkThumb }
      />
    );
  };

  return (
    <div>
      <img
        src={ actualPage[1] === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <p
        data-testid="recipe-title"
      >
        { actualPage[1] === 'meals' ? recipe.strMeals : recipe.strDrink }
      </p>
      {
        Object.keys(recipe).length > 0 && (
          renderFavoriteButton()
        )
      }
      <ShareButton
        type={ actualPage[1] }
        id={ id }
        index={ 1 }
      />
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <section>
        {
          listOfIngredients.map(({ ingredient, quantity }, index) => (
            <label
              key={ index }
              style={
                isIngredientChecked(ingredient)
                  ? ({ textDecorationLine: 'line-through' })
                  : ({ textDecorationLine: '' })
              }
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `${index}-CheckBox` }
            >
              <input
                type="checkbox"
                name="checkValue"
                data-ingredient-name={ ingredient }
                onChange={ handleChange }
                checked={ isIngredientChecked(ingredient) }
                id={ `${index}-CheckBox` }
              />
              {ingredient}
              -
              {quantity}
            </label>
          ))
        }
      </section>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ finishRecipeBTN }
        disabled={ allCheckbox }
      >
        Finish Recipe
      </button>
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
