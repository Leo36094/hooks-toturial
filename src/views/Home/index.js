import React, { useReducer } from 'react';
import classnames from 'classnames/bind';
import styles from './style.module.scss';
import { login } from '../../utlis';

// components
import DemoEffect from '../../components/DemoEffect';
import DemoMemo from '../../components/DemoMemo';

const cx = classnames.bind(styles);

const initialState = {
  nickName: '',
  username: '',
  password: '',
  isLoading: false,
  errorMsg: '',
  isLoggedin: false,
};

const reducer = (state, action) => {
  const { error, field, value } = action;

  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'success':
      return {
        ...state,
        username: '',
        password: '',
        errorMsg: '',
        isLoggedin: true,
        isLoading: false,
      };
    case 'fail':
      return {
        ...state,
        errorMsg: error,
        isLoading: false,
      };
    case 'field':
      return {
        ...state,
        errorMsg: '',
        [field]: value,
      };
    case 'logout':
      return {
        ...state,
        isLoggedin: false,
      };
    default:
      return state;
  }
};

function Home(props) {
  const [loginState, dispatch] = useReducer(reducer, initialState);

  const {
    username,
    password,
    isLoading,
    errorMsg,
    isLoggedin,
  } = loginState;

  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: 'loading' });
    try {
      await login({ username, password });
      dispatch({ type: 'success' });
    } catch (error) {
      dispatch({
        type: 'fail',
        error: 'Incorrect Username or Password',
      });
    }
  };

  return (
    <div className={cx('login')}>
      <DemoEffect />
      <DemoMemo />
      <div className={cx('login-container')}>
        {isLoggedin ? (
          <>
            <p>Hello {username}</p>
            <button onClick={() => dispatch({ type: 'logout' })}>
              logout
            </button>
          </>
        ) : (
          <form className={cx('login-form')} onSubmit={onSubmit}>
            <p className={cx('error')}>{errorMsg && errorMsg}</p>
            <h1 className="login-item">Please Log in</h1>
            <input
              className="login-item login-account"
              placeholder="username"
              value={username}
              onChange={(event) =>
                dispatch({
                  type: 'field',
                  field: 'username',
                  value: event.target.value,
                })
              }
            />
            <input
              className="login-item login-password"
              placeholder="password"
              value={password}
              onChange={(event) =>
                dispatch({
                  type: 'field',
                  field: 'password',
                  value: event.target.value,
                })
              }
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

export default Home;


/**
 * 
 * 根據行為整理 feature
 * 過多的 state 散落在各地，會影響維護體驗
 * 
 */
