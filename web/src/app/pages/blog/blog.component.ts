import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslocoModule, FormsModule],
  template: `
    <div class="min-h-screen py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div class="max-w-6xl mx-auto px-4">
        <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Blog
        </h1>
        <p class="text-xl text-slate-300 mb-8">
          Artigos, tutoriais e análises sobre Protheus, Angular e desenvolvimento web.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div
            class="rounded-lg bg-slate-700/50 border border-blue-500/30 overflow-hidden hover:border-blue-500 transition cursor-pointer"
            *ngFor="let post of posts$ | async"
          >
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs px-2 py-1 bg-blue-500/20 rounded text-blue-300">
                  {{ post.category }}
                </span>
              </div>
              <h3 class="text-lg font-semibold mb-2 text-blue-300">{{ post.title }}</h3>
              <p class="text-slate-400 text-sm mb-4">{{ post.excerpt }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-slate-500">
                  {{ post.publishedAt | date: 'dd/MM/yyyy' }}
                </span>
                <a
                  [routerLink]="['/blog', post.slug]"
                  class="text-blue-400 hover:text-blue-300 text-sm font-semibold"
                >
                  Ler →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center" *ngIf="!(posts$ | async)">
          <p class="text-slate-400">Carregando posts...</p>
        </div>
      </div>
    </div>
  `,
})
export class BlogComponent implements OnInit {
  private http = inject(HttpClient);
  private transloco = inject(TranslocoService);
  posts$ = this.http.get<any[]>(`/api/blog?locale=${this.transloco.getActiveLang()}`);

  ngOnInit() {}
}
