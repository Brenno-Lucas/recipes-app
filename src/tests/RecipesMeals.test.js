import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import { MAX_CATEGORIES_QUANTITY, MAX_RECIPES_QUANTITY } from '../utils/constants';

const { meals: mockedMeals } = meals;
const { meals: mockedMealsCategories } = mealCategories;
const { meals: mockedBreakfastMeals } = breakfastMeals;

describe('Tela de receitas pela rota "/meals"', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks),
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('Verifica se ao carregar a página "/meals" recupera as categorias de comida, as comidas e as bebidas', async () => {
    renderWithRouterAndRedux(<App />, undefined, '/meals');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));
  });

  test('Verifica se ao carregar a página todos cards de comida são renderizados com suas respectivas informações', async () => {
    const { store } = renderWithRouterAndRedux(<App />, undefined, '/meals');

    const recipeCards = await screen.findAllByTestId(/^[0-9]*-recipe-card$/i);
    expect(recipeCards).toHaveLength(MAX_RECIPES_QUANTITY);

    const { mealReducer: { meals: mealsInStore } } = store.getState();
    mealsInStore.forEach(({ idMeal, strMeal, strMealThumb }, index) => {
      const cardsLink = screen.getAllByRole('link');

      expect(cardsLink[index]).toHaveProperty('href', `http://localhost/meals/${idMeal}`);
      expect(screen.getByText(strMeal)).toBeInTheDocument();
      expect(screen.getByAltText(strMeal)).toHaveProperty('src', strMealThumb);
    });
  });

  test('Verifica se ao clicar em uma receita o usuário é redirecionado para a página de detalhes desta mesma receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce({ meals: [mockedMeals[1]] })
        .mockResolvedValueOnce(drinks),
    });

    const { history } = renderWithRouterAndRedux(<App />, undefined, '/meals');
    const targetMealNumber = 1;
    const secondMealRecipe = await screen.findByTestId(`${targetMealNumber}-recipe-card`);
    const { idMeal: secondMealId } = mockedMeals[targetMealNumber];

    userEvent.click(secondMealRecipe);
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe(`/meals/${secondMealId}`);
    });
  });

  test('Verifica se ao carregar a página todos cards de categoria de comida são renderizados com suas respectivas informações', async () => {
    renderWithRouterAndRedux(<App />, undefined, '/meals');
    const TOTAL_FILTERS = 1 + MAX_CATEGORIES_QUANTITY;
    await waitFor(() => {
      const recipeCards = screen.getAllByTestId(/^.*-category-filter$/i);
      expect(recipeCards).toHaveLength(TOTAL_FILTERS);
    });

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    mockedMealsCategories
      .slice(0, MAX_CATEGORIES_QUANTITY)
      .forEach(({ strCategory }) => {
        expect(screen.getByRole('button', { name: strCategory })).toBeInTheDocument();
      });
  });

  test('Verifica se ao clicar em uma categoria muda as informações na página para a comida desta respectiva categoria', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(breakfastMeals),
    });

    const { store } = renderWithRouterAndRedux(<App />, undefined, '/meals');

    const breakfastFilterButton = await screen.findByRole('button', { name: 'Breakfast' });
    expect(breakfastFilterButton).toBeInTheDocument();

    const { mealReducer: { meals: prevMealsInStore } } = store.getState();
    expect(prevMealsInStore).toStrictEqual(mockedMeals.slice(0, MAX_RECIPES_QUANTITY));

    userEvent.click(breakfastFilterButton);

    await waitFor(() => {
      const { mealReducer: { meals: mealsInStore } } = store.getState();
      expect(mealsInStore).toStrictEqual(mockedBreakfastMeals);
    });
  });

  test('Verifica se ao clicar em uma categoria de comida duas vezes volta a exibir as comidas iniciais', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(breakfastMeals)
        .mockResolvedValueOnce(meals),
    });

    const { store } = renderWithRouterAndRedux(<App />, undefined, '/meals');

    const breakfastFilterButton = await screen.findByRole('button', { name: 'Breakfast' });

    userEvent.click(breakfastFilterButton);

    await waitFor(() => {
      const { mealReducer: { meals: mealsInStore } } = store.getState();
      expect(mealsInStore).toStrictEqual(mockedBreakfastMeals);
    });

    userEvent.click(breakfastFilterButton);

    await waitFor(() => {
      const { mealReducer: { meals: mealsInStore } } = store.getState();
      expect(mealsInStore).toStrictEqual(mockedMeals.slice(0, MAX_RECIPES_QUANTITY));
    });
  });
});
