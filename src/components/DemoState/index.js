import React from 'react';
import classnames from 'classnames/bind';
import { login } from '../../utlis';

import styles from './style.module.scss';

const cx = classnames.bind(styles);

/**
 * 1. username
 * 2. password
 * 3. loading status
 * 4. error message
 *
 */

function DemoState() {
  const onSubmit = async () => {};

  return (
    <div className={cx('login')}>
      <div className={cx('login-container')}>
        <form className={cx('login-form')} onSubmit={onSubmit}>
          {/* <p className={cx('error')}>{errMsg && errMsg}</p> */}
          <h1 className={cx('login-item')}>Please Log in</h1>
          <input
            className={cx('login-input')}
            placeholder="username"
          />
          <input
            className={cx('login-input')}
            placeholder="password"
          />
          <button className={cx('login-button')} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default DemoState;
