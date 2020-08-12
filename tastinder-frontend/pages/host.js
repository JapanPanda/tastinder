import Head from 'next/head';
import NavBar from '../components/navbar';
import styles from '../styles/host.module.scss';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
  const [loadedAutocomplete, setLoadedAutocomplete] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  const handleInput = (event, set) => {
    set(event.target.value);
    if (!loadedAutocomplete) {
      var input = document.getElementById('searchItem');
      var autocomplete = new google.maps.places.Autocomplete(input);
      setLoadedAutocomplete(true);
    }

    // if location has more than one character, enable next button and change to enabled style, else disable and change to disabled style
    if (event.target.value.length > 0) {
      setNextButtonDisabled(false);
      document.getElementById('nextButton').className = styles.nextEnabled;
    } else {
      setNextButtonDisabled(true);
      document.getElementById('nextButton').className = styles.nextDisabled;
    }
  };

  const handleBlur = (event, set) => {
    // wait 50ms because google autocomplete takes time to load in value
    setTimeout(() => {
      set(document.getElementById('searchItem').value);
    }, 50);
  };

  const [loaded, error] = useScript(
    'https://maps.googleapis.com/maps/api/js?key=' +
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY +
      '&libraries=places'
  );

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
                id="searchItem"
                placeholder="City, Address, etc..."
                onInput={(event) => handleInput(event, setLocation)}
                onBlur={(event) => handleBlur(event, setLocation)}
              />
            </div>
            <button
              // next button starts disabled, but is enabled and changes class as well on location input
              id="nextButton"
              disabled={nextButtonDisabled}
              className={styles.nextDisabled}
              onClick={nextButtonClick}
            >
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
            <p>Ready to find your true love?</p>
            <div className={styles.userRoomSettingsBorder}>
              <p className={styles.locationText}>
                <img
                  className={styles.createRoomLocationImg}
                  src="/location.png"
                />
                &ensp; {location}
              </p>
              <p className={styles.keywordText}>
                <img className={styles.createRoomFoodImg} src="/food.png" />
                &ensp; {keyword}
              </p>
            </div>

            <button
              className={styles.backAndCreateButtons}
              onClick={backButtonClick}
            >
              ←Back
            </button>
            <button
              className={`${styles.right} ${styles.backAndCreateButtons}`}
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
