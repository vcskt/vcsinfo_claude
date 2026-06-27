import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-animation-hero',
  standalone: true,
  template: `
    <div #containerRef class="relative w-full h-full min-h-screen overflow-hidden">
      <canvas #canvasRef class="absolute inset-0 block w-full h-full" />
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
export class AnimationHeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('containerRef') containerRef!: ElementRef;
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

  private animationFrameId: number | null = null;
  private lastTime = 0;
  private columns: any[] = [];
  private width = 0;
  private height = 0;

  ngAfterViewInit() {
    this.initCanvas();
    this.animate();
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
    this.width = canvas.width;
    this.height = canvas.height;

    // Resize observer
    const observer = new ResizeObserver(() => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      this.width = canvas.width;
      this.height = canvas.height;
      this.initColumns();
    });
    observer.observe(container);

    this.initColumns();
  }

  private initColumns() {
    const charWidth = 14;
    const columnCount = Math.ceil(this.width / charWidth);

    this.columns = [];
    for (let i = 0; i < columnCount; i++) {
      const chars: string[] = [];
      for (let j = 0; j < 30; j++) {
        chars.push(Math.random() > 0.5 ? '1' : '0');
      }
      this.columns.push({
        x: i * charWidth,
        y: Math.random() * this.height,
        speed: Math.random() * 3 + 2,
        chars: chars
      });
    }
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      this.animationFrameId = requestAnimationFrame(this.animate);
      return;
    }

    const now = performance.now();
    const delta = this.lastTime ? (now - this.lastTime) / 16.666 : 1;
    this.lastTime = now;

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.font = 'bold 14px monospace';
    ctx.textBaseline = 'top';

    // Render columns
    for (const col of this.columns) {
      col.y += col.speed * delta;

      // Reset when off screen
      if (col.y > this.height && Math.random() > 0.95) {
        col.y = -300;
        col.speed = Math.random() * 3 + 2;
      }

      // Randomize chars
      if (Math.random() > 0.9) {
        col.chars.shift();
        col.chars.push(Math.random() > 0.5 ? '1' : '0');
      }

      // Draw chars
      for (let i = 0; i < col.chars.length; i++) {
        const char = col.chars[i];
        const charY = col.y - i * 16;

        if (charY < -20 || charY > this.height) continue;

        const alpha = 1 - (i / col.chars.length);

        if (i === 0) {
          ctx.fillStyle = '#00ff88';
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 10;
        } else if (i < 4) {
          ctx.fillStyle = `rgba(0, 255, 136, ${alpha * 0.8})`;
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 5;
        } else if (i < 10) {
          ctx.fillStyle = `rgba(0, 180, 100, ${alpha * 0.5})`;
          ctx.shadowBlur = 2;
        } else {
          ctx.fillStyle = `rgba(0, 100, 50, ${alpha * 0.3})`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, col.x, charY);
      }
    }

    ctx.shadowBlur = 0;
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
