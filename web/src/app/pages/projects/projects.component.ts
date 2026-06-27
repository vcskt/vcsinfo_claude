import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslocoModule],
  template: `
    <div class="min-h-screen py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div class="max-w-6xl mx-auto px-4">
        <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {{ "projects.title" | transloco }}
        </h1>
        <p class="text-xl text-slate-300 mb-12">
          Projetos entregues com excelência. Protheus, Angular, customizações complexas e integrações.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" *ngIf="projects$ | async as projects">
          <div
            class="rounded-lg bg-slate-700/50 border border-blue-500/30 overflow-hidden hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition"
            *ngFor="let project of projects"
          >
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2 text-blue-300">{{ project.title }}</h3>
              <p class="text-slate-300 mb-4">{{ project.summary }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  class="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-xs text-blue-300"
                  *ngFor="let tech of project.techStack"
                >
                  {{ tech }}
                </span>
              </div>
              <a
                [routerLink]="['/projects', project.slug]"
                class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition"
              >
                Ver Detalhes
              </a>
            </div>
          </div>
        </div>

        <div class="text-center mt-12" *ngIf="!(projects$ | async)">
          <p class="text-slate-400">Carregando projetos...</p>
        </div>
      </div>
    </div>
  `,
})
export class ProjectsComponent implements OnInit {
  private http = inject(HttpClient);
  projects$ = this.http.get<any[]>('/api/projects');

  ngOnInit() {}
}
