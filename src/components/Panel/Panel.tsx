import { Ceil, Range, Pallete } from './components';
import { players } from '../../constants/players';
import windImg from '../../assets/icons/wind.png';
import styles from './Panel.module.css';
import { useState } from 'react';

export const Panel = () => {
  const [isFlag, setIsFlag] = useState(false);

  const onToggleFlag = () => setIsFlag(!isFlag);

  //Лучше решения правда не нашел. Надо отображать данные сразу же после изменения, но без рендеринга это невозможно.
  setInterval(() => {
    onToggleFlag();
  }, 1000);

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
          return <Range player={player} />;
        })}
      </div>
      <div className={styles.containerPallete}>
        {players.map((player) => {
          return <Pallete player={player} />;
        })}
      </div>
    </div>
  );
};
