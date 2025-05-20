import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { useEffect, useRef } from 'react';
import { logout } from '../../firebase/firebase';

export const Navbar = () => {
  const navRef = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add(styles.navDark);
      } else {
        navRef.current.classList.remove(styles.navDark);
      }
    });
  }, []);

  return (
    <nav ref={navRef} className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by languages</li>
        </ul>
      </div>
      <div className={styles.navbarRight}>
        <img className={styles.icons} src={search_icon} alt="search" />
        <p>Children</p>
        <img className={styles.icons} src={bell_icon} alt="bell" />
        <div className={styles.navbarProfile}>
          <img className={styles.profile} src={profile_img} alt="profile" />
          <img src={caret_icon} alt="caret" />
          <div className={styles.dropdown}>
            <p onClick={() => logout()}>Sing Out of Netflix</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
