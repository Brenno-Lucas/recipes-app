import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginInfo;
  const history = useHistory();

  useEffect(() => {
    const validateEmail = () => {
      const validation = /^[\w.]+@[\w.]+\.[a-z]{2,3}(\.[a-z]{2})?$/i.test(email);
      setIsEmailValid(validation);
    };
    validateEmail();

    const validatePassword = () => {
      const MINIMUM_PASSWORD_LENGTH = 7;
      const validation = password.length >= MINIMUM_PASSWORD_LENGTH;
      setIsPasswordValid(validation);
    };
    validatePassword();

    const checkLoginValidations = () => {
      const validation = (isEmailValid && isPasswordValid);
      setIsButtonDisabled(!validation);
    };
    checkLoginValidations();
  }, [email, password, isEmailValid, isPasswordValid]);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setLoginInfo((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('apertei');
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
    history.push('/meals');
  };

  return (
    <main>
      <form onSubmit={ (e) => handleSubmit(e) }>
        <input
          type="text"
          name="email"
          value={ loginInfo.email }
          data-testid="email-input"
          onChange={ handleChange }
        />

        <input
          type="password"
          name="password"
          value={ loginInfo.password }
          data-testid="password-input"
          onChange={ handleChange }
        />

        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ isButtonDisabled }
        >
          Enter
        </button>
      </form>
    </main>
  );
}
