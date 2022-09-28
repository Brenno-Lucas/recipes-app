import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const LOGIN_EMAIL_INPUT = 'email-input';
const LOGIN_PASSWORD_INPUT = 'password-input';
const LOGIN_BUTTON = 'login-submit-btn';

const VALID_EMAIL = 'test@test.com';
const INVALID_EMAIL = 'test@';
const VALID_PASSWORD = '1234567';
const INVALID_PASSWORD = '123';

describe('Tela de login', () => {
  test('verifica se os inputs e botão estão na tela', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId(LOGIN_EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_PASSWORD_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_BUTTON)).toBeInTheDocument();
  });

  test('verifica se ao digitar um email ou uma senha invalida o botão permanece desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = (screen.getByTestId(LOGIN_EMAIL_INPUT));
    const passwordInput = (screen.getByTestId(LOGIN_PASSWORD_INPUT));
    const button = (screen.getByTestId(LOGIN_BUTTON));

    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(button).toBeDisabled();
  });

  test('verifica se ao digitar um email e uma senha valida o botão é habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = (screen.getByTestId(LOGIN_EMAIL_INPUT));
    const passwordInput = (screen.getByTestId(LOGIN_PASSWORD_INPUT));
    const button = (screen.getByTestId(LOGIN_BUTTON));

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);

    expect(button).toBeEnabled();
  });

  test('verifica se ao fazer login a rota muda para "/meals"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = (screen.getByTestId(LOGIN_EMAIL_INPUT));
    const passwordInput = (screen.getByTestId(LOGIN_PASSWORD_INPUT));
    const button = (screen.getByTestId(LOGIN_BUTTON));

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(button);

    expect(history.location.pathname).toBe('/meals');
  });
});
