import React, { useEffect, useRef, useState } from 'react';
import { audioManager } from '../utils/audio';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  type: 'heart' | 'star' | 'balloon' | 'confetti';
  color: string;
  opacity: number;
  swayFreq: number;
  swayAmp: number;
  birthTime: number;
  // Confetti specifics
  gravity?: number;
  life?: number;
  maxLife?: number;
}

const PALETTE = [
  '#f472b6', // pink-400
  '#ec4899', // pink-500
  '#fbcfe8', // pink-200
  '#c084fc', // purple-400
  '#e9d5ff', // purple-200
  '#a855f7', // purple-500
  '#fbbf24', // amber-400 gold
  '#fef08a', // yellow-200
  '#f43f5e', // rose-500
];

interface FloatingParticlesProps {
  burstTrigger: number;
  density?: 'low' | 'medium' | 'high';
}

export const FloatingParticlesCanvas: React.FC<FloatingParticlesProps> = ({
  burstTrigger,
  density = 'medium',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [poppedCount, setPoppedCount] = useState(0);

  // Spawn initial ambient floating elements
  const createAmbientParticle = (width: number, height: number, startAtBottom = false): Particle => {
    const types: Particle['type'][] = ['heart', 'heart', 'star', 'balloon', 'balloon'];
    const type = types[Math.floor(Math.random() * types.length)];
    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    const size = type === 'balloon' ? Math.random() * 20 + 26 : Math.random() * 14 + 10;

    return {
      x: Math.random() * width,
      y: startAtBottom ? height + size + Math.random() * 50 : Math.random() * height,
      size,
      speedY: -(Math.random() * 0.7 + 0.4),
      speedX: (Math.random() - 0.5) * 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      type,
      color,
      opacity: Math.random() * 0.4 + 0.45,
      swayFreq: Math.random() * 0.02 + 0.01,
      swayAmp: Math.random() * 1.5 + 0.8,
      birthTime: performance.now(),
    };
  };

  // Trigger celebration confetti burst
  const triggerConfetti = (count = 140) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const originX = canvas.width / 2;
    const originY = canvas.height * 0.45;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
      const speed = Math.random() * 11 + 5;
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];

      particlesRef.current.push({
        x: originX,
        y: originY,
        size: Math.random() * 8 + 5,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        type: 'confetti',
        color,
        opacity: 1,
        swayFreq: 0.05,
        swayAmp: 0.5,
        birthTime: performance.now(),
        gravity: 0.28,
        life: 0,
        maxLife: Math.random() * 180 + 120,
      });
    }
  };

  useEffect(() => {
    if (burstTrigger > 0) {
      triggerConfetti(160);
    }
  }, [burstTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const targetCount = density === 'low' ? 24 : density === 'high' ? 55 : 38;
    particlesRef.current = Array.from({ length: targetCount }, () =>
      createAmbientParticle(width, height, false)
    );

    const drawHeart = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.15);
      c.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
    };

    const drawStar = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      const spikes = 5;
      const outerRadius = size / 2;
      const innerRadius = size / 4;
      let rot = (Math.PI / 2) * 3;
      let x = 0;
      let y = 0;
      const step = Math.PI / spikes;

      c.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }
      c.lineTo(0, -outerRadius);
      c.closePath();
      c.fill();
    };

    const drawBalloon = (c: CanvasRenderingContext2D, size: number) => {
      // Balloon body (oval)
      c.beginPath();
      c.ellipse(0, 0, size * 0.65, size * 0.85, 0, 0, Math.PI * 2);
      c.fill();

      // Balloon highlight shine
      c.fillStyle = 'rgba(255, 255, 255, 0.45)';
      c.beginPath();
      c.ellipse(-size * 0.22, -size * 0.35, size * 0.16, size * 0.3, Math.PI / 4, 0, Math.PI * 2);
      c.fill();

      // Balloon knot
      c.beginPath();
      c.moveTo(-size * 0.12, size * 0.85);
      c.lineTo(size * 0.12, size * 0.85);
      c.lineTo(0, size * 0.95);
      c.closePath();
      c.fill();

      // Balloon string
      c.strokeStyle = 'rgba(180, 160, 200, 0.4)';
      c.lineWidth = 1.2;
      c.beginPath();
      c.moveTo(0, size * 0.95);
      c.quadraticCurveTo(size * 0.2, size * 1.4, -size * 0.1, size * 1.8);
      c.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = performance.now();
      const currentParticles = particlesRef.current;

      for (let i = currentParticles.length - 1; i >= 0; i--) {
        const p = currentParticles[i];

        if (p.type === 'confetti') {
          // Physics for confetti
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.gravity) p.speedY += p.gravity;
          p.speedX *= 0.985;
          p.rotation += p.rotationSpeed;
          p.life = (p.life || 0) + 1;

          if (p.maxLife && p.life > p.maxLife * 0.7) {
            p.opacity = Math.max(0, 1 - (p.life - p.maxLife * 0.7) / (p.maxLife * 0.3));
          }

          if (p.maxLife && p.life >= p.maxLife) {
            currentParticles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        } else {
          // Ambient floating particles
          const elapsed = (now - p.birthTime) * 0.001;
          const sway = Math.sin(elapsed * p.swayFreq * 100) * p.swayAmp;

          p.y += p.speedY;
          p.x += p.speedX + sway * 0.15;
          p.rotation += p.rotationSpeed;

          // Recycle if floated above top
          if (p.y < -p.size * 2) {
            particlesRef.current[i] = createAmbientParticle(width, height, true);
            continue;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;

          if (p.type === 'heart') {
            drawHeart(ctx, p.size);
          } else if (p.type === 'star') {
            drawStar(ctx, p.size);
          } else if (p.type === 'balloon') {
            drawBalloon(ctx, p.size);
          }
          ctx.restore();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [density]);

  // Click on canvas to pop balloon or spawn hearts
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let poppedAny = false;
    particlesRef.current.forEach((p, index) => {
      if (p.type === 'balloon') {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < p.size * 1.2) {
          // Pop it!
          audioManager.playPop();
          setPoppedCount((prev) => prev + 1);
          poppedAny = true;

          // Replace with burst of mini sparks
          for (let k = 0; k < 12; k++) {
            particlesRef.current.push({
              x: p.x,
              y: p.y,
              size: 5,
              speedX: (Math.random() - 0.5) * 8,
              speedY: (Math.random() - 0.5) * 8,
              rotation: Math.random() * Math.PI,
              rotationSpeed: 0.1,
              type: 'confetti',
              color: p.color,
              opacity: 1,
              swayFreq: 0.05,
              swayAmp: 0.5,
              birthTime: performance.now(),
              gravity: 0.2,
              life: 0,
              maxLife: 40,
            });
          }

          // Respawn new ambient balloon
          particlesRef.current[index] = createAmbientParticle(canvas.width, canvas.height, true);
        }
      }
    });

    if (!poppedAny) {
      // Small sparkle chime
      audioManager.playSparkle();
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full pointer-events-auto cursor-pointer"
        title="Click floating balloons to pop them! 🎈"
      />
      {poppedCount > 0 && (
        <div className="absolute top-20 right-6 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-pink-700 shadow-sm border border-pink-200 pointer-events-none transition-all">
          🎈 Balloons Popped: {poppedCount} ✨
        </div>
      )}
    </div>
  );
};
