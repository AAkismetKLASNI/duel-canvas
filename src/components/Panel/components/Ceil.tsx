import { FC } from 'react';

interface CeilProps {
  count: number;
  color: string;
}

export const Ceil: FC<CeilProps> = ({ count, color }) => {
  return (
    <div style={{ border: `2px ${color} solid`, padding: '10px 20px' }}>
      {count}
    </div>
  );
};
