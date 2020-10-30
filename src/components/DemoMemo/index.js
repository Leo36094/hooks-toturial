import React, { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './style.module.scss';

const cx = classnames.bind(styles);

function CandyDispenser() {
  const initialCandies = ['snicker', 'skittles', 'twix', 'milky way'];
  // const initialCandies = useMemo(() => ['snicker', 'skittles', 'twix', 'milky way'] ,[])
  const [candies, setCandies] = useState(initialCandies);

  const dispense = (candy) => {
    setCandies((allCandies) => allCandies.filter((c) => c !== candy));
  };

  // const dispense = React.useCallback(candy => {
  //   setCandies(allCandies => allCandies.filter(c => c !== candy))
  // }, [])

  return (
    <div>
      <h1>Candy Dispenser</h1>
      <div>Available Candy</div>
      {candies.length === 0 ? (
        <button onClick={() => setCandies(initialCandies)}>Refill</button>
      ) : (
        <ul>
          {candies.map((candy) => (
            <li key={candy}>
              <button className={cx('button')} onClick={() => dispense(candy)}>
                grab
              </button>
              {candy}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CandyDispenser;
