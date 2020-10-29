import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classnames from 'classnames/bind'
import styles from './style.module.scss';

const cx = classnames.bind(styles)

const propTypes = {
  className: PropTypes.string,
};

function DemoEffect({ className }) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { hits },
      } = await axios(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      setData(hits);
    };
    fetchData();
  }, [query]);

  return (
    <div className={cx('demo', className)}>
      <input
        value={query}
        placeholder='search'
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      {data.map((item) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </div>
  );
}

DemoEffect.propTypes = propTypes;

export default DemoEffect;
