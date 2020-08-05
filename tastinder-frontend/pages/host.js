import Head from 'next/head';
import NavBar from '../components/navbar';
import styles from '../styles/host.module.scss';
import React, { useState, useEffect } from 'react';

const Host = () => {
  const [card, setCard] = useState(0);
  const [inCard, setInCard] = useState(-1);
  const [outCard, setOutCard] = useState([false, false, false]);

  const [location, setLocation] = useState('');
  const [keyword, setKeyword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleInput = (event, set) => {
    set(event.target.value);
    var input = document.getElementById('searchItem');
    var autocomplete = new google.maps.places.Autocomplete(input);
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

  const cancelSession = (event) => {
    backButtonClick(event);
    // TODO: call api to delete session
  };

  const startSession = (event) => {
    // TODO: call api to create session
  };

  const [loaded, error] = useScript(
    'https://maps.googleapis.com/maps/api/js?key=' +
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY +
      '&libraries=places'
  );

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
                id="searchItem"
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
          {false && (
            <div className={styles.loading}>
              <div className={styles.ldsHeart}>
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

// https://usehooks.com/useScript/
// Hook
let cachedScripts = [];
function useScript(src) {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false,
  });

  useEffect(
    () => {
      // If cachedScripts array already includes src that means another instance ...
      // ... of this hook already loaded this script, so no need to load again.
      if (cachedScripts.includes(src)) {
        setState({
          loaded: true,
          error: false,
        });
      } else {
        cachedScripts.push(src);

        // Create script
        let script = document.createElement('script');
        script.src = src;
        script.async = true;

        // Script event listener callbacks for load and error
        const onScriptLoad = () => {
          setState({
            loaded: true,
            error: false,
          });
        };

        const onScriptError = () => {
          // Remove from cachedScripts we can try loading again
          const index = cachedScripts.indexOf(src);
          if (index >= 0) cachedScripts.splice(index, 1);
          script.remove();

          setState({
            loaded: true,
            error: true,
          });
        };

        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);

        // Add script to document body
        document.body.appendChild(script);

        // Remove event listeners on cleanup
        return () => {
          script.removeEventListener('load', onScriptLoad);
          script.removeEventListener('error', onScriptError);
        };
      }
    },
    [src] // Only re-run effect if script src changes
  );

  return [state.loaded, state.error];
}
