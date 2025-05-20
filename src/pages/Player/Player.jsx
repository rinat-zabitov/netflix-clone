import styles from './Player.module.css';
import back_arrow from '../../assets/back_arrow_icon.png';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: '',
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmQ1ZDJhN2MxZWMzM2RkY2I2MjdjZmFjM2QzMTE3YyIsIm5iZiI6MTc0NzY2MzY3Ny45MTYsInN1YiI6IjY4MmIzYjNkNWRjOTEwMDkwOGY1NWVkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bnTpsCRZDGBnQsZPm4OLe2pyyyIdbdIVm7sJcSTymgo',
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={styles.player}>
      <img onClick={() => navigate(-2)} src={back_arrow} alt="" />
      <iframe
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder={0}
        allowFullScreen
        width={'90%'}
        height={'90%'}
      ></iframe>
      <div className={styles.playerInfo}>
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};
