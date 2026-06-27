import { useEffect, useRef, useState } from 'react';
import { AnimationConfig, PresetId } from '../types';

interface CanvasRendererProps {
  config: AnimationConfig;
}

export default function CanvasRenderer({ config }: CanvasRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fps, setFps] = useState<number>(0);

  // Mouse coordinates and state
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // References for keeping state of particles
  const particlesRef = useRef<any[]>([]);
  const matrixRef = useRef<any[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const fpsIntervalRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  // Hex to RGBA helper
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 255, b: 204 };
  };

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      // Re-initialize particles/matrix state on resize
      initAnimationState(config.presetId, canvas.width, canvas.height);
    };

    const observer = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Initial sizing
    if (canvasRef.current && containerRef.current) {
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = containerRef.current.clientHeight;
      initAnimationState(config.presetId, canvasRef.current.width, canvasRef.current.height);
    }

    return () => {
      observer.disconnect();
    };
  }, [config.presetId, config.particleCount]);

  // Re-initialize when parameters change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      initAnimationState(config.presetId, canvas.width, canvas.height);
    }
  }, [config.presetId, config.particleCount]);

  // Initialize particles/columns based on active preset
  const initAnimationState = (preset: PresetId, width: number, height: number) => {
    if (preset === 'neural-grid') {
      const list = [];
      for (let i = 0; i < config.particleCount; i++) {
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * config.particleSize + 1,
        });
      }
      particlesRef.current = list;
    } else if (preset === 'matrix-rain') {
      const fontSize = 14;
      const columns = Math.ceil(width / fontSize) + 1;
      const list = [];
      for (let i = 0; i < columns; i++) {
        list.push({
          x: i * fontSize,
          y: Math.random() * -height, // start random heights above screen
          speed: (Math.random() * 2 + 1) * config.speed * 1.5,
          chars: Array.from({ length: 15 }, () => (Math.random() > 0.5 ? '1' : '0')),
        });
      }
      matrixRef.current = list;
    } else if (preset === 'particle-vortex') {
      const list = [];
      const centerX = width / 2;
      const centerY = height / 2;
      for (let i = 0; i < config.particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * Math.min(width, height) * 0.4 + 20;
        list.push({
          angle: angle,
          radius: radius,
          orbitSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
          size: Math.random() * config.particleSize + 1,
          pulseSpeed: Math.random() * 0.05 + 0.01,
          pulseState: Math.random() * Math.PI,
        });
      }
      particlesRef.current = list;
    } else if (preset === 'quantum-waves') {
      const list = [];
      for (let i = 0; i < config.particleCount; i++) {
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speed: (Math.random() * 0.5 + 0.5) * config.speed,
          waveFrequency: Math.random() * 0.01 + 0.002,
          waveAmplitude: Math.random() * 40 + 10,
          baseY: Math.random() * height,
          size: Math.random() * config.particleSize + 1.2,
          pulse: Math.random() * Math.PI,
        });
      }
      particlesRef.current = list;
    }
  };

  // Animation Loop
  useEffect(() => {
    let active = true;
    lastTimeRef.current = performance.now();
    fpsIntervalRef.current = lastTimeRef.current;

    const loop = (timestamp: number) => {
      if (!active) return;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) {
        animationFrameId.current = requestAnimationFrame(loop);
        return;
      }

      // Calculate FPS
      frameCountRef.current++;
      if (timestamp - fpsIntervalRef.current >= 1000) {
        setFps(frameCountRef.current);
        frameCountRef.current = 0;
        fpsIntervalRef.current = timestamp;
      }

      const delta = (timestamp - lastTimeRef.current) / 16.666; // Normalized delta around 60fps
      lastTimeRef.current = timestamp;

      // Draw active Preset
      renderFrame(ctx, canvas.width, canvas.height, delta);

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [config]);

  // Main Render Switcher
  const renderFrame = (ctx: CanvasRenderingContext2D, width: number, height: number, delta: number) => {
    const rgbPrimary = hexToRgb(config.primaryColor);
    const rgbSecondary = hexToRgb(config.secondaryColor);

    // Setup glow settings
    if (config.glow) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = config.primaryColor;
    } else {
      ctx.shadowBlur = 0;
    }

    switch (config.presetId) {
      case 'neural-grid':
        renderNeuralGrid(ctx, width, height, delta, rgbPrimary, rgbSecondary);
        break;
      case 'matrix-rain':
        renderMatrixRain(ctx, width, height, delta, rgbPrimary, rgbSecondary);
        break;
      case 'cyber-grid':
        renderCyberGrid(ctx, width, height, delta, rgbPrimary, rgbSecondary);
        break;
      case 'particle-vortex':
        renderParticleVortex(ctx, width, height, delta, rgbPrimary, rgbSecondary);
        break;
      case 'quantum-waves':
        renderQuantumWaves(ctx, width, height, delta, rgbPrimary, rgbSecondary);
        break;
    }
  };

  // 1. NEURAL CONNECTION GRID
  const renderNeuralGrid = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    delta: number,
    primary: any,
    secondary: any
  ) => {
    // Solid background with slight transparency for glow trail (if any) or crisp clean black
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const particles = particlesRef.current;
    const speedMultiplier = config.speed;
    const lineDist = config.lineDistance;
    const activeMouse = mouseRef.current;

    // Update and Draw Particles
    particles.forEach((p) => {
      // Basic movement
      p.x += p.vx * speedMultiplier * delta;
      p.y += p.vy * speedMultiplier * delta;

      // Interaction with Mouse
      if (activeMouse.active) {
        const dx = activeMouse.x - p.x;
        const dy = activeMouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180; // 0 (far) to 1 (close)
          if (config.interactivity === 'gravity') {
            p.x += (dx / dist) * force * 2 * delta;
            p.y += (dy / dist) * force * 2 * delta;
          } else if (config.interactivity === 'repulsion') {
            p.x -= (dx / dist) * force * 4 * delta;
            p.y -= (dy / dist) * force * 4 * delta;
          }
        }
      }

      // Edge collisions
      if (p.x < 0) {
        p.x = 0;
        p.vx *= -1;
      } else if (p.x > width) {
        p.x = width;
        p.vx *= -1;
      }

      if (p.y < 0) {
        p.y = 0;
        p.vy *= -1;
      } else if (p.y > height) {
        p.y = height;
        p.vy *= -1;
      }

      // Render Particle Node
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.85)`;
      ctx.fill();
    });

    // Disable shadow blur for lines to maintain crisp render performance
    ctx.shadowBlur = 0;

    // Draw Connection lines (Optimized double loop)
    ctx.lineWidth = config.lineWidth;
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;
        const maxDistSq = lineDist * lineDist;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = 1 - dist / lineDist;

          // Interpolate line color between primary and secondary
          const ratio = (p1.x / width + p2.y / height) / 2;
          const r = Math.floor(primary.r * (1 - ratio) + secondary.r * ratio);
          const g = Math.floor(primary.g * (1 - ratio) + secondary.g * ratio);
          const b = Math.floor(primary.b * (1 - ratio) + secondary.b * ratio);

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Optional connection to mouse
      if (activeMouse.active) {
        const dx = p1.x - activeMouse.x;
        const dy = p1.y - activeMouse.y;
        const distSq = dx * dx + dy * dy;
        const mouseMaxDist = 180;
        if (distSq < mouseMaxDist * mouseMaxDist) {
          const dist = Math.sqrt(distSq);
          const alpha = 1 - dist / mouseMaxDist;
          ctx.strokeStyle = `rgba(${primary.r}, ${primary.g}, ${primary.b}, ${alpha * 0.6})`;
          ctx.lineWidth = config.lineWidth * 1.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(activeMouse.x, activeMouse.y);
          ctx.stroke();
          ctx.lineWidth = config.lineWidth;
        }
      }
    }
  };

  // 2. MATRIX DIGITAL CASCADE
  const renderMatrixRain = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    delta: number,
    primary: any,
    secondary: any
  ) => {
    // Create trail effect via alpha-overlay
    ctx.fillStyle = 'rgba(10, 10, 15, 0.16)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = '14px monospace';
    const activeMouse = mouseRef.current;

    matrixRef.current.forEach((col) => {
      // Update Y position
      col.y += col.speed * delta;

      // Reset when column falls off or randomized reset
      if (col.y > height && Math.random() > 0.975) {
        col.y = Math.random() * -150;
        col.speed = (Math.random() * 2 + 1) * config.speed * 1.5;
      }

      // Periodically randomize character items
      if (Math.random() > 0.8) {
        col.chars.shift();
        col.chars.push(Math.random() > 0.5 ? '1' : '0');
      }

      // Interactivity: Push code columns away from mouse slightly
      let mouseOffset = 0;
      if (activeMouse.active) {
        const dx = activeMouse.x - col.x;
        const dist = Math.abs(dx);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          mouseOffset = (dx > 0 ? -1 : 1) * force * 35;
        }
      }

      // Render vertical character train
      const renderX = col.x + mouseOffset;
      col.chars.forEach((char: string, index: number) => {
        const charY = col.y - index * 16;
        if (charY < 0 || charY > height) return;

        // Gradient fading downwards in the column
        const alpha = 1 - index / col.chars.length;

        if (index === 0) {
          // Leading char is bright white-cyan
          ctx.fillStyle = '#ffffff';
        } else {
          // Rest blends primary and secondary colors
          const ratio = index / col.chars.length;
          const r = Math.floor(primary.r * (1 - ratio) + secondary.r * ratio);
          const g = Math.floor(primary.g * (1 - ratio) + secondary.g * ratio);
          const b = Math.floor(primary.b * (1 - ratio) + secondary.b * ratio);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        ctx.fillText(char, renderX, charY);
      });
    });
  };

  // 3. CYBERPUNK GRID & WIREFRAME MOUNTAIN SUN
  let scrollOffsetRef = useRef(0);
  const renderCyberGrid = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    delta: number,
    primary: any,
    secondary: any
  ) => {
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const activeMouse = mouseRef.current;

    // Scroll vertical lines infinitely
    scrollOffsetRef.current = (scrollOffsetRef.current + config.speed * 0.95 * delta) % 40;
    const offset = scrollOffsetRef.current;

    const horizon = height * 0.45; // Grid starts 45% down
    const gridYSpacing = 30;

    // Draw Glowing Synthwave Neon Sun in center horizon
    const sunRadius = Math.min(width, height) * 0.22;
    const sunX = width / 2;
    const sunY = horizon - 5;

    // Draw Sun with layered horizontal cutouts
    ctx.save();
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, Math.PI, 0); // half circle above horizon
    ctx.clip();

    // Solar gradient
    const sunGrad = ctx.createLinearGradient(sunX, sunY - sunRadius, sunX, sunY);
    sunGrad.addColorStop(0, config.primaryColor);
    sunGrad.addColorStop(0.5, config.secondaryColor);
    sunGrad.addColorStop(1, 'rgba(255, 0, 128, 0.2)');

    ctx.fillStyle = sunGrad;
    ctx.fillRect(sunX - sunRadius, sunY - sunRadius, sunRadius * 2, sunRadius * 2);

    // Sun lines (slices/bars)
    ctx.fillStyle = config.backgroundColor;
    for (let sy = sunY - sunRadius; sy < sunY; sy += 18) {
      const sliceHeight = Math.max(1, (sy - (sunY - sunRadius)) / 14);
      ctx.fillRect(sunX - sunRadius - 10, sy, sunRadius * 2 + 20, sliceHeight);
    }
    ctx.restore();

    // Wireframe Mountain range on the horizon
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 0.55)`;
    ctx.lineWidth = 1.5;

    const points = 16;
    const mountainWidth = width / (points - 1);
    const mountainPeaks = [0.2, 0.4, 0.6, 0.3, 0.8, 0.5, 0.2, 0.7, 0.9, 0.4, 0.3, 0.6, 0.2, 0.5, 0.1, 0];

    // Left mountain range
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    for (let i = 0; i < points; i++) {
      const px = i * mountainWidth;
      const py = horizon - mountainPeaks[i] * 65 * (Math.sin(i * 0.5) + 1.2);
      ctx.lineTo(px, py);
    }
    ctx.lineTo(width, horizon);
    ctx.stroke();

    // Cyber Horizon Glow Line
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(width, horizon);
    ctx.strokeStyle = `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.85)`;
    ctx.lineWidth = 3;
    ctx.shadowBlur = 12;
    ctx.shadowColor = config.primaryColor;
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    // PERSPECTIVE GRID LINES
    ctx.lineWidth = 1;
    const gridLines = 24;
    const vanishingPointX = width / 2 + (activeMouse.active ? (activeMouse.x - width / 2) * 0.12 : 0);

    // 1. Perspective Grid Rays (converging lines)
    for (let i = -6; i <= gridLines + 6; i++) {
      const targetX = (width / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(vanishingPointX, horizon);
      ctx.lineTo(targetX, height);

      // Color transition from secondary to primary at bottom
      const gradient = ctx.createLinearGradient(vanishingPointX, horizon, targetX, height);
      gradient.addColorStop(0, `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 0.08)`);
      gradient.addColorStop(0.4, `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 0.25)`);
      gradient.addColorStop(1, `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.6)`);

      ctx.strokeStyle = gradient;
      ctx.stroke();
    }

    // 2. Horizontal Perspective Lines (scrolling grid spacing increases towards bottom)
    const baseGap = 2.4;
    let currentY = horizon;
    let index = 0;

    while (currentY < height) {
      const ratio = (currentY - horizon) / (height - horizon);
      const step = baseGap + ratio * 48; // perspective stretching
      currentY += step;

      // Animating the scroll gap
      const animY = currentY + offset * (ratio + 0.1);

      if (animY > horizon && animY < height) {
        const animRatio = (animY - horizon) / (height - horizon);
        ctx.beginPath();
        ctx.moveTo(0, animY);
        ctx.lineTo(width, animY);

        ctx.strokeStyle = `rgba(${primary.r}, ${primary.g}, ${primary.b}, ${animRatio * 0.45})`;
        ctx.lineWidth = 0.5 + animRatio * 1.5;
        ctx.stroke();
      }
      index++;
    }
  };

  // 4. PARTICLE VORTEX
  const renderParticleVortex = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    delta: number,
    primary: any,
    secondary: any
  ) => {
    // Beautiful fade trail
    ctx.fillStyle = 'rgba(10, 10, 15, 0.12)';
    ctx.fillRect(0, 0, width, height);

    const particles = particlesRef.current;
    const activeMouse = mouseRef.current;

    // Use either mouse or center as vortex gravity node
    const targetX = activeMouse.active ? activeMouse.x : width / 2;
    const targetY = activeMouse.active ? activeMouse.y : height / 2;

    particles.forEach((p) => {
      // Rotate around vortex center
      p.angle += p.orbitSpeed * config.speed * delta;
      p.pulseState += p.pulseSpeed * delta;

      // Pulsate sizes
      const currentSize = p.size + Math.sin(p.pulseState) * 0.7;

      // Spiraling orbit pull towards gravity center
      const px = targetX + Math.cos(p.angle) * p.radius;
      const py = targetY + Math.sin(p.angle) * p.radius;

      // Color based on distance to center
      const maxRadius = Math.min(width, height) * 0.6;
      const distRatio = Math.min(1, p.radius / maxRadius);

      const r = Math.floor(primary.r * (1 - distRatio) + secondary.r * distRatio);
      const g = Math.floor(primary.g * (1 - distRatio) + secondary.g * distRatio);
      const b = Math.floor(primary.b * (1 - distRatio) + secondary.b * distRatio);

      // Render glowing star
      ctx.beginPath();
      ctx.arc(px, py, Math.max(0.5, currentSize), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.4 + Math.sin(p.pulseState) * 0.3})`;
      ctx.fill();

      // Slow dynamic radius variations (breathing flow)
      p.radius += Math.sin(p.pulseState * 0.15) * 0.3 * config.speed * delta;
    });

    // Draw core cyber energy sphere
    ctx.beginPath();
    ctx.arc(targetX, targetY, 4, 0, Math.PI * 2);
    ctx.fillStyle = config.primaryColor;
    ctx.shadowBlur = 15;
    ctx.shadowColor = config.primaryColor;
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  // 5. QUANTUM WAVES
  const renderQuantumWaves = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    delta: number,
    primary: any,
    secondary: any
  ) => {
    // Elegant flow field trail overlay
    ctx.fillStyle = 'rgba(10, 10, 16, 0.1)';
    ctx.fillRect(0, 0, width, height);

    const particles = particlesRef.current;
    const activeMouse = mouseRef.current;

    // Drawing waves in the background
    ctx.lineWidth = 1;
    for (let wave = 0; wave < 3; wave++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, ${0.08 - wave * 0.025})`;

      for (let x = 0; x < width; x += 15) {
        const timeFactor = performance.now() * 0.001 * config.speed;
        const waveY =
          height * (0.35 + wave * 0.15) +
          Math.sin(x * 0.003 + timeFactor + wave) * 60 +
          Math.cos(x * 0.001 + timeFactor * 0.5) * 35;

        if (x === 0) {
          ctx.moveTo(x, waveY);
        } else {
          ctx.lineTo(x, waveY);
        }
      }
      ctx.stroke();
    }

    // Render flow quantum dots
    particles.forEach((p) => {
      // Move horizontal
      p.x += p.speed * 2.5 * delta;

      // Keep inside screen bounds horizontally
      if (p.x > width) {
        p.x = 0;
        p.baseY = Math.random() * height;
      }

      // Sine wave modulation
      p.pulse += p.waveFrequency * config.speed * delta;
      const targetY = p.baseY + Math.sin(p.x * 0.005 + p.pulse) * p.waveAmplitude;

      // Smooth vertical lerping
      p.y += (targetY - p.y) * 0.15 * delta;

      // Gravity pull from mouse
      if (activeMouse.active) {
        const dx = activeMouse.x - p.x;
        const dy = activeMouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const pull = (150 - dist) / 150;
          p.y += (dy / dist) * pull * 4.5 * delta;
        }
      }

      // Map color on current Y height
      const hRatio = p.y / height;
      const r = Math.floor(primary.r * (1 - hRatio) + secondary.r * hRatio);
      const g = Math.floor(primary.g * (1 - hRatio) + secondary.g * hRatio);
      const b = Math.floor(primary.b * (1 - hRatio) + secondary.b * hRatio);

      // Spark trail
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.5 + Math.sin(p.pulse) * 0.4})`;
      ctx.fill();
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] overflow-hidden rounded-2xl bg-[#0a0a0f] border border-slate-800/60 shadow-inner group"
      id="animation-canvas-container"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full cursor-crosshair touch-none"
        onMouseMove={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect) {
            mouseRef.current = {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              active: true,
            };
          }
        }}
        onMouseLeave={() => {
          mouseRef.current = { x: -1000, y: -1000, active: false };
        }}
        onTouchMove={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect && e.touches[0]) {
            mouseRef.current = {
              x: e.touches[0].clientX - rect.left,
              y: e.touches[0].clientY - rect.top,
              active: true,
            };
          }
        }}
        onTouchEnd={() => {
          mouseRef.current = { x: -1000, y: -1000, active: false };
        }}
      />

      {/* Frame Status Info overlay */}
      <div className="absolute bottom-4 left-4 z-10 select-none bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80 font-mono text-[11px] text-slate-400 flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          FPS: <span className="text-emerald-400 font-semibold">{fps}</span>
        </span>
        <span className="text-slate-600">|</span>
        <span>
          PRESET: <span className="text-cyan-400 uppercase font-semibold">{config.presetId.replace('-', ' ')}</span>
        </span>
        <span className="text-slate-600">|</span>
        <span>
          NODES: <span className="text-violet-400 font-semibold">{config.presetId === 'matrix-rain' ? matrixRef.current.length : config.particleCount}</span>
        </span>
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/50 font-sans text-[10px] text-slate-300 uppercase tracking-wider">
        Mova o mouse para interagir
      </div>
    </div>
  );
}
