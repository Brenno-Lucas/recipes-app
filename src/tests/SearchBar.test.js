import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const SEARCH_ICON = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const NAME_SEARCH = 'name-search-radio';
const FIRST_LETTER_SEARCH_INPUT = 'first-letter-search-radio';
const INGREDIENT_SEARCH_INPUT = 'ingredient-search-radio';
const SEARCH_BTN = 'exec-search-btn';

describe('Testa a SearchBar', () => {
  it('Testa os elementos presentes na página', () => {
    renderWithRouterAndRedux(<Recipes />, undefined, '/meals');
    const searchIcon = screen.getByTestId(SEARCH_ICON);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameSearchInput = screen.getByTestId(NAME_SEARCH);
    const firstLetterSerchInput = screen.getByTestId(FIRST_LETTER_SEARCH_INPUT);
    const ingredientSerchInput = screen.getByTestId(INGREDIENT_SEARCH_INPUT);
    const searchBTN = screen.getByTestId(SEARCH_BTN);

    expect(searchInput).toBeInTheDocument();
    expect(nameSearchInput).toBeInTheDocument();
    expect(ingredientSerchInput).toBeInTheDocument();
    expect(firstLetterSerchInput).toBeInTheDocument();
    expect(searchBTN).toBeInTheDocument();

    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(nameSearchInput);

    expect(searchInput).toHaveValue('Arrabiata');
    expect(nameSearchInput).toBeChecked();
  });

  it('Testa se quando filtrado apenas uma refeição, a página é redireciona para sua respectiva págian de detalhes', async () => {
    const { history } = renderWithRouterAndRedux(<Recipes />, undefined, '/meals');
    const searchIcon = screen.getByTestId(SEARCH_ICON);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameSearch = screen.getByTestId(NAME_SEARCH);
    const searchBTN = screen.getByTestId(SEARCH_BTN);

    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(nameSearch);
    userEvent.click(searchBTN);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771');
    });
  });

  it('Testa se quando filtrado apenas uma bebida, a página é redireciona para sua respectiva págian de detalhes', async () => {
    const { history } = renderWithRouterAndRedux(<Recipes />, undefined, '/drinks');
    const searchIcon = screen.getByTestId(SEARCH_ICON);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameSearch = screen.getByTestId(NAME_SEARCH);
    const searchBTN = screen.getByTestId(SEARCH_BTN);

    userEvent.type(searchInput, 'a1');
    userEvent.click(nameSearch);
    userEvent.click(searchBTN);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/17222');
    });
  });

  it('Testa se o alerta é exibido quando é ultrapassado o limite da pesquisa por um caractere', async () => {
    global.alert = jest.fn();
    renderWithRouterAndRedux(<Recipes />, undefined, '/meals');

    const searchIcon = screen.getByTestId(SEARCH_ICON);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const firstLetterSerchInput = screen.getByTestId(FIRST_LETTER_SEARCH_INPUT);
    const searchBtn = screen.getByTestId(SEARCH_BTN);

    userEvent.type(searchInput, 'xablau');
    userEvent.click(firstLetterSerchInput);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(alert).toHaveBeenCalled();
    });
    expect(alert).toBeCalledWith('Your search must have only 1 (one) character');
  });

  it('Testa se é exibido alerta quando nada é digitado quando realizada a pesquisa(FirstLetter)', async () => {
    global.alert = jest.fn();
    renderWithRouterAndRedux(<Recipes />, undefined, '/meals');

    const searchIcon = screen.getByTestId(SEARCH_ICON);
    userEvent.click(searchIcon);

    const firstLetterSerchInput = screen.getByTestId(FIRST_LETTER_SEARCH_INPUT);
    const searchBtn = screen.getByTestId(SEARCH_BTN);

    userEvent.click(firstLetterSerchInput);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(alert).toHaveBeenCalled();
    });
    expect(alert).toBeCalledWith('Unexpected end of JSON input');
  });

  it('Testa se é exibido alerta quando nada é digitado quando realizada a pesquisa(Ingredients)', async () => {
    global.alert = jest.fn();
    renderWithRouterAndRedux(<Recipes />, undefined, '/meals');

    const searchIcon = screen.getByTestId(SEARCH_ICON);
    userEvent.click(searchIcon);

    const ingredientSerchInput = screen.getByTestId(INGREDIENT_SEARCH_INPUT);
    const searchBtn = screen.getByTestId(SEARCH_BTN);

    userEvent.click(ingredientSerchInput);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(alert).toHaveBeenCalled();
    });
    expect(alert).toBeCalledWith('Unexpected end of JSON input');
  });
  it('Testa se é exibido alerta que a pesquisa não encontrou resultados', async () => {
    global.alert = jest.fn();
    renderWithRouterAndRedux(<Recipes />, undefined, '/drinks');

    const searchIcon = screen.getByTestId(SEARCH_ICON);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientSerchInput = screen.getByTestId(INGREDIENT_SEARCH_INPUT);
    const searchBtn = screen.getByTestId(SEARCH_BTN);

    userEvent.type(searchInput, 'xablau');
    userEvent.click(ingredientSerchInput);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(alert).toHaveBeenCalled();
    });
    expect(alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });
});
