import { IPlayer } from '../types/IPlayer';
import { useDebounce } from './useDebounce';
import { IBullet } from '../types/IBullet';
import { players } from '../constants/players';

//usePlayersSimulation - хранит в себе симуляцию поведения игрока
export const usePlayersSimulation = () => {
  const player1: IPlayer = players[0];
  const player2: IPlayer = players[1];

  let dx = 0;
  let dy = 0;
  let distance = 0;

  //draw - отрисовывает фигуры
  const draw = (player: IPlayer | IBullet, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();
  };

  //update - обновляет положение фигуры
  const update = (player: IPlayer | IBullet) => {
    player.x += player.speedX;
    player.y += player.speedY;
  };

  //checkCollisionWithPlayer - меняет траекторию в ходе столкновения со стеной
  const checkCollisionWithWall = (
    player: IPlayer,
    canvas: HTMLCanvasElement
  ) => {
    if (
      player.x - player.radius < 0 ||
      player.x + player.radius > canvas.width
    ) {
      player.speedX = -player.speedX;
      player.speedY = Math.round(Math.random())
        ? player.speedX
        : -player.speedX;
    }

    if (
      player.y - player.radius < 0 ||
      player.y + player.radius > canvas.height
    ) {
      player.speedY = -player.speedY;
      player.speedX = Math.round(Math.random())
        ? player.speedY
        : -player.speedY;
    }
  };

  //checkCollisionWithPlayer - проверяет расположение игроков относительно друг друга и меняет траекторию в ходе столкновения
  const checkCollisionWithPlayer = (player1: IPlayer, player2: IPlayer) => {
    dx = player1.x - player2.x;
    dy = player1.y - player2.y;

    distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player1.radius + player2.radius) {
      player1.speedX = -player1.speedX;
      player1.speedY = -player1.speedY;

      player2.speedX = -player2.speedX;
      player2.speedY = -player2.speedY;
    }
  };

  //checkCollisionWithMouse - проверяет расположение игроков относительно мыши. работает баговано и раз через раз.
  const checkCollisionWithMouse = useDebounce(() => {
    addEventListener('mousemove', (event) => {
      players.forEach((player: IPlayer) => {
        dx = player.x - event.offsetX;
        dy = player.y - event.offsetY;
        distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.radius) {
          player.speedX = -player.speedX;
          player.speedY = -player.speedY;
        }
      });
    });
  }, 150);

  //handlePlayers - вызывает функции выше
  const handlePlayers = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    players.forEach((player: IPlayer) => {
      update(player);
      draw(player, ctx);
      checkCollisionWithWall(player, canvas);
    });

    checkCollisionWithPlayer(player1, player2);
    checkCollisionWithMouse();
  };

  return { handlePlayers };
};
