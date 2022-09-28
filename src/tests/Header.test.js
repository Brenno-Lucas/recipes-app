import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import DoneRecipes from '../pages/DoneRecipes';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa o Header', () => {
  it('Testa se o search-input aparece/some quando clicado.', () => {
    renderWithRouterAndRedux(<Recipes />, undefined, '/meals');
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(screen.queryByTestId('search-input')).toBeNull();
  });
  it('Testa se o Título do Header é exibido na página DoneRecipes', () => {
    renderWithRouterAndRedux(<DoneRecipes />, undefined, '/done-recipes');
    expect(screen.getByText(/Done Recipes/i)).toBeInTheDocument();
  });
});
