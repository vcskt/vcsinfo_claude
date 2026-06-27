import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslocoModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900/20 py-12 px-4">
      <div class="max-w-md w-full bg-slate-800/50 border border-blue-500/30 rounded-lg p-8">
        <h2 class="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {{ "header.auth.signup" | transloco }}
        </h2>

        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Nome</label>
            <input
              type="text"
              formControlName="name"
              class="w-full px-4 py-2 bg-slate-700/50 border border-blue-500/30 rounded text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              placeholder="Seu Nome"
            />
          </div>

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
            {{ "header.auth.signup" | transloco }}
          </button>
        </form>

        <p class="text-center text-slate-400 text-sm mt-6">
          Já tem conta?
          <a routerLink="/login" class="text-blue-400 hover:text-blue-300">Faça login</a>
        </p>
      </div>
    </div>
  `,
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  signupForm = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
  });

  onSubmit() {
    if (this.signupForm.valid) {
      this.http.post('/api/auth/signup', this.signupForm.value).subscribe({
        next: () => {
          this.router.navigate(['/client']);
        },
        error: (err) => {
          console.error('Signup error', err);
        },
      });
    }
  }
}
