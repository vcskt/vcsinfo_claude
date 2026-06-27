import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div class="max-w-6xl mx-auto px-4">
        <h1 class="text-4xl font-bold mb-8">Área do Cliente</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div class="p-6 bg-slate-700/50 border border-blue-500/30 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 text-blue-300">Meu Perfil</h3>
            <p class="text-slate-300 mb-4">Edite suas informações pessoais e preferências</p>
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition">
              Acessar
            </button>
          </div>

          <div class="p-6 bg-slate-700/50 border border-blue-500/30 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 text-blue-300">Meus Projetos</h3>
            <p class="text-slate-300 mb-4">Acompanhe o status de todos os seus projetos</p>
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition">
              Ver Projetos
            </button>
          </div>

          <div class="p-6 bg-slate-700/50 border border-blue-500/30 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 text-blue-300">Tickets & Suporte</h3>
            <p class="text-slate-300 mb-4">Abra tickets e acompanhe o suporte</p>
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition">
              Ver Tickets
            </button>
          </div>

          <div class="p-6 bg-slate-700/50 border border-blue-500/30 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 text-blue-300">Downloads</h3>
            <p class="text-slate-300 mb-4">Acesse arquivos e documentos disponibilizados</p>
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition">
              Ver Downloads
            </button>
          </div>

          <div class="p-6 bg-slate-700/50 border border-blue-500/30 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 text-blue-300">Notificações</h3>
            <p class="text-slate-300 mb-4">Atualizações sobre seus projetos e tickets</p>
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition">
              Ver Notificações
            </button>
          </div>

          <div class="p-6 bg-slate-700/50 border border-blue-500/30 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 text-blue-300">Sair</h3>
            <p class="text-slate-300 mb-4">Finalize sua sessão com segurança</p>
            <button class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition">
              Logout
            </button>
          </div>
        </div>

        <div class="p-8 bg-slate-700/50 border border-blue-500/30 rounded-lg">
          <h2 class="text-2xl font-bold mb-4">Resumo da Conta</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4" *ngIf="summary$ | async as summary">
            <div>
              <p class="text-slate-400">Projetos Ativos</p>
              <p class="text-3xl font-bold text-blue-400">{{ summary.activeProjects }}</p>
            </div>
            <div>
              <p class="text-slate-400">Tickets Abertos</p>
              <p class="text-3xl font-bold text-blue-400">{{ summary.openTickets }}</p>
            </div>
            <div>
              <p class="text-slate-400">Última Atualização</p>
              <p class="text-lg text-slate-300">{{ summary.lastUpdate | date: 'dd/MM/yyyy' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ClientComponent implements OnInit {
  private http = inject(HttpClient);
  summary$ = this.http.get<any>('/api/client/summary');

  ngOnInit() {}
}
