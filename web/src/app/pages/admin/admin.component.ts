import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div class="max-w-6xl mx-auto px-4">
        <h1 class="text-4xl font-bold mb-8">Painel Administrativo</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div class="p-6 bg-slate-700/50 border border-blue-500/30 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 text-blue-300">Projetos</h3>
            <p class="text-slate-300 mb-4">Gerenciar e editar projetos do portfólio</p>
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition">
              Acessar
            </button>
          </div>

          <div class="p-6 bg-slate-700/50 border border-blue-500/30 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 text-blue-300">Blog</h3>
            <p class="text-slate-300 mb-4">Criar, editar e publicar artigos de blog</p>
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition">
              Acessar
            </button>
          </div>

          <div class="p-6 bg-slate-700/50 border border-blue-500/30 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 text-blue-300">Leads</h3>
            <p class="text-slate-300 mb-4">Visualizar e gerenciar leads capturados</p>
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition">
              Acessar
            </button>
          </div>

          <div class="p-6 bg-slate-700/50 border border-blue-500/30 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 text-blue-300">Usuários</h3>
            <p class="text-slate-300 mb-4">Gerenciar clientes e usuários do sistema</p>
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition">
              Acessar
            </button>
          </div>

          <div class="p-6 bg-slate-700/50 border border-blue-500/30 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 text-blue-300">Tickets</h3>
            <p class="text-slate-300 mb-4">Gerenciar tickets de suporte dos clientes</p>
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition">
              Acessar
            </button>
          </div>

          <div class="p-6 bg-slate-700/50 border border-blue-500/30 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 text-blue-300">Depoimentos</h3>
            <p class="text-slate-300 mb-4">Adicionar e gerenciar depoimentos de clientes</p>
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition">
              Acessar
            </button>
          </div>
        </div>

        <div class="p-8 bg-slate-700/50 border border-blue-500/30 rounded-lg">
          <h2 class="text-2xl font-bold mb-6">Métricas</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="p-4 bg-slate-800/50 rounded">
              <p class="text-slate-400 text-sm">Total de Leads</p>
              <p class="text-3xl font-bold text-blue-400">247</p>
            </div>
            <div class="p-4 bg-slate-800/50 rounded">
              <p class="text-slate-400 text-sm">Posts Publicados</p>
              <p class="text-3xl font-bold text-blue-400">12</p>
            </div>
            <div class="p-4 bg-slate-800/50 rounded">
              <p class="text-slate-400 text-sm">Projetos Ativos</p>
              <p class="text-3xl font-bold text-blue-400">8</p>
            </div>
            <div class="p-4 bg-slate-800/50 rounded">
              <p class="text-slate-400 text-sm">Tickets Abertos</p>
              <p class="text-3xl font-bold text-blue-400">5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminComponent {}
