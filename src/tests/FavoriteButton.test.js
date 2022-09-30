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
        .mockResolvedValueOnce(drinks),
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  const FAV_BUTTON = 'favorite-btn';
  const ROUTE = '/meals/52971';
  const FAVORITES_ROUTE = '/favorite-recipes';

  test('verifica se ao favoritar uma receita, ela é adicionada as receitas favoritas', async () => {
    const { history } = renderWithRouterAndRedux(<App />, undefined, ROUTE);
    await waitFor(() => {
      const favoriteButton = screen.getByTestId(FAV_BUTTON);
      const recipeName = screen.getByText('Corba');

      expect(favoriteButton).toBeInTheDocument();
      expect(recipeName).toBeInTheDocument();
      userEvent.click(favoriteButton);

      history.push(FAVORITES_ROUTE);
      expect(history.location.pathname).toBe(FAVORITES_ROUTE);
      expect(recipeName).toBeInTheDocument();
    });
  });

  test('verifica se ao "desfavoritar" uma receita, ela é removida das receitas favoritas', async () => {
    renderWithRouterAndRedux(<App />, undefined, ROUTE);
    await waitFor(async () => {
      const favoriteButton = screen.getByTestId(FAV_BUTTON);
      const recipeName = screen.queryByText('Corba');

      expect(favoriteButton).toBeInTheDocument();
      expect(recipeName).toBeInTheDocument();
      userEvent.click(favoriteButton);
      userEvent.click(favoriteButton);
    });
  });
});
