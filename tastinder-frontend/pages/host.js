import Head from 'next/head';
import NavBar from '../components/navbar';
import styles from '../styles/host.module.scss';
import React, { useState } from 'react';

const Host = () => {
  const [card, setCard] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted');
  };

  const nextButtonClick = (event) => {
    setCard(card + 1);
    console.log('Card: ' + card);
  };

  const backButtonClick = (event) => {
    setCard(card - 1);
    console.log('Card: ' + card);
  };

  return (
    <div>
      <Head>
        <title>Tastinder - Host</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <div className={styles.formContainer}>
        <div
          className={
            `${styles.initialCard} ${styles.red}` +
            (card !== 0 ? ` ${styles.dissapear}` : ` ${styles.show}`)
          }
        >
          <div className={styles.cardBody}>
            <h1>Location</h1>
            <div className={styles.cardField}>
              <input type="text" placeholder="City, Address, etc..." />
            </div>
            <button onClick={nextButtonClick}>Next→</button>
          </div>
        </div>

        {card === 1 && (
          <div className={`${styles.card} ${styles.green}`}>
            <div className={styles.cardBody}>
              <h1>Keyword</h1>
              <div className={styles.cardField}>
                <input type="text" placeholder="Sushi, burgers, etc..." />
              </div>
              <button onClick={nextButtonClick}>Next→</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Host;
