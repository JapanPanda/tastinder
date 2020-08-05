import { useRouter } from 'next/router';
import Card from '../../components/card';
import styles from '../../styles/room.module.scss';
import useWindowDimensions from '../../hooks/windowSizeHook';
import React, { useState } from 'react';
import Head from 'next/head';

const Session = () => {
  const { height, width } = useWindowDimensions();
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const router = useRouter();
  const roomId = router.query.slug;

  // TODO: add dynamic loading from api
  const cards = [
    { color: 'turquoise' },
    { color: 'pumpkin' },
    { color: 'wisteria' },
    { color: 'belize' },
    { color: 'turquoise' },
    { color: 'pumpkin' },
    { color: 'wisteria' },
    { color: 'belize' },
    { color: 'turquoise' },
    { color: 'pumpkin' },
    { color: 'wisteria' },
    { color: 'belize' },
  ];

  return (
    <div className={styles.sessionContainer}>
      <Head>
        <title>{`Tastinder - Session ${roomId}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {like && (
        <div className={styles.like}>
          <svg
            className={styles.likeAnimation}
            id="i-heart"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width={width / 3}
            height={width / 3}
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          >
            <path d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z" />
          </svg>
        </div>
      )}

      {dislike && (
        <div className={styles.dislike}>
          <svg
            id="i-trash"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width={width / 3}
            height={width / 3}
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          >
            <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
          </svg>
        </div>
      )}

      {cards.map((card, index) => (
        <Card
          key={index}
          zIndex={cards.length - index}
          color={card.color}
          setLike={setLike}
          setDislike={setDislike}
          width={width}
          roomId={roomId}
        />
      ))}
    </div>
  );
};

export default Session;
