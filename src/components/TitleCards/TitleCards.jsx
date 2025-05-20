import { Link } from 'react-router-dom';
import styles from './TitleCards.module.css';
// import cards_data from '../../assets/cards/Cards_data';
import { useRef, useEffect, useState } from 'react';

export const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const handleWheel = e => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmQ1ZDJhN2MxZWMzM2RkY2I2MjdjZmFjM2QzMTE3YyIsIm5iZiI6MTc0NzY2MzY3Ny45MTYsInN1YiI6IjY4MmIzYjNkNWRjOTEwMDkwOGY1NWVkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bnTpsCRZDGBnQsZPm4OLe2pyyyIdbdIVm7sJcSTymgo',
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : 'now_playing'
      }?language=en-US&page=1`,
      options
    )
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className={styles.titleCards}>
      <h2>{title}</h2>
      <div className={styles.cardList} ref={cardsRef}>
        {apiData &&
          apiData.map(card => (
            <Link to={`/player/${card.id}`} key={card.id} className={styles.card}>
              <img
                src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path}
                alt={card.name}
              />
              <p>{card.original_title}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};
