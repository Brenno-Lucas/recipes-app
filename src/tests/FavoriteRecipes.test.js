import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { favoriteRecipes } from './mocks/localStorageMock';

describe('Tela de receita favoritas', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  afterEach(() => {
    localStorage.clear('favoriteRecipes');
  });

  const ALL_BUTTON = 'filter-by-all-btn';
  const MEAL_BUTTON = 'filter-by-meal-btn';
  const DRINK_BUTTON = 'filter-by-drink-btn';
  const CARD_IMAGE = '-horizontal-image';
  const CARD_TOP_TEXT = '-horizontal-top-text';
  const CARD_NAME = '-horizontal-name';
  const CARD_SHARE_BUTTON = '-horizontal-share-btn';
  const CARD_FAVORITE_BUTTON = '-horizontal-favorite-btn';

  const ROUTE = '/favorite-recipes';

  test('verifica se os elementos necessários estão na tela', () => {
    renderWithRouterAndRedux(<App />, undefined, ROUTE);
    expect(screen.getByTestId(ALL_BUTTON)).toBeInTheDocument();
    expect(screen.getByTestId(MEAL_BUTTON)).toBeInTheDocument();
    expect(screen.getByTestId(DRINK_BUTTON)).toBeInTheDocument();

    for (let index = 0; index < 4; index += 1) {
      expect(screen.getByTestId(`${index}${CARD_IMAGE}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_TOP_TEXT}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_NAME}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_SHARE_BUTTON}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_FAVORITE_BUTTON}`)).toBeInTheDocument();
    }
  });

  test('verifica se ao filtrar por comidas os elementos esperados estão na tela', () => {
    renderWithRouterAndRedux(<App />, undefined, ROUTE);
    const mealFilterButton = screen.getByTestId(MEAL_BUTTON);

    expect(mealFilterButton).toBeInTheDocument();
    userEvent.click(mealFilterButton);

    for (let index = 0; index < 2; index += 1) {
      expect(screen.getByTestId(`${index}${CARD_IMAGE}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_TOP_TEXT}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_NAME}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_SHARE_BUTTON}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_FAVORITE_BUTTON}`)).toBeInTheDocument();
    }
  });

  test('verifica se ao filtrar por bebidas os elementos esperados estão na tela', () => {
    renderWithRouterAndRedux(<App />, undefined, ROUTE);
    const drinkFilterButton = screen.getByTestId(DRINK_BUTTON);

    expect(drinkFilterButton).toBeInTheDocument();
    userEvent.click(drinkFilterButton);

    for (let index = 0; index < 2; index += 1) {
      expect(screen.getByTestId(`${index}${CARD_IMAGE}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_TOP_TEXT}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_NAME}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_SHARE_BUTTON}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_FAVORITE_BUTTON}`)).toBeInTheDocument();
    }
  });

  test('verifica se ao filtrar por bebidas e depois filtrar por todos os elementos esperados estão na tela', () => {
    renderWithRouterAndRedux(<App />, undefined, ROUTE);
    const drinkFilterButton = screen.getByTestId(DRINK_BUTTON);
    const allFilterButton = screen.getByTestId(ALL_BUTTON);

    expect(drinkFilterButton).toBeInTheDocument();
    userEvent.click(drinkFilterButton);
    expect(allFilterButton).toBeInTheDocument();
    userEvent.click(allFilterButton);

    for (let index = 0; index < 4; index += 1) {
      expect(screen.getByTestId(`${index}${CARD_IMAGE}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_TOP_TEXT}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_NAME}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_SHARE_BUTTON}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}${CARD_FAVORITE_BUTTON}`)).toBeInTheDocument();
    }
  });

  test('verifica se caso não houver receitas favoritadas a tela está vazia', () => {
    localStorage.clear('favoriteRecipes');

    renderWithRouterAndRedux(<App />, undefined, ROUTE);
    expect(screen.getByTestId(ALL_BUTTON)).toBeInTheDocument();
    expect(screen.getByTestId(MEAL_BUTTON)).toBeInTheDocument();
    expect(screen.getByTestId(DRINK_BUTTON)).toBeInTheDocument();

    for (let index = 0; index < 4; index += 1) {
      expect(screen.queryByTestId(`${index}${CARD_IMAGE}`)).toBeNull();
      expect(screen.queryByTestId(`${index}${CARD_TOP_TEXT}`)).toBeNull();
      expect(screen.queryByTestId(`${index}${CARD_NAME}`)).toBeNull();
      expect(screen.queryByTestId(`${index}${CARD_SHARE_BUTTON}`)).toBeNull();
      expect(screen.queryByTestId(`${index}${CARD_FAVORITE_BUTTON}`)).toBeNull();
    }
  });

  test('verifica se ao "desfavoritar" uma receita ela some da tela', () => {
    renderWithRouterAndRedux(<App />, undefined, ROUTE);

    const FIRST_RECIPE = screen.getByTestId(`3${CARD_NAME}`);

    expect(FIRST_RECIPE).toBeInTheDocument();
    userEvent.click(screen.getByTestId(`3${CARD_FAVORITE_BUTTON}`));
    expect(FIRST_RECIPE).not.toBeInTheDocument();
  });
});
