import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import meals from './mocks/meals';
import drinks from './mocks/drinks';
import RecipeDetails from '../pages/RecipeDetails';
import App from '../App';

describe('Tela de receitas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(meals),
    });
  });

  test('verifica se a requisição é feita para a API de meals', () => {
    renderWithRouterAndRedux(<RecipeDetails />, undefined, '/meals/52971');
    expect(fetch).toHaveBeenCalled();
  });
});
