import { Ceil, Range, Pallete } from './components';
import { players } from '../../constants/players';
import windImg from '../../assets/icons/wind.png';
import bulletsImg from '../../assets/icons/bullets.png';
import styles from './Panel.module.css';
import { useFlag } from '../../hooks/useFlag';

export const Panel = () => {
  const { onToggleFlag } = useFlag();

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>TABLE</span>
      <div className={styles.containerCeils}>
        {players.map(({ count, color }) => {
          console.log(count);
          return <Ceil count={count} color={color} />;
        })}
      </div>
      <div className={styles.containerSpeedRange}>
        <img src={windImg} alt='wind' />
        {players.map((player) => {
          return <Range player={player} min={1} max={5} option='speedX' />;
        })}
      </div>
      <div className={styles.containerSpeedRange}>
        <img src={bulletsImg} alt='wind' />
        {players.map((player) => {
          return <Range player={player} min={1} max={3} option='rateFire' />;
        })}
      </div>
      <div className={styles.containerPallete}>
        {players.map((player) => {
          return <Pallete player={player} onToggleFlag={onToggleFlag} />;
        })}
      </div>
    </div>
  );
};
