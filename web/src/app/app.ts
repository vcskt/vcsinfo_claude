import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    HeaderComponent,
    FooterComponent,
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-white text-slate-900">
      <app-header></app-header>
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './app.css',
})
export class App {
  private translocoService = inject(TranslocoService);

  constructor() {
    // Set active language from localStorage (browser only), default to 'pt'
    const savedLang =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('lang') || 'pt'
        : 'pt';
    this.translocoService.setActiveLang(savedLang);
  }
}
