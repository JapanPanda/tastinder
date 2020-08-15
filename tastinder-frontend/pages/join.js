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

  const [roomName, setRoomName] = useState('');
  const [numPlayers, setNumPlayers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disconnected, setDisconnected] = useState(false);

  // websocket to listen to players
  let ws = null;

  useEffect(() => {
    setRandColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  const handleInput = (event) => {
    setRoomName(event.target.value);
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
    console.log(`Leaving ${roomName}`);
    // TODO: Call api and wait for confirmation then go back
    backButtonClick();
  };

  const joinSession = (event) => {
    setLoading(false);
    console.log(`Joining ${roomName}`);
    // create a websocket to listen to player joins
    ws = new WebSocket('ws://localhost:1337/room?roomName=' + roomName);
    ws.onmessage = (message) => {
      setLoading(true);
      console.log(message);
      try {
        let players = JSON.parse(message.data).players;
        setNumPlayers(players);
      } catch (e) {}
    };

    ws.onclose = () => {
      console.log('disconnected');
      setDisconnected(true);
    };
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
                placeholder="BlueNarwhal (etc)"
                onInput={(event) => handleInput(event)}
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
          {loading && !disconnected && (
            <div className="loading">
              <div className="ldsHeart">
                <div></div>
              </div>
            </div>
          )}

          {/* Disconnected */}
          {!loading && disconnected && (
            <div className="loading">
              <p>Reconnecting</p>
              <div className="ldsHeart">
                <div></div>
              </div>
            </div>
          )}

          {!loading && !disconnected && (
            <div className={styles.roomInfo}>
              <span className={styles.title}>
                <h1>Room Code</h1>
              </span>
              <div className={styles.code}>
                <h3>{roomName}</h3>
              </div>
              <span className={styles.players}>
                <p>Food Critics: {numPlayers}</p>
              </span>
              <div>
                <button onClick={leaveSession}>Leave</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Join;
