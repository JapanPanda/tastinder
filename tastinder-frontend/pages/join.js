import styles from '../styles/join.module.scss';
import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import Head from 'next/head';

const Join = () => {
  const colors = ['turquoise', 'pumpkin', 'pomegranate', 'river', 'belize'];
  const [randColor, setRandColor] = useState(undefined);
  const [card, setCard] = useState(0);
  const [inCard, setInCard] = useState(-1);
  const [outCard, setOutCard] = useState([false, false, false]);
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    setRandColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  const handleInput = (event) => {
    setRoomId(event.target.value);
  };

  // Move to next card
  const nextButtonClick = (event) => {
    let currCard = card;
    setCard(currCard + 1);

    // Set outcard to true to transition current card out
    let currOutCard = outCard;
    currOutCard[currCard] = true;
    setOutCard(currOutCard);

    console.log('Card: ' + currCard);
  };

  // Move to previous card
  const backButtonClick = (event) => {
    let currCard = card;
    setCard(currCard - 1);

    // Set in card to transition previous card back in
    setInCard(currCard - 1);

    // Set out card to the previous card to false
    let currOutCard = outCard;
    currOutCard[currCard - 1] = false;
    console.log('Card: ' + card);
  };

  const leaveSession = (event) => {
    console.log(`Leaving ${roomId}`);
    // TODO: Call api and wait for confirmation then go back
    backButtonClick();
  };

  const joinSession = (event) => {
    console.log(`Joining ${roomId}`);
    // TODO: Call api and wait for confirmation then go forward
    nextButtonClick();
  };

  return (
    <div>
      <Head>
        <title>Tastinder - Join</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar pageName="Join" />

      <div className={styles.formContainer}>
        <div
          style={{ zIndex: 2 }}
          className={
            `${styles.card} ${randColor} ` +
            (inCard === 0 ? `${styles.slideIn} ` : ``) +
            (outCard[0] === true ? `${styles.slideOut} ` : ``)
          }
        >
          <div className={styles.cardBody}>
            <h1>Room Name</h1>
            <div className={styles.cardField}>
              <input
                type="text"
                placeholder="blue-narwhal (etc)"
                onInput={(event) => handleInput(event, setLocation)}
              />
            </div>
            <button className={styles.right} onClick={joinSession}>
              Join→
            </button>
          </div>
        </div>

        <div
          style={{ zIndex: 1 }}
          className={
            `${styles.roomCard} belize ` +
            (inCard === 1 ? `${styles.slideIn} ` : ``) +
            (outCard[1] === true ? `${styles.slideOut} ` : ``)
          }
        >
          {/* Loading */}
          {false && (
            <div className="loading">
              <div className="ldsHeart">
                <div></div>
              </div>
            </div>
          )}

          <div className={styles.roomInfo}>
            <span className={styles.title}>
              <h1>Room Code</h1>
            </span>
            <div className={styles.code}>
              <h3>33214</h3>
            </div>
            <span className={styles.players}>
              <p>Food Critics: 1/4</p>
            </span>
            <div>
              <button onClick={leaveSession}>Leave</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
