import React, {  useReducer } from 'react'
import './App.scss'
import { login } from './utlis'

// 考慮的不再只是 state ，而是使用者行為

const initialState = {
  username: '',
  password: '',
  isLoading: false,
  errorMsg: '',
  isLogin: false,
}

const reducer = (state, action) => {
  const { error, field, value } = action

  switch (action.type) {
    case 'logining':
      return {
        ...state,
        isLoading: true,
      }
    case 'success':
      return {
        ...state,
        username: '',
        password: '',
        isLogin: true,
        isLoading: false,
        errorMsg: '',
      }
    case 'fail':
      return {
        ...state,
        errorMsg: error,
        isLoading: false,
      }
    case 'field':
      return {
        ...state,
        errorMsg: '',
        [field]: value,
      }
    default:
      return state
  }
}

function App() {
  const [loginState, dispatch] = useReducer(reducer, initialState)
  const { username, password, isLoading, errorMsg, isLogin } = loginState

  const onSubmit = async event => {
    event.preventDefault()
    dispatch({ type: 'logining' })
    try {
      await login({ username, password })
      dispatch({ type: 'success' })
    } catch (error) {
      dispatch({ type: 'fail', error: 'Incorrect Username or Password' })
      // handle error
    }
  }
  return (
    <div className='login'>
      <div className='login-container'>
        {isLogin ? (
          <>
            <p>Hello {username}</p>
            <button onClick={onSubmit}>logout</button>
          </>
        ) : (
          <form className='login-form' onSubmit={onSubmit}>
            <p className='error'>{errorMsg && errorMsg}</p>
            <h1 className='login-item'>Please Log in</h1>
            <input
              name='username'
              className='login-item login-account'
              type='text'
              autoComplete='username'
              placeholder='username'
              value={username}
              onChange={event =>
                dispatch({
                  type: 'field',
                  field: 'username',
                  value: event.target.value,
                })
              }
            />
            <input
              className='login-item login-password'
              type='password'
              autoComplete='new-password'
              placeholder='password'
              value={password}
              onChange={event =>
                dispatch({
                  type: 'field',
                  field: 'password',
                  value: event.target.value,
                })
              }
            />
            <button className='login-button' disabled={isLoading} type='submit'>
              {isLoading ? 'Login ....' : 'Login'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default App

/**
 * 當你在使用 useState 時，可能是為了考慮某 feature 去控制 a 的 true 或 false
 * 但 User 並不在乎這背後我們處理那些事情，他們也不會知道什麼 true / false
 * 他們唯一知道就是 login / logout，他們不在乎什麼 state ，該 care 的是我們
 *
 * 當你在使用 useState，有時候常常就會被侷限在 單一 state 的思維 ，變成被侷限在單一資料的改變
 * 並非真的思考 user 會試著在 app 操作哪些行為
 */
