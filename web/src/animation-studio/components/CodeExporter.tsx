import { useState } from 'react';
import { AnimationConfig, PresetId } from '../types';
import { Clipboard, Check, Code, FileCode, Terminal, HelpCircle, Layers } from 'lucide-react';

interface CodeExporterProps {
  config: AnimationConfig;
}

export default function CodeExporter({ config }: CodeExporterProps) {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ts' | 'html' | 'css' | 'docs'>('ts');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(label);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const getPresetName = (id: PresetId) => {
    switch (id) {
      case 'neural-grid':
        return 'Grid de Rede Neural';
      case 'matrix-rain':
        return 'Chuva Binária Matrix';
      case 'cyber-grid':
        return 'Grid Futurista Synthwave';
      case 'particle-vortex':
        return 'Vórtice de Partículas';
      case 'quantum-waves':
        return 'Ondas Quânticas';
    }
  };

  // Helper to generate the canvas logic matching the selected preset in Angular
  const generateCanvasTsLogic = (preset: PresetId) => {
    switch (preset) {
      case 'neural-grid':
        return `  // --- NEURAL NETWORK LOGIC ---
  private initParticles(): void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.particles = [];
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * this.particleSize + 1,
      });
    }
  }

  private renderNeuralGrid(ctx: CanvasRenderingContext2D, width: number, height: number, delta: number): void {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    if (this.glow) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.primaryColor;
    } else {
      ctx.shadowBlur = 0;
    }

    const rgbPrimary = this.hexToRgb(this.primaryColor);
    const rgbSecondary = this.hexToRgb(this.secondaryColor);

    // Update & Draw Nodes
    this.particles.forEach(p => {
      p.x += p.vx * this.speed * delta;
      p.y += p.vy * this.speed * delta;

      // Mouse Physics
      if (this.mouse.active) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          if (this.interactivity === 'gravity') {
            p.x += (dx / dist) * force * 2 * delta;
            p.y += (dy / dist) * force * 2 * delta;
          } else if (this.interactivity === 'repulsion') {
            p.x -= (dx / dist) * force * 4 * delta;
            p.y -= (dy / dist) * force * 4 * delta;
          }
        }
      }

      // Border Collisions
      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      else if (p.x > width) { p.x = width; p.vx *= -1; }

      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      else if (p.y > height) { p.y = height; p.vy *= -1; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = \`rgba(\${rgbPrimary.r}, \${rgbPrimary.g}, \${rgbPrimary.b}, 0.85)\`;
      ctx.fill();
    });

    ctx.shadowBlur = 0;

    // Connect Lines
    ctx.lineWidth = this.lineWidth;
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;
        const maxDistSq = this.lineDistance * this.lineDistance;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = 1 - dist / this.lineDistance;
          const ratio = (p1.x / width + p2.y / height) / 2;
          const r = Math.floor(rgbPrimary.r * (1 - ratio) + rgbSecondary.r * ratio);
          const g = Math.floor(rgbPrimary.g * (1 - ratio) + rgbSecondary.g * ratio);
          const b = Math.floor(rgbPrimary.b * (1 - ratio) + rgbSecondary.b * ratio);

          ctx.strokeStyle = \`rgba(\${r}, \${g}, \${b}, \${alpha * 0.45})\`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Mouse interactive connection
      if (this.mouse.active) {
        const dx = p1.x - this.mouse.x;
        const dy = p1.y - this.mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 180 * 180) {
          const dist = Math.sqrt(distSq);
          const alpha = 1 - dist / 180;
          ctx.strokeStyle = \`rgba(\${rgbPrimary.r}, \${rgbPrimary.g}, \${rgbPrimary.b}, \${alpha * 0.6})\`;
          ctx.lineWidth = this.lineWidth * 1.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(this.mouse.x, this.mouse.y);
          ctx.stroke();
          ctx.lineWidth = this.lineWidth;
        }
      }
    }
  }`;

      case 'matrix-rain':
        return `  // --- MATRIX BINARY CASCADE LOGIC ---
  private initParticles(): void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.particles = []; // Reuse particles array for columns
    const fontSize = 14;
    const columns = Math.ceil(width / fontSize) + 1;
    
    for (let i = 0; i < columns; i++) {
      this.particles.push({
        x: i * fontSize,
        y: Math.random() * -height,
        speed: (Math.random() * 2 + 1) * this.speed * 1.5,
        chars: Array.from({ length: 15 }, () => Math.random() > 0.5 ? '1' : '0')
      });
    }
  }

  private renderMatrixRain(ctx: CanvasRenderingContext2D, width: number, height: number, delta: number): void {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.16)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = '14px monospace';
    const rgbPrimary = this.hexToRgb(this.primaryColor);
    const rgbSecondary = this.hexToRgb(this.secondaryColor);

    this.particles.forEach(col => {
      col.y += col.speed * delta;

      if (col.y > height && Math.random() > 0.975) {
        col.y = Math.random() * -150;
        col.speed = (Math.random() * 2 + 1) * this.speed * 1.5;
      }

      if (Math.random() > 0.8) {
        col.chars.shift();
        col.chars.push(Math.random() > 0.5 ? '1' : '0');
      }

      let mouseOffset = 0;
      if (this.mouse.active) {
        const dx = this.mouse.x - col.x;
        const dist = Math.abs(dx);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          mouseOffset = (dx > 0 ? -1 : 1) * force * 35;
        }
      }

      const renderX = col.x + mouseOffset;
      col.chars.forEach((char: string, index: number) => {
        const charY = col.y - index * 16;
        if (charY < 0 || charY > height) return;

        const alpha = 1 - index / col.chars.length;

        if (index === 0) {
          ctx.fillStyle = '#ffffff';
        } else {
          const ratio = index / col.chars.length;
          const r = Math.floor(rgbPrimary.r * (1 - ratio) + rgbSecondary.r * ratio);
          const g = Math.floor(rgbPrimary.g * (1 - ratio) + rgbSecondary.g * ratio);
          const b = Math.floor(rgbPrimary.b * (1 - ratio) + rgbSecondary.b * ratio);
          ctx.fillStyle = \`rgba(\${r}, \${g}, \${b}, \${alpha})\`;
        }

        ctx.fillText(char, renderX, charY);
      });
    });
  }`;

      case 'cyber-grid':
        return `  // --- CYBERPUNK PERSPECTIVE GRID LOGIC ---
  private scrollOffset = 0;

  private initParticles(): void {
    this.particles = []; // No random particles needed for static dynamic grids
  }

  private renderCyberGrid(ctx: CanvasRenderingContext2D, width: number, height: number, delta: number): void {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const rgbPrimary = this.hexToRgb(this.primaryColor);
    const rgbSecondary = this.hexToRgb(this.secondaryColor);

    this.scrollOffset = (this.scrollOffset + this.speed * 0.95 * delta) % 40;
    const horizon = height * 0.45;

    // Draw Neon Sun
    const sunRadius = Math.min(width, height) * 0.22;
    const sunX = width / 2;
    const sunY = horizon - 5;

    ctx.save();
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, Math.PI, 0);
    ctx.clip();

    const sunGrad = ctx.createLinearGradient(sunX, sunY - sunRadius, sunX, sunY);
    sunGrad.addColorStop(0, this.primaryColor);
    sunGrad.addColorStop(0.5, this.secondaryColor);
    sunGrad.addColorStop(1, 'rgba(255, 0, 128, 0.2)');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(sunX - sunRadius, sunY - sunRadius, sunRadius * 2, sunRadius * 2);

    // Sun lines/slices
    ctx.fillStyle = this.backgroundColor;
    for (let sy = sunY - sunRadius; sy < sunY; sy += 18) {
      const sliceHeight = Math.max(1, (sy - (sunY - sunRadius)) / 14);
      ctx.fillRect(sunX - sunRadius - 10, sy, sunRadius * 2 + 20, sliceHeight);
    }
    ctx.restore();

    // Mountain Wireframe
    ctx.beginPath();
    ctx.strokeStyle = \`rgba(\${rgbSecondary.r}, \${rgbSecondary.g}, \${rgbSecondary.b}, 0.55)\`;
    ctx.lineWidth = 1.5;
    const points = 16;
    const mountainWidth = width / (points - 1);
    const peaks = [0.2, 0.4, 0.6, 0.3, 0.8, 0.5, 0.2, 0.7, 0.9, 0.4, 0.3, 0.6, 0.2, 0.5, 0.1, 0];
    ctx.moveTo(0, horizon);
    for (let i = 0; i < points; i++) {
      const px = i * mountainWidth;
      const py = horizon - peaks[i] * 65 * (Math.sin(i * 0.5) + 1.2);
      ctx.lineTo(px, py);
    }
    ctx.lineTo(width, horizon);
    ctx.stroke();

    // Cyber Horizon
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(width, horizon);
    ctx.strokeStyle = \`rgba(\${rgbPrimary.r}, \${rgbPrimary.g}, \${rgbPrimary.b}, 0.85)\`;
    ctx.lineWidth = 3;
    if (this.glow) {
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.primaryColor;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Grid Perspective converging lines
    const gridLines = 24;
    const vanishingX = width / 2 + (this.mouse.active ? (this.mouse.x - width / 2) * 0.12 : 0);

    for (let i = -6; i <= gridLines + 6; i++) {
      const targetX = (width / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(vanishingX, horizon);
      ctx.lineTo(targetX, height);

      const grad = ctx.createLinearGradient(vanishingX, horizon, targetX, height);
      grad.addColorStop(0, \`rgba(\${rgbSecondary.r}, \ \${rgbSecondary.g}, \${rgbSecondary.b}, 0.08)\`);
      grad.addColorStop(0.4, \`rgba(\${rgbSecondary.r}, \${rgbSecondary.g}, \${rgbSecondary.b}, 0.25)\`);
      grad.addColorStop(1, \`rgba(\${rgbPrimary.r}, \${rgbPrimary.g}, \${rgbPrimary.b}, 0.6)\`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Grid horizontal perspective lines
    const baseGap = 2.4;
    let currentY = horizon;
    while (currentY < height) {
      const ratio = (currentY - horizon) / (height - horizon);
      const step = baseGap + ratio * 48;
      currentY += step;
      const animY = currentY + this.scrollOffset * (ratio + 0.1);

      if (animY > horizon && animY < height) {
        const animRatio = (animY - horizon) / (height - horizon);
        ctx.beginPath();
        ctx.moveTo(0, animY);
        ctx.lineTo(width, animY);
        ctx.strokeStyle = \`rgba(\${rgbPrimary.r}, \${rgbPrimary.g}, \${rgbPrimary.b}, \${animRatio * 0.45})\`;
        ctx.lineWidth = 0.5 + animRatio * 1.5;
        ctx.stroke();
      }
    }
  }`;

      case 'particle-vortex':
        return `  // --- QUANTUM VORTEX LOGIC ---
  private initParticles(): void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.particles = [];
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * Math.min(width, height) * 0.4 + 20,
        orbitSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * this.particleSize + 1,
        pulseSpeed: Math.random() * 0.05 + 0.01,
        pulseState: Math.random() * Math.PI
      });
    }
  }

  private renderParticleVortex(ctx: CanvasRenderingContext2D, width: number, height: number, delta: number): void {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.12)';
    ctx.fillRect(0, 0, width, height);

    const rgbPrimary = this.hexToRgb(this.primaryColor);
    const rgbSecondary = this.hexToRgb(this.secondaryColor);

    const targetX = this.mouse.active ? this.mouse.x : width / 2;
    const targetY = this.mouse.active ? this.mouse.y : height / 2;

    this.particles.forEach(p => {
      p.angle += p.orbitSpeed * this.speed * delta;
      p.pulseState += p.pulseSpeed * delta;

      const currentSize = p.size + Math.sin(p.pulseState) * 0.7;
      const px = targetX + Math.cos(p.angle) * p.radius;
      const py = targetY + Math.sin(p.angle) * p.radius;

      const maxRad = Math.min(width, height) * 0.6;
      const distRatio = Math.min(1, p.radius / maxRad);

      const r = Math.floor(rgbPrimary.r * (1 - distRatio) + rgbSecondary.r * distRatio);
      const g = Math.floor(rgbPrimary.g * (1 - distRatio) + rgbSecondary.g * distRatio);
      const b = Math.floor(rgbPrimary.b * (1 - distRatio) + rgbSecondary.b * distRatio);

      ctx.beginPath();
      ctx.arc(px, py, Math.max(0.5, currentSize), 0, Math.PI * 2);
      ctx.fillStyle = \`rgba(\${r}, \${g}, \${b}, \${0.4 + Math.sin(p.pulseState) * 0.3})\`;
      ctx.fill();

      p.radius += Math.sin(p.pulseState * 0.15) * 0.3 * this.speed * delta;
    });

    // Central Sphere Glow Core
    ctx.beginPath();
    ctx.arc(targetX, targetY, 4, 0, Math.PI * 2);
    ctx.fillStyle = this.primaryColor;
    if (this.glow) {
      ctx.shadowBlur = 15;
      ctx.shadowColor = this.primaryColor;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
  }`;

      case 'quantum-waves':
        return `  // --- QUANTUM WAVES FLOW LOGIC ---
  private initParticles(): void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.particles = [];
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: (Math.random() * 0.5 + 0.5) * this.speed,
        waveFrequency: Math.random() * 0.01 + 0.002,
        waveAmplitude: Math.random() * 40 + 10,
        baseY: Math.random() * height,
        size: Math.random() * this.particleSize + 1.2,
        pulse: Math.random() * Math.PI
      });
    }
  }

  private renderQuantumWaves(ctx: CanvasRenderingContext2D, width: number, height: number, delta: number): void {
    ctx.fillStyle = 'rgba(10, 10, 16, 0.1)';
    ctx.fillRect(0, 0, width, height);

    const rgbPrimary = this.hexToRgb(this.primaryColor);
    const rgbSecondary = this.hexToRgb(this.secondaryColor);

    // Draw flowing background guide waves
    for (let wave = 0; wave < 3; wave++) {
      ctx.beginPath();
      ctx.strokeStyle = \`rgba(\${rgbSecondary.r}, \${rgbSecondary.g}, \${rgbSecondary.b}, \${0.08 - wave * 0.025})\`;
      for (let x = 0; x < width; x += 15) {
        const time = performance.now() * 0.001 * this.speed;
        const waveY = height * (0.35 + wave * 0.15) + 
                      Math.sin(x * 0.003 + time + wave) * 60 + 
                      Math.cos(x * 0.001 + time * 0.5) * 35;
        if (x === 0) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }
      ctx.stroke();
    }

    // Render flow quantum dots
    this.particles.forEach(p => {
      p.x += p.speed * 2.5 * delta;

      if (p.x > width) {
        p.x = 0;
        p.baseY = Math.random() * height;
      }

      p.pulse += p.waveFrequency * this.speed * delta;
      const targetY = p.baseY + Math.sin(p.x * 0.005 + p.pulse) * p.waveAmplitude;
      p.y += (targetY - p.y) * 0.15 * delta;

      // Mouse magnetism pull
      if (this.mouse.active) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const pull = (150 - dist) / 150;
          p.y += (dy / dist) * pull * 4.5 * delta;
        }
      }

      const hRatio = p.y / height;
      const r = Math.floor(rgbPrimary.r * (1 - hRatio) + rgbSecondary.r * hRatio);
      const g = Math.floor(rgbPrimary.g * (1 - hRatio) + rgbSecondary.g * hRatio);
      const b = Math.floor(rgbPrimary.b * (1 - hRatio) + rgbSecondary.b * hRatio);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = \`rgba(\${r}, \${g}, \${b}, \${0.5 + Math.sin(p.pulse) * 0.4})\`;
      ctx.fill();
    });
  }`;
    }
  };

  const tsCode = `import { Component, ElementRef, ViewChild, Input, OnInit, OnDestroy, NgZone, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-tech-animation',
  templateUrl: './tech-animation.component.html',
  styleUrls: ['./tech-animation.component.css'],
  standalone: true
})
export class TechAnimationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('animCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  // Input properties to customize dynamically via your Angular templates
  @Input() particleCount = ${config.presetId === 'cyber-grid' ? 0 : config.particleCount};
  @Input() speed = ${config.speed};
  @Input() primaryColor = '${config.primaryColor}';
  @Input() secondaryColor = '${config.secondaryColor}';
  @Input() backgroundColor = '${config.backgroundColor}';
  @Input() glow = ${config.glow};
  @Input() interactivity: 'gravity' | 'repulsion' | 'none' = '${config.interactivity}';
  @Input() particleSize = ${config.particleSize};
  @Input() lineDistance = ${config.lineDistance};
  @Input() lineWidth = ${config.lineWidth};

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId!: number;
  private lastTime = 0;
  
  // High-performance particle cache
  private particles: any[] = [];
  
  // Mouse interaction state
  private mouse = { x: -1000, y: -1000, active: false };

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    // Initial structures loaded
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    this.initParticles();

    // CRITICAL PERFORMANCE: Run animation loop outside of Angular Zone.
    // This stops Angular from running Change Detection on every single frame!
    this.ngZone.runOutsideAngular(() => {
      this.lastTime = performance.now();
      this.animate(this.lastTime);
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeCanvas();
    this.initParticles();
  }

  private resizeCanvas(): void {
    const parent = this.canvas.parentElement;
    if (parent) {
      this.canvas.width = parent.clientWidth;
      this.canvas.height = parent.clientHeight;
    } else {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  // Mouse/Touch trackers
  onMouseMove(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;
    this.mouse.active = true;
  }

  onMouseLeave(): void {
    this.mouse.x = -1000;
    this.mouse.y = -1000;
    this.mouse.active = false;
  }

  onTouchMove(event: TouchEvent): void {
    if (event.touches.length > 0) {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = event.touches[0].clientX - rect.left;
      this.mouse.y = event.touches[0].clientY - rect.top;
      this.mouse.active = true;
    }
  }

  onTouchEnd(): void {
    this.mouse.x = -1000;
    this.mouse.y = -1000;
    this.mouse.active = false;
  }

  private animate(timestamp: number): void {
    const delta = (timestamp - this.lastTime) / 16.666;
    this.lastTime = timestamp;

    this.render(delta);
    
    this.animationFrameId = requestAnimationFrame((time) => this.animate(time));
  }

  private render(delta: number): void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    this.renderPreset(this.ctx, width, height, delta);
  }

  private renderPreset(ctx: CanvasRenderingContext2D, width: number, height: number, delta: number): void {
${generateCanvasTsLogic(config.presetId)}

    // Render custom preset
    this.${config.presetId === 'neural-grid' ? 'renderNeuralGrid' : config.presetId === 'matrix-rain' ? 'renderMatrixRain' : config.presetId === 'cyber-grid' ? 'renderCyberGrid' : config.presetId === 'particle-vortex' ? 'renderParticleVortex' : 'renderQuantumWaves'}(ctx, width, height, delta);
  }

  // Hexadecimal to RGB utility
  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const shorthandRegex = /^#?([a-f\\d])([a-f\\d])([a-f\\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(fullHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 255, b: 204 };
  }
}
`;

  const htmlCode = `<div class="animation-container">
  <canvas 
    #animCanvas 
    (mousemove)="onMouseMove($event)" 
    (mouseleave)="onMouseLeave()"
    (touchmove)="onTouchMove($event)"
    (touchend)="onTouchEnd()"
    class="glowing-canvas">
  </canvas>
</div>
`;

  const cssCode = `/* styles para o container preencher a tela ou banner */
.animation-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0; /* Fica atrás do seu conteúdo */
  background-color: ${config.backgroundColor};
}

.glowing-canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: crosshair;
}
`;

  const docsMarkdown = `### Como integrar no Angular (Guia Passo-a-Passo)

Esta animação foi criada com **HTML5 Canvas** de altíssima performance. Ao rodar fora do ciclo de detecção do Angular (\`NgZone.runOutsideAngular\`), ela gasta quase **0% de CPU** e entrega **60 FPS constantes** para impressionar seus clientes!

#### Passo 1: Criar o Componente
Gere o componente em seu projeto Angular rodando o comando CLI:
\`\`\`bash
ng generate component components/tech-animation --standalone
\`\`\`

#### Passo 2: Copiar o Código
1. Copie o código gerado na aba **TypeScript** e substitua todo o conteúdo de \`tech-animation.component.ts\`.
2. Copie o código na aba **HTML** para \`tech-animation.component.html\`.
3. Copie o código na aba **CSS** para \`tech-animation.component.css\`.

#### Passo 3: Declarar e Usar no Componente Pai
Em qualquer página (ex: \`home.component.ts\`), importe o componente de animação:

\`\`\`typescript
import { TechAnimationComponent } from './components/tech-animation/tech-animation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TechAnimationComponent], // <-- Adicione aqui!
  template: \`
    <div class="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      <!-- A animação fica no fundo da seção Hero -->
      <app-tech-animation 
        [speed]="${config.speed}" 
        [primaryColor]="'${config.primaryColor}'"
        [secondaryColor]="'${config.secondaryColor}'">
      </app-tech-animation>
      
      <!-- Seu conteúdo de vendas/landing page sobreposto -->
      <div class="relative z-10 text-center px-4 max-w-3xl">
        <h1 class="text-5xl font-extrabold text-white tracking-tight mb-4">
          Inovação Tecnológica de Ponta
        </h1>
        <p class="text-xl text-slate-300 mb-8">
          Criamos soluções digitais escaláveis com experiências imersivas para atrair mais clientes.
        </p>
        <button class="bg-gradient-to-r from-cyan-400 to-indigo-500 hover:scale-105 transition-all text-black font-bold px-8 py-3.5 rounded-full shadow-lg shadow-cyan-500/20">
          Iniciar Projeto Tech
        </button>
      </div>
    </div>
  \`
})
export class HomeComponent {}
\`\`\`

---

### 🔥 Dicas para Atrair Clientes Visualmente:
1. **Contraste de Camadas (Layers)**: Coloque o componente \`app-tech-animation\` em uma div com posicionamento \`relative\`, use \`z-0\` na animação e \`z-10\` no conteúdo do site.
2. **Textos com Efeito Neon**: Combine a animação com títulos usando classes de gradiente do Tailwind (ex: \`bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent\`).
3. **Seções de Entrada**: Use a animação em seções estratégicas de conversão (Banner de Entrada, Background da Seção de Serviços ou Rodapé de Chamado para Ação/Contatos).
`;

  return (
    <div className="flex flex-col h-full bg-[#0d0d14] rounded-2xl border border-slate-800/80 overflow-hidden" id="code-exporter-container">
      {/* File Exporter Tabs */}
      <div className="flex items-center justify-between px-4 bg-slate-950/80 border-b border-slate-800/80 py-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('ts')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all ${
              activeTab === 'ts'
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40 font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            tech-animation.component.ts
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all ${
              activeTab === 'html'
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40 font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            tech-animation.component.html
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all ${
              activeTab === 'css'
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40 font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            tech-animation.component.css
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
              activeTab === 'docs'
                ? 'bg-violet-950 text-violet-300 border border-violet-800/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Manual de Instalação 🇧🇷
          </button>
        </div>

        <div>
          {activeTab !== 'docs' && (
            <button
              onClick={() => {
                const codeMap = { ts: tsCode, html: htmlCode, css: cssCode, docs: docsMarkdown };
                copyToClipboard(codeMap[activeTab], activeTab);
              }}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-lg text-xs font-sans text-slate-300 hover:text-white transition-all active:scale-95"
            >
              {copiedFile === activeTab ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Clipboard className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Code Display Area */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-slate-300 max-h-[500px] scrollbar-thin">
        {activeTab === 'ts' && (
          <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800/50 overflow-x-auto leading-relaxed select-all">
            <code>{tsCode}</code>
          </pre>
        )}

        {activeTab === 'html' && (
          <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800/50 overflow-x-auto leading-relaxed select-all">
            <code>{htmlCode}</code>
          </pre>
        )}

        {activeTab === 'css' && (
          <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800/50 overflow-x-auto leading-relaxed select-all">
            <code>{cssCode}</code>
          </pre>
        )}

        {activeTab === 'docs' && (
          <div className="font-sans text-sm text-slate-300 max-w-none prose prose-invert prose-slate select-text">
            <div className="mb-4 p-3 bg-indigo-950/40 border border-indigo-900/40 rounded-xl flex items-start gap-3">
              <Terminal className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-indigo-300 text-sm mb-1">
                  Código Customizado Ativo: <span className="text-cyan-400">{getPresetName(config.presetId)}</span>
                </h4>
                <p className="text-slate-400 text-xs">
                  O código acima foi modificado automaticamente com os parâmetros que você ajustou na barra lateral. Copie os arquivos, cole no seu projeto Angular e veja o resultado imediatamente!
                </p>
              </div>
            </div>

            <div className="space-y-6 leading-relaxed">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5 mb-2">
                  <span className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded text-xs font-mono">1</span>
                  Criar o Componente no Angular CLI
                </h3>
                <p className="text-slate-400 text-xs mb-2">
                  No terminal do seu projeto Angular, execute o comando para criar um componente isolado do tipo <strong className="text-slate-200">Standalone</strong>:
                </p>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex justify-between items-center group">
                  <code className="text-cyan-400 text-xs font-mono">ng generate component components/tech-animation --standalone</code>
                  <button
                    onClick={() => copyToClipboard('ng generate component components/tech-animation --standalone', 'cli')}
                    className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copiar comando"
                  >
                    {copiedFile === 'cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5 text-slate-400" />}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5 mb-2">
                  <span className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded text-xs font-mono">2</span>
                  Colar os Arquivos Gerados
                </h3>
                <p className="text-slate-400 text-xs">
                  Substitua os arquivos <code className="text-slate-200 font-mono">.ts</code>, <code className="text-slate-200 font-mono">.html</code> e <code className="text-slate-200 font-mono">.css</code> gerados pelo CLI do Angular pelos códigos correspondentes que geramos nas abas acima. Todos eles estão integrados e configurados para renderizar o design exato que você vê na tela!
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5 mb-2">
                  <span className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded text-xs font-mono">3</span>
                  Exemplo Prático de Como Importar e Usar
                </h3>
                <p className="text-slate-400 text-xs mb-3">
                  Importe o <code className="text-slate-200 font-mono">TechAnimationComponent</code> no array de imports do seu módulo ou outro componente Standalone. Veja este exemplo prático de um banner de boas-vindas:
                </p>
                <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-[11px] leading-normal font-mono text-slate-400 overflow-x-auto">
{`import { Component } from '@angular/core';
import { TechAnimationComponent } from './components/tech-animation/tech-animation.component';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [TechAnimationComponent], // <-- Adicione o componente standalone aqui!
  template: \`
    <section class="hero-section">
      <!-- 1. Fundo Animado com Parâmetros Customizáveis -->
      <app-tech-animation 
        [speed]="${config.speed}"
        [primaryColor]="'${config.primaryColor}'"
        [secondaryColor]="'${config.secondaryColor}'"
        [particleCount]="${config.particleCount}">
      </app-tech-animation>

      <!-- 2. Conteúdo de Vendas Interativo na frente -->
      <div class="hero-content">
        <span class="tech-badge">REVOLUCIONE SUA PRESENÇA</span>
        <h1>Inovação que Atrai Clientes</h1>
        <p>Desenvolvemos portfólios, landing pages e portais inteligentes com interfaces imersivas que convertem visitas em vendas reais.</p>
        <div class="cta-actions">
          <button class="btn-primary">Descobrir Soluções</button>
          <button class="btn-secondary">Portfólio</button>
        </div>
      </div>
    </section>
  \`,
  styles: [\`
    .hero-section {
      position: relative;
      width: 100%;
      height: 100vh;
      min-height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .hero-content {
      position: relative;
      z-index: 10;
      text-align: center;
      max-width: 680px;
      padding: 2rem;
      font-family: 'Inter', sans-serif;
    }
    .tech-badge {
      background: rgba(0, 255, 204, 0.1);
      color: #00ffcc;
      border: 1px solid rgba(0, 255, 204, 0.2);
      padding: 0.35rem 1rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
    h1 {
      font-size: 3.5rem;
      font-weight: 800;
      color: white;
      margin-top: 1rem;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }
    p {
      color: #94a3b8;
      font-size: 1.125rem;
      margin-top: 1.25rem;
      line-height: 1.6;
    }
    .cta-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }
    .btn-primary {
      background: linear-gradient(to right, #00ffcc, #3b82f6);
      color: #000;
      font-weight: 700;
      padding: 0.85rem 2rem;
      border-radius: 0.5rem;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 255, 204, 0.3);
    }
    .btn-secondary {
      background: transparent;
      color: white;
      border: 1px solid #334155;
      font-weight: 600;
      padding: 0.85rem 2rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-secondary:hover {
      background: rgba(255,255,255,0.05);
      border-color: #475569;
    }
  \`]
})
export class HeroComponent {}`}
                </pre>
              </div>

              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-100 text-sm">Por que isso atrai clientes?</h4>
                <p className="text-slate-400 text-xs">
                  Clientes são atraídos pelo **profissionalismo** e **cuidado aos detalhes** no desenvolvimento. Landing pages estáticas e sem graça causam alta taxa de rejeição. Uma animação fluida, reativa ao movimento do mouse e que respeita as diretrizes de design tech cria um ambiente futurista e inovador. Isso demonstra diretamente que sua empresa ou cliente domina tecnologias web de ponta!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
