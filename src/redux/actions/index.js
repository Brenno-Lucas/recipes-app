import { fetchMeals, fetchMealsByType } from '../../services/fetchMeals';
import { fetchDrinks, fetchDrinksByType } from '../../services/fetchDrinks';
import MAX_RECIPES_QUANTITY from '../../utils/constants';

export const REQUESTING_MEALS = 'REQUESTING_MEALS';
export const SET_MEALS_ERROR_MESSAGE = 'SET_MEALS_ERROR_MESSAGE';
export const SET_MEALS = 'SET_MEALS';
export const REQUESTING_DRINKS = 'REQUESTING_DRINKS';
export const SET_DRINKS_ERROR_MESSAGE = 'SET_DRINKS_ERROR_MESSAGE';
export const SET_DRINKS = 'SET_DRINKS';
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

export function requestMeals() {
  return async (dispatch) => {
    dispatch(requestingMeals());

    try {
      const meals = await fetchMeals();
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

export function requestDrinks() {
  return async (dispatch) => {
    dispatch(requestingDrinks());

    try {
      const drinks = await fetchDrinks();
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
