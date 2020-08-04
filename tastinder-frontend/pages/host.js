import Head from 'next/head';
import NavBar from '../components/navbar';
import styles from '../styles/host.module.scss';
import React, { useState } from 'react';

// TODO: Implement Autocomplete in location

const Host = () => {
  const [card, setCard] = useState(0);
  const [inCard, setInCard] = useState(-1);
  const [outCard, setOutCard] = useState([false, false, false]);

  const [location, setLocation] = useState('');
  const [keyword, setKeyword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleInput = (event, set) => {
    set(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted');
  };

  const nextButtonClick = (event) => {
    let currCard = card;
    setCard(currCard + 1);
    let currOutCard = outCard;
    currOutCard[currCard] = true;
    setOutCard(currOutCard);

    console.log('Card: ' + currCard);
  };

  const backButtonClick = (event) => {
    let currCard = card;
    setCard(currCard - 1);
    setInCard(currCard - 1);

    let currOutCard = outCard;
    currOutCard[currCard - 1] = false;
    console.log('Card: ' + card);
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
            `${styles.card} ${styles.red} ` +
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
            `${styles.card} ${styles.green} ` +
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
            `${styles.card} ${styles.red} ` +
            (inCard === 2 ? `${styles.slideIn} ` : ``) +
            (outCard[2] === true ? `${styles.slideOut} ` : ``)
          }
        >
          <div className={styles.cardBody}>
            <h1>Create Room?</h1>
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
            `${styles.card} ${styles.red} ` +
            (inCard === 3 ? `${styles.slideIn} ` : ``) +
            (outCard[3] === true ? `${styles.slideOut} ` : ``)
          }
        >
          {true && <div className={styles.loading}>Loading</div>}

          {/* <div className={styles.cardBody}>
            <h1>Create Room?</h1>
            <div className={styles.cardField}>
              <p>Ready to find your true love?</p>
            </div>

            <button onClick={backButtonClick}>←Back</button>
            <button
              className={`${styles.right} ${styles.createButton}`}
              onClick={nextButtonClick}
            >
              Create→
            </button> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Host;
