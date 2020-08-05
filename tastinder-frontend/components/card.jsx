import React, { useState } from 'react';

import styles from '../styles/card.module.scss';

const Card = (props) => {
  const [startPos, setStartPos] = useState(0);
  const [currPos, setCurrPos] = useState(0);
  const [deltaPos, setDeltaPos] = useState(0);

  const touchStart = (event) => {
    // console.log('Touched Start!');
    // console.log(event.targetTouches[0]);
    setStartPos(event.targetTouches[0].clientX);
    setCurrPos(event.targetTouches[0].clientX);
  };

  const touchMove = (event) => {
    // console.log('Touch Move!');
    // console.log(event.targetTouches[0]);

    setCurrPos(event.targetTouches[0].clientX);
    setDeltaPos(event.targetTouches[0].clientX - startPos);
    // setCurrPos(event.targetTouches[0].clientX);
  };

  const touchEnd = () => {
    console.log(deltaPos);
    // if started from right
    if (startPos >= props.width / 2) {
      if (currPos < props.width / 2 && deltaPos <= -props.width / 5) {
        console.log('Dislike!');
      } else if (deltaPos > props.width / 5) {
        console.log('Like!');
      } else {
        console.log('Reset!');
      }
    } else {
      if (currPos > props.width / 2 && deltaPos > props.width / 5) {
        console.log('Like!');
      } else if (deltaPos < -props.width / 5) {
        console.log('Dislike!');
      } else {
        console.log('Reset!');
      }
    }

    // if started from left

    setStartPos(0);
    setCurrPos(0);
    setDeltaPos(0);
  };

  return (
    <div
      style={{ left: deltaPos + 'px' }}
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
      className={`${styles.cardContainer} turquoise`}
    >
      <div className={styles.quitButton}>
        <button>&lt; Back</button>
      </div>
      <div className={styles.sessionId}>
        Room
        <br />
        {props.sessionId}
      </div>
    </div>
  );
};

export default Card;
