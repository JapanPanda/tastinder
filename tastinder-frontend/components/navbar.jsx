import styles from '../styles/navbar.module.scss';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className={styles.navbarContainer}>
      <ul>
        <li className={styles.beginItem}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/host">
            <a>Host</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Join</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;