import { fetchMeals,
  fetchMealsByCategory, fetchMealsByType } from '../../services/mealsApi';
import { fetchDrinks,
  fetchDrinksByCategory, fetchDrinksByType } from '../../services/drinksApi';
import { MAX_RECIPES_QUANTITY } from '../../utils/constants';

export const REQUESTING_MEALS = 'REQUESTING_MEALS';
export const SET_MEALS_ERROR_MESSAGE = 'SET_MEALS_ERROR_MESSAGE';
export const SET_MEALS = 'SET_MEALS';
export const REQUESTING_DRINKS = 'REQUESTING_DRINKS';
export const SET_DRINKS_ERROR_MESSAGE = 'SET_DRINKS_ERROR_MESSAGE';
export const SET_DRINKS = 'SET_DRINKS';
export const SET_TYPE = 'SET_TYPE';
export const CHANGE_FAVORITES = 'CHANGE_FAVORITES';
const errorMSG = 'Sorry, we haven\'t found any recipes for these filters.';

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
    if (!meals) throw new Error(errorMSG);
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
      if (!meals) throw new Error(errorMSG);
      dispatch(setMeals(meals.slice(0, MAX_RECIPES_QUANTITY)));
    } catch (error) {
      dispatch(setMealsErrorMessage(error.message));
    }
  };
}

export function requestMealsByType(endpoint, search) {
  return async (dispatch) => {
    dispatch(requestingMeals());

    try {
      const meals = await fetchMealsByType(endpoint, search);
      if (!meals) throw new Error(errorMSG);
      dispatch(setMeals(meals.slice(0, MAX_RECIPES_QUANTITY)));
    } catch (error) {
      await dispatch(setMealsErrorMessage(error.message));
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
    if (!drinks) throw new Error(errorMSG);
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
      if (!drinks) throw new Error(errorMSG);
      dispatch(setDrinks(drinks.slice(0, MAX_RECIPES_QUANTITY)));
    } catch (error) {
      dispatch(setDrinksErrorMessage(error.message));
    }
  };
}

export function requestDrinksByType(endpoint, search) {
  return async (dispatch) => {
    dispatch(requestingDrinks());

    try {
      const drinks = await fetchDrinksByType(endpoint, search);
      if (!drinks) throw new Error(errorMSG);
      dispatch(setDrinks(drinks.slice(0, MAX_RECIPES_QUANTITY)));
    } catch (error) {
      dispatch(setDrinksErrorMessage(error.message));
    }
  };
}

// FILTER REDUCER ACTIONS

export const setType = (type) => ({
  type: SET_TYPE,
  payload: type,
});

// FAVORITE REDUCER ACTIONS

export const changeFavorites = () => ({
  type: CHANGE_FAVORITES,
});
