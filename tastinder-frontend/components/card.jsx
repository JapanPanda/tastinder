import React, { useState } from 'react';

import styles from '../styles/card.module.scss';

const Card = (props) => {
  const [startPos, setStartPos] = useState(0);
  const [currPos, setCurrPos] = useState(0);
  const [deltaPos, setDeltaPos] = useState(0);

  const slideOriginRight = () => {
    setDeltaPos((deltaPos) => {
      if (Math.abs(deltaPos) > 4) {
        window.setTimeout(slideOriginRight, 10);
      } else {
        setDeltaPos(0);
      }
      return deltaPos + 4;
    });
  };

  const slideOutRight = () => {
    setDeltaPos((deltaPos) => {
      if (Math.abs(deltaPos) < props.width * 3) {
        window.setTimeout(slideOutRight, 5);
      } else {
      }
      return deltaPos + 15;
    });
  };

  const slideOriginLeft = () => {
    setDeltaPos((deltaPos) => {
      if (Math.abs(deltaPos) > 4) {
        window.setTimeout(slideOriginLeft, 10);
      } else {
        setDeltaPos(0);
      }
      return deltaPos - 4;
    });
  };

  const slideOutLeft = () => {
    setDeltaPos((deltaPos) => {
      console.log(props.width);
      if (Math.abs(deltaPos) < props.width * 3) {
        window.setTimeout(slideOutLeft, 5);
      } else {
      }
      return deltaPos - 15;
    });
  };

  const touchStart = (event) => {
    // console.log('Touched Start!');
    // console.log(event.targetTouches[0]);
    setStartPos(event.targetTouches[0].clientX);
    setCurrPos(event.targetTouches[0].clientX);
  };

  const touchMove = (event) => {
    // console.log('Touch Move!');
    // console.log(event.targetTouches[0]);
    // console.log(deltaPos);
    setCurrPos(event.targetTouches[0].clientX);
    setDeltaPos(event.targetTouches[0].clientX - startPos);
    // setCurrPos(event.targetTouches[0].clientX);

    if (startPos >= props.width / 2) {
      if (currPos < props.width / 2 && deltaPos <= -props.width / 4) {
        props.setDislike(true);
      } else if (deltaPos > props.width / 7) {
        props.setLike(true);
      } else {
        props.setDislike(false);
        props.setLike(false);
      }
    } else {
      if (currPos > props.width / 2 && deltaPos > props.width / 4) {
        props.setLike(true);
      } else if (deltaPos < -props.width / 7) {
        props.setDislike(true);
      } else {
        props.setDislike(false);
        props.setLike(false);
      }
    }
  };

  const touchEnd = () => {
    console.log(deltaPos);
    // if started from right
    if (startPos >= props.width / 2) {
      if (currPos < props.width / 2 && deltaPos <= -props.width / 4) {
        console.log('Dislike!');
        window.setTimeout(slideOutLeft, 5);
      } else if (deltaPos > props.width / 7) {
        console.log('Like!');
        window.setTimeout(slideOutRight, 5);
      } else {
        console.log('Reset!');
        // moved to the left, move back to the right
        if (deltaPos < 0) {
          window.setTimeout(slideOriginRight, 10);
        } else {
          window.setTimeout(slideOriginLeft, 10);
        }
      }
    } else {
      if (currPos > props.width / 2 && deltaPos > props.width / 4) {
        console.log('Like!');
        window.setTimeout(slideOutRight, 5);
      } else if (deltaPos < -props.width / 7) {
        console.log('Dislike!');
        window.setTimeout(slideOutLeft, 5);
      } else {
        console.log('Reset!');
        // moved to the left, move back to the right
        if (deltaPos < 0) {
          window.setTimeout(slideOriginRight, 10);
        } else {
          window.setTimeout(slideOriginLeft, 10);
        }
      }
    }

    // if started from left
    props.setDislike(false);
    props.setLike(false);
    setStartPos(0);
    setCurrPos(0);
    // setDeltaPos(0);
  };

  return (
    <div
      style={{
        left: `${deltaPos / 1.5}px`,
        transform: `rotate(${deltaPos / 7}deg)`,
        zIndex: `${props.zIndex}`,
      }}
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
      className={`${styles.cardContainer} ${props.color}`}
    >
      <div className={styles.quitButton}>
        <button>&lt; Quit</button>
      </div>
      <div className={styles.sessionId}>
        Room
        <br />
        {props.roomId}
      </div>
    </div>
  );
};

export default Card;
