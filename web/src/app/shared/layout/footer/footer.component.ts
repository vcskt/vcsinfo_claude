import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslocoModule],
  template: `
    <footer class="bg-slate-950 border-t border-blue-500/20 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Top -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <!-- Brand -->
          <div>
            <h3 class="text-lg font-bold mb-4">VCS Info</h3>
            <p class="text-slate-400 text-sm">
              {{ "footer.company" | transloco }}
            </p>
          </div>

          <!-- Links -->
          <div>
            <h4 class="font-semibold mb-4">{{ "header.nav.services" | transloco }}</h4>
            <ul class="space-y-2 text-sm text-slate-400">
              <li><a href="#" class="hover:text-blue-400">ADVPL & TLPP</a></li>
              <li><a href="#" class="hover:text-blue-400">Angular & PO-UI</a></li>
              <li><a href="#" class="hover:text-blue-400">Integrações</a></li>
              <li><a href="#" class="hover:text-blue-400">Sustentação</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">{{ "header.nav.home" | transloco }}</h4>
            <ul class="space-y-2 text-sm text-slate-400">
              <li><a routerLink="/projects" class="hover:text-blue-400">{{ "header.nav.projects" | transloco }}</a></li>
              <li><a routerLink="/blog" class="hover:text-blue-400">{{ "header.nav.blog" | transloco }}</a></li>
              <li><a href="#" class="hover:text-blue-400">{{ "footer.links.contact" | transloco }}</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">{{ "footer.links.privacy" | transloco }}</h4>
            <ul class="space-y-2 text-sm text-slate-400">
              <li><a href="#" class="hover:text-blue-400">{{ "footer.links.privacy" | transloco }}</a></li>
              <li><a href="#" class="hover:text-blue-400">{{ "footer.links.terms" | transloco }}</a></li>
            </ul>
          </div>
        </div>

        <!-- Divider -->
        <hr class="border-blue-500/20 mb-8" />

        <!-- Bottom -->
        <div class="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>{{ "footer.copyright" | transloco }}</p>
          <div class="flex gap-6 mt-4 md:mt-0">
            <a href="#" class="hover:text-blue-400">LinkedIn</a>
            <a href="#" class="hover:text-blue-400">GitHub</a>
            <a href="#" class="hover:text-blue-400">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {}
