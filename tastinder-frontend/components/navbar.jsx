import styles from '../styles/navbar.module.scss';
import Link from 'next/link';
import Home from '../pages/index.js';

const NavBar = (props) => {
  return (
    <nav className={styles.navbarContainer}>
      <ul>
        <li>
          <Link href="/">
            <a className={props.pageName === 'Home' ? styles.boldItem : null}>
              Home
            </a>
          </Link>
        </li>
        <li>
          <Link href="/host">
            <a className={props.pageName === 'Host' ? styles.boldItem : null}>
              Host
            </a>
          </Link>
        </li>
        <li className={styles.endItem}>
          <Link href="/">
            <a className={props.pageName === 'Join' ? styles.boldItem : null}>
              Join
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
