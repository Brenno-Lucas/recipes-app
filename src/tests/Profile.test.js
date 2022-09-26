import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Profile from '../pages/Profile';

describe('Profile', () => {
    it('testando a tela de Perfil',() => {
        const {debug} = renderWithRouterAndRedux(<Profile/>);
        debug()
    });

    it('testando botao favorite',() => {
        const {history} = renderWithRouterAndRedux(<Profile />);

        const FavoriteButton = screen.getByTestId('profile-favorite-btn');
        expect(FavoriteButton).toBeInTheDocument();

        userEvent.click(FavoriteButton);
        expect(history.location.pathname).toBe('/favorite-recipes');
    });

    it('testando botao done',() => {
        const {history} = renderWithRouterAndRedux(<Profile />);

        const DoneButton = screen.getByTestId('profile-done-btn');
        expect(DoneButton).toBeInTheDocument();

        userEvent.click(DoneButton);
        expect(history.location.pathname).toBe('/done-recipes');
    });

    it('testando botao logout',() => {
        const {history} = renderWithRouterAndRedux(<Profile />);

        const LogoutButton = screen.getByTestId('profile-logout-btn');
        expect(LogoutButton).toBeInTheDocument();

        userEvent.click(LogoutButton);
        expect(history.location.pathname).toBe('/');
    });
    
    it ('testando o email',() => {
        localStorage.setItem('user', JSON.stringify('teste@teste.com'));
        const {history} = renderWithRouterAndRedux(<Profile />);

        const email = screen.getByTestId('profile-email');
        expect(email).toHaveTextContent('teste@teste.com')
    })
})
