import { FC } from 'react';
import styles from './Ceil.module.css';

interface CeilProps {
  count: number;
  color: string;
}

export const Ceil: FC<CeilProps> = ({ count, color }) => {
  return (
    <div className={styles.ceil} style={{ borderColor: color }}>
      {count}
    </div>
  );
};
