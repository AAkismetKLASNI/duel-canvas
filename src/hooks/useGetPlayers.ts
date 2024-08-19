import { ICircle } from '../types/ICircle';

export const useGetPlayers = () => {
  const players: ICircle[] = [
    {
      x: 200,
      y: 100,
      count: 0,
      color: 'blue',
      radius: 35,
      speedX: 2,
      speedY: 0,
    },
    {
      x: 750,
      y: 600,
      count: 0,
      color: 'red',
      radius: 35,
      speedX: -2,
      speedY: 0,
    },
  ];

  return players;
};
