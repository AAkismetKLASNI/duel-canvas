import { Ceil, Range } from './components';
import windImg from '../../assets/icons/wind.png';
import bulletsImg from '../../assets/icons/bullets.png';
import styles from './Panel.module.css';
// import { useGetPlayers } from '../../hooks/useGetPlayers';
import { players } from '../../constants/players';

export const Panel = () => {
  // const players = useGetPlayers();

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>TABLE</span>
      <div className={styles.containerCeils}>
        {players.map(({ count, color }) => {
          return <Ceil count={count} color={color} />;
        })}
      </div>
      <div className={styles.containerSpeedRange}>
        <img src={windImg} alt='' />
        {players.map((player) => {
          return <Range player={player} />;
        })}
      </div>
    </div>
  );
};
