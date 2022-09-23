import React, { useState, useEffect } from 'react';

export default function Login() {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const validateEmail = () => {
      const { email } = loginInfo;
      const validation = /^[\w.]+@[\w.]+\.[a-z]{2,3}(\.[a-z]{2})?$/i.test(email);
      setIsEmailValid(validation);
    };
    validateEmail();

    const validatePassword = () => {
      const { password } = loginInfo;
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
  }, [loginInfo, isEmailValid, isPasswordValid]);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setLoginInfo((state) => ({
      ...state,
      [name]: value,
    }));
  };

  return (
    <main>
      <form>
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
          type="button"
          data-testid="login-submit-btn"
          disabled={ isButtonDisabled }
        >
          Enter
        </button>
      </form>
    </main>
  );
}
