import { ICircle } from '../types/ICircle';
// import { useGetPlayers } from './useGetPlayers';
import { players } from '../constants/players';
import { useDebounce } from './useDebounce';

export const usePlayersSimulation = () => {
  // const players = useGetPlayers();

  const player1 = players[0];
  const player2 = players[1];

  let dx = 0;
  let dy = 0;
  let distance = 0;

  const draw = (player: ICircle, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const update = (player: ICircle, canvas: HTMLCanvasElement) => {
    console.log(player.speedX);

    // player.speedX = Math.min(Math.max(player.speedX, -5), 5);

    player.x += player.speedX;
    player.y += player.speedY;

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

  const checkCollision = (player1: ICircle, player2: ICircle) => {
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

  const checkCollisionWithMouse = useDebounce(() => {
    addEventListener('mousemove', (event) => {
      console.log('GO!');
      players.forEach((player) => {
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

  const handleParticles = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    players.forEach((player) => {
      update(player, canvas);
      draw(player, ctx);
    });

    checkCollision(player1, player2);
    // checkCollisionWithMouse();
  };

  return { handleParticles };
};
function clamp(speedX: number, arg1: number, arg2: number): number {
  throw new Error('Function not implemented.');
}
