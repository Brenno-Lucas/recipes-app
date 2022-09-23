import React from 'react';

export default function Login() {
  return (
    <main>
      <form>
        <input type="text" data-testid="email-input" />
        <input type="password" data-testid="password-input" />
        <button type="button" data-testid="login-submit-btn">Enter</button>
      </form>
    </main>
  );
}
