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

  const SHARE_BUTTON = 'share-btn';
  const ROUTE = '/meals/52971';

  jest.setTimeout(30000);
  test('verifica se clicar no botão de compartilhar o link é copiado', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouterAndRedux(<App />, undefined, ROUTE);
    const shareButton = screen.getByTestId(SHARE_BUTTON);

    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);

    const linkCopiedMessage = screen.getByText('Link copied!');
    expect(linkCopiedMessage).toBeInTheDocument();

    await waitFor(() => {
      expect(linkCopiedMessage).not.toBeInTheDocument();
    }, { timeout: 10000 });
  });
});
