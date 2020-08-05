import Head from 'next/head';
import NavBar from '../components/navbar';
import styles from '../styles/host.module.scss';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

// TODO: Implement Autocomplete in location

const Host = () => {
  const router = useRouter();

  // card = current card
  const [card, setCard] = useState(0);
  // in card = card that is going to transition in (enter back in)
  const [inCard, setInCard] = useState(-1);
  // out card = array of cards that have transitioned out (exit)
  const [outCard, setOutCard] = useState([false, false, false]);

  const [location, setLocation] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInput = (event, set) => {
    set(event.target.value);
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

  // Call API to delete session
  const cancelSession = (event) => {
    backButtonClick(event);
    // TODO: call api to delete session
  };

  // Call API to start session
  const startSession = (event) => {
    // TODO: call api to start session
    router.push('/room/[sessionId]', '/room/33124');
  };

  // Call API to create session
  const createSession = (event) => {
    // TODO: call api to create a session
  };

  return (
    <div>
      <Head>
        <title>Tastinder - Host</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar pageName="Host" />

      <div className={styles.formContainer}>
        <div
          style={{ zIndex: 4 }}
          className={
            `${styles.card} pumpkin ` +
            (inCard === 0 ? `${styles.slideIn} ` : ``) +
            (outCard[0] === true ? `${styles.slideOut} ` : ``)
          }
        >
          <div className={styles.cardBody}>
            <h1>Location</h1>
            <div className={styles.cardField}>
              <input
                type="text"
                placeholder="City, Address, etc..."
                onInput={(event) => handleInput(event, setLocation)}
              />
            </div>
            <button className={styles.right} onClick={nextButtonClick}>
              Next→
            </button>
          </div>
        </div>

        <div
          style={{ zIndex: 3 }}
          className={
            `${styles.card} turquoise ` +
            (inCard === 1 ? `${styles.slideIn} ` : ``) +
            (outCard[1] === true ? `${styles.slideOut} ` : ``)
          }
        >
          <div className={styles.cardBody}>
            <h1>Keyword</h1>
            <div className={styles.cardField}>
              <input
                type="text"
                placeholder="(Optional) Sushi, burgers, etc..."
                onInput={(event) => handleInput(event, setKeyword)}
              />
            </div>
            <button onClick={backButtonClick}>←Back</button>
            <button className={styles.right} onClick={nextButtonClick}>
              Next→
            </button>
          </div>
        </div>

        <div
          style={{ zIndex: 2 }}
          className={
            `${styles.card} pomegranate ` +
            (inCard === 2 ? `${styles.slideIn} ` : ``) +
            (outCard[2] === true ? `${styles.slideOut} ` : ``)
          }
        >
          <div className={styles.cardBody}>
            <h1>Create Room</h1>
            <div className={styles.cardField}>
              <p>Ready to find your true love?</p>
            </div>

            <button onClick={backButtonClick}>←Back</button>
            <button
              className={`${styles.right} ${styles.createButton}`}
              onClick={nextButtonClick}
            >
              Create→
            </button>
          </div>
        </div>

        {/* This is where the room gets generated and the room code is generated */}
        <div
          style={{ zIndex: 1 }}
          className={
            `${styles.roomCard} belize ` +
            (inCard === 3 ? `${styles.slideIn} ` : ``) +
            (outCard[3] === true ? `${styles.slideOut} ` : ``)
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
              <button onClick={startSession}>Start</button>
            </div>
            <div>
              <button onClick={cancelSession}>Cancel</button>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Host;
