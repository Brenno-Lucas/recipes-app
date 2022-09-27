import { fetchMeals, fetchMealsByCategory } from '../../services/mealsApi';
import { fetchDrinks, fetchDrinksByCategory } from '../../services/drinksApi';
import { MAX_RECIPES_QUANTITY } from '../../utils/constants';

export const REQUESTING_MEALS = 'REQUESTING_MEALS';
export const SET_MEALS_ERROR_MESSAGE = 'SET_MEALS_ERROR_MESSAGE';
export const SET_MEALS = 'SET_MEALS';
export const REQUESTING_DRINKS = 'REQUESTING_DRINKS';
export const SET_DRINKS_ERROR_MESSAGE = 'SET_DRINKS_ERROR_MESSAGE';
export const SET_DRINKS = 'SET_DRINKS';

// MEAL REDUCER ACTIONS
export const setMealsErrorMessage = (error) => ({
  type: SET_MEALS_ERROR_MESSAGE,
  payload: error,
});

const setMeals = (meals) => ({
  type: SET_MEALS,
  payload: meals,
});

const requestingMeals = () => ({
  type: REQUESTING_MEALS,
});

export async function requestMeals(dispatch) {
  dispatch(requestingMeals());

  try {
    const meals = await fetchMeals();
    dispatch(setMeals(meals.slice(0, MAX_RECIPES_QUANTITY)));
  } catch (error) {
    dispatch(setMealsErrorMessage(error.message));
  }
}

export function requestMealsByCategory(categoryName) {
  return async (dispatch) => {
    dispatch(requestingMeals());

    try {
      const meals = await fetchMealsByCategory(categoryName);
      dispatch(setMeals(meals.slice(0, MAX_RECIPES_QUANTITY)));
    } catch (error) {
      dispatch(setMealsErrorMessage(error.message));
    }
  };
}

// DRINK REDUCER ACTIONS

export const setDrinksErrorMessage = (error) => ({
  type: SET_DRINKS_ERROR_MESSAGE,
  payload: error,
});

const setDrinks = (drinks) => ({
  type: SET_DRINKS,
  payload: drinks,
});

const requestingDrinks = () => ({
  type: REQUESTING_DRINKS,
});

export async function requestDrinks(dispatch) {
  dispatch(requestingDrinks());

  try {
    const drinks = await fetchDrinks();
    dispatch(setDrinks(drinks.slice(0, MAX_RECIPES_QUANTITY)));
  } catch (error) {
    dispatch(setDrinksErrorMessage(error.message));
  }
}

export function requestDrinksByCategory(categoryName) {
  return async (dispatch) => {
    dispatch(requestingDrinks());

    try {
      const drinks = await fetchDrinksByCategory(categoryName);
      dispatch(setDrinks(drinks.slice(0, MAX_RECIPES_QUANTITY)));
    } catch (error) {
      dispatch(setDrinksErrorMessage(error.message));
    }
  };
}
