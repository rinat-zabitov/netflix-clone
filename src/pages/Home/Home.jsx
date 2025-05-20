import styles from './Home.module.css';
import { Navbar } from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import { TitleCards } from '../../components/TitleCards/TitleCards';
import { Footer } from '../../components/Footer/Footer';

export const Home = () => {
  return (
    <div className={styles.home}>
      <Navbar />
      <div className={styles.hero}>
        <img className={styles.bannerImg} src={hero_banner} alt="hero-img" />
        <div className={styles.heroCaption}>
          <img className={styles.captionImg} src={hero_title} alt="hero-title" />
          <p>
            Discovering his ties to a secret ancient order, a young man living in modern
            Istambul embarks on a quest to save the city from an immortal enemy.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.btn}>
              <img src={play_icon} alt="" />
              Play
            </button>
            <button className={styles.btn + ' ' + styles.dark_btn}>
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>
          <TitleCards className={styles.titleCards} />
        </div>
      </div>
      <div className={styles.moreCards}>
        <TitleCards title={'Blockbuster Movies'} category={'top_rated'} />
        <TitleCards title={'Only on Netflix'} category={'popular'} />
        <TitleCards title={'Upcoming'} category={'upcoming'} />
        <TitleCards title={'Top Pics for You'} category={'now_playing'} />
      </div>
      <Footer />
    </div>
  );
};
