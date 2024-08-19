import { useRef, useEffect } from 'react';
import { usePlayersSimulation } from '../../hooks/usePlayersSimulation';

export const Canvas = ({ ...props }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  const { handleParticles } = usePlayersSimulation();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      handleParticles(ctx, canvas);
      requestAnimationFrame(animate);
    };
    animate();
  }, [handleParticles]);

  return <canvas ref={ref} {...props} />;
};
