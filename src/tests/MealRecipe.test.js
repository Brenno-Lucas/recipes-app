import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import meals from './mocks/meals';
import drinks from '../../cypress/mocks/drinks';

describe('Tela de receita de comidas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(meals),
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  const RECIPE_PHOTO = 'recipe-photo';
  const RECIPE_TITLE = 'recipe-title';
  const RECIPE_CATEGORY = 'recipe-category';
  const RECIPE_INSTRUCTIONS = 'instructions';
  const RECIPE_VIDEO = 'video';
  const ROUTE = '/meals/52971';

  test('verifica se a requisição é feita para a API de meals', () => {
    renderWithRouterAndRedux(<App />, undefined, ROUTE);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52971');
  });

  test('verifica se a tela de meals possui os elementos necessários', () => {
    renderWithRouterAndRedux(<App />, undefined, ROUTE);

    expect(screen.getByTestId(RECIPE_PHOTO)).toBeInTheDocument();
    expect(screen.getByTestId(RECIPE_TITLE)).toBeInTheDocument();
    expect(screen.getByTestId(RECIPE_CATEGORY)).toBeInTheDocument();
    expect(screen.getByTestId(RECIPE_INSTRUCTIONS)).toBeInTheDocument();
    expect(screen.getByTestId(RECIPE_VIDEO)).toBeInTheDocument();
  });

  test('verifica se a requisição é feita para a API de drinks', () => {
    renderWithRouterAndRedux(<App />, undefined, ROUTE);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });

  test('verifica se a 6 cards de sugestão na tela', async () => {
    renderWithRouterAndRedux(<App />, undefined, ROUTE);
    await waitFor(() => {
      for (let index = 0; index < 6; index += 1) {
        expect(screen.getByTestId(`${index}-recommendation-title`)).toBeInTheDocument();
      }
    });
  });

  test('verifica se o botão "Start Recipe" aparece na tela', async () => {
    renderWithRouterAndRedux(<App />, undefined, ROUTE);
    expect(screen.getByRole('button', { name: /start recipe/i })).toBeInTheDocument();
  });

  test('verifica se ao clicar no botão a rota muda para "/meals/52971/in-progress"', async () => {
    const { history } = renderWithRouterAndRedux(<App />, undefined, ROUTE);
    const RECIPE_BUTTON = screen.getByRole('button', { name: /start recipe/i });

    expect(RECIPE_BUTTON).toBeInTheDocument();
    userEvent.click(RECIPE_BUTTON);
    expect(history.location.pathname).toBe('/meals/52971/in-progress');
  });
});
