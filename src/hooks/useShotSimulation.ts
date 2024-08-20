import { players } from '../constants/players';
import { IBullet } from '../types/IBullet';
import { IPlayer } from '../types/IPlayer';

export const useShotSimulation = () => {
  const bullets: IBullet[] = [];

  //draw - отрисовывает фигуры
  const draw = (bullet: IBullet, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = bullet.color;
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fill();
  };

  //update - обновляет положение фигуры
  const update = (bullet: IBullet) => {
    bullet.x += bullet.speedX;
    bullet.y += bullet.speedY;
  };

  const shoot = (player: IPlayer, enemy: IPlayer) => {
    const angle =
      (Math.atan2(enemy.y - player.y, enemy.x - player.x) * 180) / Math.PI;

    const bullet: IBullet = {
      color: player.color,
      radius: 7,
      x: player.x,
      y: player.y,
      speedX: 5 * Math.cos((angle * Math.PI) / 180),
      speedY: 5 * Math.sin((angle * Math.PI) / 180),
    };

    bullets.push(bullet);
  };

  //checkCollisionWithPlayer - проверяет расположение снаряда относительно стены. в случае столкновения - удаляет снаряд из массива
  const checkCollisionWithWall = (
    bullet: IBullet,
    canvas: HTMLCanvasElement
  ) => {
    const index = bullets.indexOf(bullet);

    if (
      bullet.x - bullet.radius < 0 ||
      bullet.x + bullet.radius > canvas.width
    ) {
      bullets.splice(index, 1);
    } else if (
      bullet.y - bullet.radius < 0 ||
      bullet.y + bullet.radius > canvas.height
    ) {
      bullets.splice(index, 1);
    }
  };

  //checkCollisionWithPlayer - проверяет расположение снаряда относительно врага. в случае столкновения - удаляет снаряд из массива
  const checkCollisionWithPlayer = (
    bullet: IBullet,
    target: IPlayer,
    player: IPlayer
  ) => {
    if (bullet.color === target.color) return;

    const dx = target.x - bullet.x;
    const dy = target.y - bullet.y;

    const index = bullets.indexOf(bullet);

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < target.radius + bullet.radius) {
      bullets.splice(index, 1);
      player.count += 1;
    }
  };

  //handlePlayers - вызывает функции выше
  const handleBullets = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    bullets.forEach((bullet: IBullet) => {
      update(bullet);
      draw(bullet, ctx);
      checkCollisionWithWall(bullet, canvas);
      checkCollisionWithPlayer(bullet, players[1], players[0]);
      checkCollisionWithPlayer(bullet, players[0], players[1]);
    });
  };

  return { handleBullets, shoot };
};
