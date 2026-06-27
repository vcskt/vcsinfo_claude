import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  template: `
    <div class="min-h-screen py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div class="max-w-6xl mx-auto px-4">
        <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {{ "services.title" | transloco }}
        </h1>
        <p class="text-xl text-slate-300 mb-12 max-w-3xl">
          Soluções completas em Protheus (TOTVS) e Angular. Customizações, integrações, frontend moderno e sustentação técnica.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="p-8 rounded-lg bg-slate-700/50 border border-blue-500/30 hover:border-blue-500 transition">
            <h3 class="text-2xl font-semibold mb-4 text-blue-300">ADVPL & TLPP</h3>
            <p class="text-slate-300">
              Customizações avançadas no Protheus. Desenvolvimento em ADVPL e TLPP com melhores práticas, performance e segurança.
            </p>
            <ul class="mt-4 space-y-2 text-slate-400 text-sm">
              <li>✓ Desenvolvimento de rotinas custom</li>
              <li>✓ Integração com módulos Protheus</li>
              <li>✓ Otimização de performance</li>
              <li>✓ Suporte e manutenção</li>
            </ul>
          </div>

          <div class="p-8 rounded-lg bg-slate-700/50 border border-blue-500/30 hover:border-blue-500 transition">
            <h3 class="text-2xl font-semibold mb-4 text-blue-300">Angular & PO-UI</h3>
            <p class="text-slate-300">
              Interfaces web modernas e responsivas. Componentes PO-UI, Angular standalone, SSR e otimizações para melhor UX.
            </p>
            <ul class="mt-4 space-y-2 text-slate-400 text-sm">
              <li>✓ Componentes PO-UI customizados</li>
              <li>✓ Angular 19+ standalone</li>
              <li>✓ Server-side rendering (SSR)</li>
              <li>✓ PWA e offline support</li>
            </ul>
          </div>

          <div class="p-8 rounded-lg bg-slate-700/50 border border-blue-500/30 hover:border-blue-500 transition">
            <h3 class="text-2xl font-semibold mb-4 text-blue-300">Integrações & APIs</h3>
            <p class="text-slate-300">
              Conecte seus sistemas. APIs REST, webhooks, ETL, sincronização de dados e integrações com terceiros.
            </p>
            <ul class="mt-4 space-y-2 text-slate-400 text-sm">
              <li>✓ APIs REST em NestJS</li>
              <li>✓ Webhooks e eventos</li>
              <li>✓ ETL e sincronização</li>
              <li>✓ Integrações com ERP, CRM, etc</li>
            </ul>
          </div>

          <div class="p-8 rounded-lg bg-slate-700/50 border border-blue-500/30 hover:border-blue-500 transition">
            <h3 class="text-2xl font-semibold mb-4 text-blue-300">Sustentação & Suporte</h3>
            <p class="text-slate-300">
              Mantenha seus sistemas rodando. Monitoramento, correção de bugs, otimizações e suporte técnico contínuo.
            </p>
            <ul class="mt-4 space-y-2 text-slate-400 text-sm">
              <li>✓ Monitoramento 24/7</li>
              <li>✓ Suporte técnico rápido</li>
              <li>✓ Patches e atualizações</li>
              <li>✓ Otimização contínua</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ServicesComponent {}
