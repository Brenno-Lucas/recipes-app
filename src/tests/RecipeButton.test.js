import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import meals from './mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import { doneRecipes, inProgressRecipes } from './mocks/localStorageMock';

describe('Tela de receita de bebidas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks),
    });
  });

  const RECIPE_BUTTON = 'start-recipe-btn';
  const ROUTE = '/drinks/53060';

  test('verifica se o botão não aparece caso a receita já tiver sido feita,', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    renderWithRouterAndRedux(<App />, undefined, ROUTE);

    await waitFor(() => {
      const recipeButton = screen.queryByTestId(RECIPE_BUTTON);
      expect(recipeButton).toBeNull();
    });
  });

  test('verifica se a botão aparece como em progresso caso a receita estiver em progresso,', async () => {
    localStorage.clear('doneRecipes');
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    renderWithRouterAndRedux(<App />, undefined, ROUTE);
    await waitFor(() => {
      const recipeButton = screen.getByText('Continue Recipe');
      expect(recipeButton).toBeInTheDocument();
    });
  });
});
