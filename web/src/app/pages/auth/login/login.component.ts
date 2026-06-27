import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslocoModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900/20 py-12 px-4">
      <div class="max-w-md w-full bg-slate-800/50 border border-blue-500/30 rounded-lg p-8">
        <h2 class="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {{ "header.auth.login" | transloco }}
        </h2>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              formControlName="email"
              class="w-full px-4 py-2 bg-slate-700/50 border border-blue-500/30 rounded text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Senha</label>
            <input
              type="password"
              formControlName="password"
              class="w-full px-4 py-2 bg-slate-700/50 border border-blue-500/30 rounded text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            class="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded hover:shadow-lg hover:shadow-blue-500/50 transition"
          >
            {{ "header.auth.login" | transloco }}
          </button>
        </form>

        <div class="mt-6 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-blue-500/20"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-slate-800/50 text-slate-400">Ou</span>
          </div>
        </div>

        <button
          class="w-full mt-6 py-2 border border-blue-500/50 text-blue-300 font-semibold rounded hover:border-blue-500 transition"
        >
          Entrar com Google
        </button>

        <p class="text-center text-slate-400 text-sm mt-6">
          Não tem conta?
          <a routerLink="/signup" class="text-blue-400 hover:text-blue-300">Cadastre-se</a>
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post('/api/auth/login', this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/client']);
        },
        error: (err) => {
          console.error('Login error', err);
        },
      });
    }
  }
}
