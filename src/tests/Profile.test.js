import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Profile', () => {
  it('testando botao favorite', () => {
    const { history } = renderWithRouterAndRedux(<Profile />, undefined, '/profile');

    const FavoriteButton = screen.getByTestId('profile-favorite-btn');
    expect(FavoriteButton).toBeInTheDocument();

    userEvent.click(FavoriteButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('testando botao done', () => {
    const { history } = renderWithRouterAndRedux(<Profile />, undefined, '/profile');

    const DoneButton = screen.getByTestId('profile-done-btn');
    expect(DoneButton).toBeInTheDocument();

    userEvent.click(DoneButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('testando botao logout', () => {
    const { history } = renderWithRouterAndRedux(<Profile />, undefined, '/profile');

    const LogoutButton = screen.getByTestId('profile-logout-btn');
    expect(LogoutButton).toBeInTheDocument();

    userEvent.click(LogoutButton);
    expect(history.location.pathname).toBe('/');
  });

  it('testando o email', () => {
    const UserEmail = {
      email: 'teste@teste.com',
    };
    localStorage.setItem('user', JSON.stringify(UserEmail));
    const { history } = renderWithRouterAndRedux(<Profile />, undefined, '/profile');

    const email = screen.getByTestId('profile-email');
    expect(email).toHaveTextContent('teste@teste.com');

    const logout = screen.getByTestId('profile-logout-btn');

    userEvent.click(logout);

    expect(history.location.pathname).toBe('/');
  });
});
//