import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslocoModule],
  template: `
    <header class="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-blue-500/20">
      <nav class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo -->
        <a routerLink="/" class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {{ "header.logo" | transloco }}
        </a>

        <!-- Nav Links -->
        <ul class="hidden md:flex gap-8 items-center">
          <li>
            <a routerLink="/" class="hover:text-blue-400 transition">
              {{ "header.nav.home" | transloco }}
            </a>
          </li>
          <li>
            <a routerLink="/services" class="hover:text-blue-400 transition">
              {{ "header.nav.services" | transloco }}
            </a>
          </li>
          <li>
            <a routerLink="/projects" class="hover:text-blue-400 transition">
              {{ "header.nav.projects" | transloco }}
            </a>
          </li>
          <li>
            <a routerLink="/blog" class="hover:text-blue-400 transition">
              {{ "header.nav.blog" | transloco }}
            </a>
          </li>
        </ul>

        <!-- Language Selector + Auth -->
        <div class="flex gap-4 items-center">
          <select
            [value]="currentLang$ | async"
            (change)="changeLang($event)"
            class="bg-slate-800 border border-blue-500/30 rounded px-3 py-1 text-sm cursor-pointer hover:border-blue-500/50"
          >
            <option value="pt">PT</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>

          <a
            routerLink="/login"
            class="px-4 py-2 rounded border border-blue-500/50 hover:border-blue-500 text-blue-400 hover:text-blue-300 transition"
          >
            {{ "header.auth.login" | transloco }}
          </a>
        </div>
      </nav>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  private translocoService = inject(TranslocoService);
  currentLang$ = this.translocoService.langChanges$;

  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('lang', lang);
  }
}
