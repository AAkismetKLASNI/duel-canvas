import { FC, useState } from 'react';
import { IPlayer } from '../../../types/IPlayer';

interface PalleteProps {
  player: IPlayer;
}

export const Pallete: FC<PalleteProps> = ({ player }) => {
  const [currentColor, setCurrentColor] = useState(player.color);
  const [isOpenPallete, setIsOpenPallete] = useState(false);

  const onClickColor = (color: string) => {
    setCurrentColor(color);
    player.color = color;
  };

  const colors = ['#473CA5', '#F01933', '#90EE90', '#ECECEC'];

  return (
    <div>
      <div
        style={{
          backgroundColor: currentColor,
          cursor: 'pointer',
          width: '100px',
          height: '100px',
        }}
        onClick={() => setIsOpenPallete(!isOpenPallete)}
      />
      {isOpenPallete && (
        <div style={{ display: 'flex' }}>
          {colors.map((color) => {
            return (
              <div
                style={{
                  backgroundColor: color,
                  cursor: 'pointer',
                  width: '25px',
                  height: '25px',
                }}
                onClick={() => {
                  onClickColor(color);
                  toggleFlag();
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
