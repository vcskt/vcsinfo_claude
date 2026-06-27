import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-matrix-rain',
  standalone: true,
  template: `
    <div #containerRef class="relative w-full h-full min-h-screen overflow-hidden bg-black">
      <canvas
        #canvasRef
        class="absolute inset-0 block w-full h-full"
        (mousemove)="onMouseMove($event)"
        (mouseleave)="onMouseLeave()"
      />
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
export class MatrixRainComponent implements AfterViewInit, OnDestroy {
  @ViewChild('containerRef') containerRef!: ElementRef;
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

  private animationFrameId: number | null = null;
  private lastTime = 0;
  private columns: any[] = [];
  private mouse = { x: 0, y: 0, active: false };

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

    // Initialize columns
    const charWidth = 14;
    const columnCount = Math.ceil(canvas.width / charWidth);

    this.columns = [];
    for (let i = 0; i < columnCount; i++) {
      this.columns.push({
        x: i * charWidth,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 2,
        chars: this.generateChars(Math.random() * 20 + 15)
      });
    }

    // Resize observer
    const observer = new ResizeObserver(() => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    });
    observer.observe(container);
  }

  private generateChars(count: number): string[] {
    const chars = [];
    for (let i = 0; i < count; i++) {
      chars.push(Math.random() > 0.5 ? '1' : '0');
    }
    return chars;
  }

  private startAnimation() {
    this.lastTime = performance.now();

    const animate = (timestamp: number) => {
      const canvas = this.canvasRef.nativeElement;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        this.animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const delta = (timestamp - this.lastTime) / 16.666;
      this.lastTime = timestamp;

      this.renderFrame(ctx, canvas.width, canvas.height, delta);
      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  private renderFrame(ctx: CanvasRenderingContext2D, width: number, height: number, delta: number) {
    // Black background with slight glow decay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Font setup
    ctx.font = 'bold 14px monospace';
    ctx.textBaseline = 'top';

    // Update and render columns
    this.columns.forEach((col: any) => {
      col.y += col.speed * delta;

      // Reset column when it falls off
      if (col.y > height && Math.random() > 0.97) {
        col.y = Math.random() * -100;
        col.speed = Math.random() * 3 + 2;
      }

      // Randomize characters
      if (Math.random() > 0.85) {
        col.chars.shift();
        col.chars.push(Math.random() > 0.5 ? '1' : '0');
      }

      // Mouse interaction
      let offsetX = 0;
      if (this.mouse.active) {
        const dx = this.mouse.x - col.x;
        const dist = Math.abs(dx);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          offsetX = (dx > 0 ? -1 : 1) * force * 40;
        }
      }

      const renderX = col.x + offsetX;

      // Render characters
      col.chars.forEach((char: string, index: number) => {
        const charY = col.y - index * 16;
        if (charY < 0 || charY > height) return;

        const alpha = 1 - (index / col.chars.length);

        if (index === 0) {
          // Bright leading character
          ctx.fillStyle = '#00ff88';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00ff88';
        } else if (index < 3) {
          // Bright green trail
          ctx.fillStyle = `rgba(0, 255, 136, ${alpha * 0.9})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#00ff88';
        } else if (index < 8) {
          // Medium green
          ctx.fillStyle = `rgba(0, 200, 100, ${alpha * 0.7})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#00cc88';
        } else {
          // Fading dim green
          ctx.fillStyle = `rgba(0, 100, 50, ${alpha * 0.4})`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, renderX, charY);
      });
    });

    ctx.shadowBlur = 0;
  }

  onMouseMove(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true
    };
  }

  onMouseLeave() {
    this.mouse = { x: 0, y: 0, active: false };
  }
}
