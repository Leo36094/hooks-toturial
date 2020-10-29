import React, { useState } from 'react';
import '../App.scss';
import { login } from '@/utils';

function DemoState() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await login({ username, password });
      setIsLoading(false);
      setIsLogin(true);

    } catch (error) {
      setIsLoading(false);
      setErrorMsg(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        {isLogin ? (
          <>
            <p>Hello {username}</p>
            <button onClick={onSubmit}>logout</button>
          </>
        ) : (
          <form className="login-form" onSubmit={onSubmit}>
            <p className="error">{errorMsg && errorMsg}</p>
            <h1 className="login-item">Please Log in</h1>
            <input
              className="login-item login-account"
              autoComplete='username'
              placeholder="username"
              value={username}
              onChange={(event) => {
                setUserName(event.currentTarget.value);
              }}
            />
            <input
              className="login-item login-password"
              autoComplete='currentPassword'
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
            />
            <button
              className="login-button"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? 'Login ....' : 'Login'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default DemoState;

