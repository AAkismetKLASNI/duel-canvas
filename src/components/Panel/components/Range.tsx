import { ChangeEvent, FC, useState } from 'react';
import { IPlayer } from '../../../types/IPlayer';

interface RangeProps {
  player: IPlayer;
}

export const Range: FC<RangeProps> = ({ player }) => {
  const [currentSpeed, setCurrentSpeed] = useState(player.speedX);

  const onChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentSpeed(Number(target.value));
    player.speedX = Number(target.value);
    player.speedY = Number(target.value);
  };

  return (
    <input
      type='range'
      min={1}
      max={5}
      value={currentSpeed}
      onChange={onChangeInput}
      style={{ accentColor: player.color, width: '100%' }}
    />
  );
};
