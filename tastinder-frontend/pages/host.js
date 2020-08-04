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

  return (
    <div>
      <Head>
        <title>Tastinder - Host</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <div className={styles.formContainer}>
        {card === 0 && (
          <div className={`${styles.initialCard} ${styles.purple}`}>
            <div className={styles.cardText}>
              Location
              <div className={styles.cardField}>
                <input type="text" />
              </div>
            </div>
          </div>
        )}

        {card === 1 && (
          <div className={`${styles.initialCard} ${styles.purple}`}>Hi</div>
        )}
      </div>
    </div>
  );
};

export default Host;
