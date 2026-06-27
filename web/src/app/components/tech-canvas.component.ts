import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tech-canvas',
  standalone: true,
  template: `
    <div #containerRef class="relative w-full h-full min-h-screen overflow-hidden bg-slate-950">
      <canvas
        #canvasRef
        class="absolute inset-0 block w-full h-full cursor-crosshair"
        (mousemove)="onMouseMove($event)"
        (mouseleave)="onMouseLeave()"
        (touchmove)="onTouchMove($event)"
        (touchend)="onTouchEnd()"
      ></canvas>
      <!-- FPS Counter -->
      <div class="absolute bottom-4 left-4 z-10 select-none bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80 font-mono text-[11px] text-slate-400 flex items-center gap-3">
        <span class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" ></span>
          FPS: <span class="text-emerald-400 font-semibold">{{ fps }}</span>
        </span>
        <span class="text-slate-600">|</span>
        <span>
          PRESET: <span class="text-cyan-400 uppercase font-semibold">NEURAL GRID</span>
        </span>
        <span class="text-slate-600">|</span>
        <span>
          NODES: <span class="text-violet-400 font-semibold">{{ particleCount }}</span>
        </span>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class TechCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('containerRef') containerRef!: ElementRef;
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

  fps = 0;
  particleCount = 80;

  private mouse = { x: -1000, y: -1000, active: false };
  private particles: any[] = [];
  private animationFrameId: number | null = null;
  private lastTime = 0;
  private fpsInterval = 0;
  private frameCount = 0;

  // Config
  private config = {
    primaryColor: '#0ea5e9',
    secondaryColor: '#06b6d4',
    backgroundColor: '#0a0a0f',
    particleCount: 80,
    speed: 1.2,
    lineDistance: 150,
    lineWidth: 1.2,
    particleSize: 2.5,
    glow: true,
    interactivity: 'gravity' as 'gravity' | 'repulsion'
  };

  ngAfterViewInit() {
    this.initCanvas();
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const container = this.containerRef.nativeElement;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // ResizeObserver for responsive canvas
    const observer = new ResizeObserver(() => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      this.initParticles(canvas.width, canvas.height);
    });
    observer.observe(container);

    this.initParticles(canvas.width, canvas.height);
  }

  private initParticles(width: number, height: number) {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * this.config.particleSize + 1,
      });
    }
    this.particleCount = this.particles.length;
  }

  private hexToRgb(hex: string) {
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
  }

  private startAnimation() {
    this.lastTime = performance.now();
    this.fpsInterval = this.lastTime;

    const animate = (timestamp: number) => {
      const canvas = this.canvasRef.nativeElement;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        this.animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // FPS calculation
      this.frameCount++;
      if (timestamp - this.fpsInterval >= 1000) {
        this.fps = this.frameCount;
        this.frameCount = 0;
        this.fpsInterval = timestamp;
      }

      const delta = (timestamp - this.lastTime) / 16.666;
      this.lastTime = timestamp;

      this.renderFrame(ctx, canvas.width, canvas.height, delta);
      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  private renderFrame(ctx: CanvasRenderingContext2D, width: number, height: number, delta: number) {
    const primary = this.hexToRgb(this.config.primaryColor);
    const secondary = this.hexToRgb(this.config.secondaryColor);

    // Clear background
    ctx.fillStyle = this.config.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Setup glow
    if (this.config.glow) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.config.primaryColor;
    } else {
      ctx.shadowBlur = 0;
    }

    // Render neural grid
    this.renderNeuralGrid(ctx, width, height, delta, primary, secondary);
  }

  private renderNeuralGrid(ctx: CanvasRenderingContext2D, width: number, height: number, delta: number, primary: any, secondary: any) {
    const speedMult = this.config.speed;
    const lineDist = this.config.lineDistance;

    // Update particles
    this.particles.forEach(p => {
      p.x += p.vx * speedMult * delta;
      p.y += p.vy * speedMult * delta;

      // Mouse interaction
      if (this.mouse.active) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          if (this.config.interactivity === 'gravity') {
            p.x += (dx / dist) * force * 2 * delta;
            p.y += (dy / dist) * force * 2 * delta;
          }
        }
      }

      // Edge bouncing
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

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.85)`;
      ctx.fill();
    });

    ctx.shadowBlur = 0;

    // Draw connections
    ctx.lineWidth = this.config.lineWidth;
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;
        const maxDistSq = lineDist * lineDist;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = 1 - dist / lineDist;
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

      // Connection to mouse
      if (this.mouse.active) {
        const dx = p1.x - this.mouse.x;
        const dy = p1.y - this.mouse.y;
        const distSq = dx * dx + dy * dy;
        const mouseMaxDist = 180;
        if (distSq < mouseMaxDist * mouseMaxDist) {
          const dist = Math.sqrt(distSq);
          const alpha = 1 - dist / mouseMaxDist;
          ctx.strokeStyle = `rgba(${primary.r}, ${primary.g}, ${primary.b}, ${alpha * 0.6})`;
          ctx.lineWidth = this.config.lineWidth * 1.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(this.mouse.x, this.mouse.y);
          ctx.stroke();
          ctx.lineWidth = this.config.lineWidth;
        }
      }
    }
  }

  onMouseMove(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    };
  }

  onMouseLeave() {
    this.mouse = { x: -1000, y: -1000, active: false };
  }

  onTouchMove(event: TouchEvent) {
    if (event.touches[0]) {
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      this.mouse = {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
        active: true,
      };
    }
  }

  onTouchEnd() {
    this.mouse = { x: -1000, y: -1000, active: false };
  }
}
