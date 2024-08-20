import { useRef, useEffect } from 'react';
import { usePlayersSimulation } from '../../hooks/usePlayersSimulation';
import { useShotSimulation } from '../../hooks';
import { players } from '../../constants/players';

export const Canvas = ({ ...props }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  const { handlePlayers } = usePlayersSimulation();
  const { handleBullets, shoot } = useShotSimulation();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    shoot(players[0], players[1]);
    shoot(players[1], players[0]);

    const animate = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement
    ) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      handlePlayers(ctx, canvas);
      handleBullets(ctx, canvas);
      requestAnimationFrame(() => animate(ctx, canvas));
    };

    animate(ctx, canvas);

    const unmounting = () => {
      // clearTimeout(intervalId1);
      // clearTimeout(intervalId2);
    };

    return () => unmounting;
  }, [shoot, handleBullets, handlePlayers]);

  return <canvas ref={ref} {...props} />;
};
