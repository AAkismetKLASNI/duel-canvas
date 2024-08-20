import { ChangeEvent, FC, useState } from 'react';
import { IPlayer } from '../../../types/IPlayer';

interface RangeProps {
  player: IPlayer;
  option: 'speedX' | 'rateFire';
  min: number;
  max: number;
}

export const Range: FC<RangeProps> = ({ player, option, min, max }) => {
  const [currentState, setCurrentState] = useState(player[option]);

  const onChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    player.speedX = Number(target.value);
    player.speedY = Number(target.value);

    setCurrentState(Number(target.value));
  };

  const onChangeRateFire = ({ target }: ChangeEvent<HTMLInputElement>) => {
    player.rateFire = Number(target.value);
    console.log(player.rateFire);
    setCurrentState(Number(target.value));
  };

  return (
    <input
      type='range'
      min={min}
      max={max}
      value={currentState}
      onChange={option === 'rateFire' ? onChangeRateFire : onChangeInput}
      style={{ accentColor: player.color }}
    />
  );
};
