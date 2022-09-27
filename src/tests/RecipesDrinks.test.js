import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import { MAX_CATEGORIES_QUANTITY, MAX_RECIPES_QUANTITY } from '../utils/constants';

const { drinks: mockedDrinks } = drinks;
const { drinks: mockedDrinksCategories } = drinkCategories;
const { drinks: mockedCocoaDrinks } = cocoaDrinks;

describe('Tela de receitas pela rota "/drinks"', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks),
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('Verifica se ao carregar a página recupera as categorias de drinks, as comidas e as bebidas', async () => {
    renderWithRouterAndRedux(<App />, undefined, '/drinks');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));
  });

  test('Verifica se ao carregar a página todos cards de drink são renderizados com suas respectivas informações', async () => {
    const { store } = renderWithRouterAndRedux(<App />, undefined, '/drinks');

    const recipeCards = await screen.findAllByTestId(/^[0-9]*-recipe-card$/i);
    expect(recipeCards).toHaveLength(MAX_RECIPES_QUANTITY);

    const { drinkReducer: { drinks: drinksInStore } } = store.getState();
    drinksInStore.forEach(({ idDrink, strDrink, strDrinkThumb }, index) => {
      const cardsLink = screen.getAllByRole('link');

      expect(cardsLink[index]).toHaveProperty('href', `http://localhost/drinks/${idDrink}`);
      expect(screen.getByText(strDrink)).toBeInTheDocument();
      expect(screen.getByAltText(strDrink)).toHaveProperty('src', strDrinkThumb);
    });
  });

  test('Verifica se ao clicar em uma receita o usuário é redirecionado para a página de detalhes desta mesma receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce({ drinks: [mockedDrinks[1]] })
        .mockResolvedValueOnce(meals),
    });

    const { history } = renderWithRouterAndRedux(<App />, undefined, '/drinks');
    const targetDrinkNumber = 1;
    const secondDrinkRecipe = await screen
      .findByTestId(`${targetDrinkNumber}-recipe-card`);
    const { idDrink: secondDrinkId } = mockedDrinks[targetDrinkNumber];

    userEvent.click(secondDrinkRecipe);
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe(`/drinks/${secondDrinkId}`);
    });
  });

  test('Verifica se ao carregar a página todos cards de categoria de comida são renderizados com suas respectivas informações', async () => {
    renderWithRouterAndRedux(<App />, undefined, '/drinks');
    const TOTAL_FILTERS = 1 + MAX_CATEGORIES_QUANTITY;
    await waitFor(() => {
      const recipeCards = screen.getAllByTestId(/^.*-category-filter$/i);
      expect(recipeCards).toHaveLength(TOTAL_FILTERS);
    });

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    mockedDrinksCategories
      .slice(0, MAX_CATEGORIES_QUANTITY)
      .forEach(({ strCategory }) => {
        expect(screen.getByRole('button', { name: strCategory })).toBeInTheDocument();
      });
  });

  test('Verifica se ao clicar em uma categoria muda as informações na página para a comida desta respectiva categoria', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(cocoaDrinks),
    });

    const { store } = renderWithRouterAndRedux(<App />, undefined, '/drinks');

    const cocoaFilterButton = await screen.findByRole('button', { name: 'Cocoa' });
    expect(cocoaFilterButton).toBeInTheDocument();

    const { drinkReducer: { drinks: prevDrinksInStore } } = store.getState();
    expect(prevDrinksInStore).toStrictEqual(mockedDrinks.slice(0, MAX_RECIPES_QUANTITY));

    userEvent.click(cocoaFilterButton);

    await waitFor(() => {
      const { drinkReducer: { drinks: drinksInStore } } = store.getState();
      expect(drinksInStore).toStrictEqual(mockedCocoaDrinks);
    });
  });

  test('Verifica se ao clicar em uma categoria de comida duas vezes volta a exibir as comidas iniciais', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(cocoaDrinks)
        .mockResolvedValueOnce(drinks),
    });

    const { store } = renderWithRouterAndRedux(<App />, undefined, '/drinks');

    const cocoaFilterButton = await screen.findByRole('button', { name: 'Cocoa' });

    userEvent.click(cocoaFilterButton);

    await waitFor(() => {
      const { drinkReducer: { drinks: drinksInStore } } = store.getState();
      expect(drinksInStore).toStrictEqual(mockedCocoaDrinks);
    });

    userEvent.click(cocoaFilterButton);

    await waitFor(() => {
      const { drinkReducer: { drinks: drinksInStore } } = store.getState();
      expect(drinksInStore).toStrictEqual(mockedDrinks.slice(0, MAX_RECIPES_QUANTITY));
    });
  });
});
