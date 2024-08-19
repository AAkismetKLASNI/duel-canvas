import { FC, useState } from 'react';
import { ICircle } from '../../../../types/ICircle';

interface RangeProps {
  player: ICircle;
}

export const Range: FC<RangeProps> = ({ player }) => {
  const [speed, setSpeed] = useState(player.speedX);

  const onChangeInput = (event) => {
    setSpeed(Number(event.target.value));
    player.speedX = Number(event.target.value);
    player.speedY = Number(event.target.value);
  };

  return (
    <input
      type='range'
      min={1}
      max={5}
      value={speed}
      onChange={onChangeInput}
      style={{ accentColor: player.color, width: '100%' }}
    />
  );
};
