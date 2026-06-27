import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { AnimationHeroComponent } from '../../components/animation-hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslocoModule, AnimationHeroComponent],
  template: `
    <div class="min-h-screen bg-slate-950 text-white">
      <!-- HERO SECTION WITH MATRIX RAIN ANIMATION -->
      <section class="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-black">
        <!-- Matrix Rain Background Animation -->
        <app-animation-hero class="absolute inset-0 z-0"></app-animation-hero>

        <!-- Content Overlay -->
        <div class="relative z-20">

        <!-- Content -->
        <div class="max-w-4xl mx-auto text-center">
          <!-- Main title - DIRECT & POWERFUL -->
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-title">
            Seu Protheus é arma competitiva
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
              ou custo operacional?
            </span>
          </h1>

          <!-- Subheading - The Promise -->
          <p class="text-2xl md:text-3xl text-blue-300 font-bold mb-8 animate-fade-in-up animation-delay-200">
            Transformamos em 90 dias
          </p>

          <!-- What They Get -->
          <div class="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto space-y-3 animate-fade-in-up animation-delay-300">
            <p>✓ <span class="font-semibold text-white">$2.3M economizados</span> no primeiro ano</p>
            <p>✓ <span class="font-semibold text-white">90 dias</span> de implementação (não 18 meses)</p>
            <p>✓ <span class="font-semibold text-white">95% adoção</span> dos usuários em 30 dias</p>
            <p>✓ <span class="font-semibold text-white">Zero downtime</span> na migração</p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <button class="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg shadow-blue-900/50 hover:shadow-blue-800/70">
              Como Começar (Diagnóstico Grátis)
            </button>
            <button class="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-blue-500 rounded-lg font-bold text-lg transition-all duration-300">
              Ver Resultados Reais
            </button>
          </div>
        </div>
        </div>

        <style>
          @keyframes title {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-title {
            animation: title 0.8s ease-out forwards;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }

          .animation-delay-200 {
            animation-delay: 200ms;
          }

          .animation-delay-300 {
            animation-delay: 300ms;
          }

          .animation-delay-400 {
            animation-delay: 400ms;
          }

          @keyframes grid-move {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(40px, 40px);
            }
          }

          .animate-grid {
            animation: grid-move 8s linear infinite;
          }

          @keyframes node-move-1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(10px, -10px); }
          }

          @keyframes node-move-2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-15px, 10px); }
          }

          @keyframes node-move-3 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(12px, 8px); }
          }

          @keyframes node-move-4 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-10px, -12px); }
          }

          @keyframes node-move-5 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(8px, 15px); }
          }

          .animate-node-1 { animation: node-move-1 6s ease-in-out infinite; }
          .animate-node-2 { animation: node-move-2 6.5s ease-in-out infinite; }
          .animate-node-3 { animation: node-move-3 7s ease-in-out infinite; }
          .animate-node-4 { animation: node-move-4 6.2s ease-in-out infinite; }
          .animate-node-5 { animation: node-move-5 7.2s ease-in-out infinite; }

          @keyframes line-grow-1 {
            0% { stroke-width: 0; opacity: 0; }
            50% { opacity: 0.8; }
            100% { stroke-width: 2; opacity: 0.4; }
          }

          @keyframes line-grow-2 {
            0% { stroke-width: 0; opacity: 0; }
            50% { opacity: 0.8; }
            100% { stroke-width: 2; opacity: 0.4; }
          }

          @keyframes line-grow-3 {
            0% { stroke-width: 0; opacity: 0; }
            50% { opacity: 0.5; }
            100% { stroke-width: 1; opacity: 0.3; }
          }

          @keyframes line-grow-4 {
            0% { stroke-width: 0; opacity: 0; }
            50% { opacity: 0.5; }
            100% { stroke-width: 1; opacity: 0.3; }
          }

          @keyframes line-grow-5 {
            0% { stroke-width: 0; opacity: 0; }
            50% { opacity: 0.5; }
            100% { stroke-width: 1; opacity: 0.3; }
          }

          .animate-line-1 { animation: line-grow-1 4s ease-out infinite; }
          .animate-line-2 { animation: line-grow-2 4.3s ease-out infinite; }
          .animate-line-3 { animation: line-grow-3 4.6s ease-out infinite; }
          .animate-line-4 { animation: line-grow-4 4.9s ease-out infinite; }
          .animate-line-5 { animation: line-grow-5 5.2s ease-out infinite; }

          @keyframes data-flow {
            0% { offset-distance: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }

          /* NEW IMPACT ANIMATION */
          @keyframes searchPulse {
            0%, 100% { r: 50px; opacity: 0.4; }
            50% { r: 70px; opacity: 0.1; }
          }

          .animate-search-pulse {
            animation: searchPulse 2s ease-out infinite;
          }

          @keyframes particleFlow {
            0% { opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
          }

          .animate-particle-1 { animation: particleFlow 3s ease-in-out infinite; }
          .animate-particle-2 { animation: particleFlow 3s ease-in-out infinite 0.2s; }
          .animate-particle-3 { animation: particleFlow 3s ease-in-out infinite 0.4s; }
          .animate-particle-4 { animation: particleFlow 3s ease-in-out infinite 0.6s; }
          .animate-particle-5 { animation: particleFlow 3s ease-in-out infinite 0.8s; }

          @keyframes flowLine {
            0%, 100% { stroke-dasharray: 300; stroke-dashoffset: 300; }
            50% { stroke-dasharray: 300; stroke-dashoffset: 0; }
          }

          .animate-flow-line {
            stroke-dasharray: 300;
            animation: flowLine 3s ease-in-out infinite;
          }

          @keyframes gridForm {
            0% { opacity: 0; }
            50% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }

          .animate-grid-form {
            animation: gridForm 4s ease-in-out infinite;
          }

          @keyframes solutionPulse {
            0%, 100% { r: 60px; stroke-width: 3; }
            50% { r: 75px; stroke-width: 2; }
          }

          .animate-solution-pulse {
            animation: solutionPulse 2.5s ease-in-out infinite;
          }

          @keyframes checkmarkDraw {
            0% { stroke-dasharray: 100; stroke-dashoffset: 100; }
            100% { stroke-dasharray: 100; stroke-dashoffset: 0; }
          }

          .animate-checkmark {
            stroke-dasharray: 100;
            animation: checkmarkDraw 1.5s ease-out forwards;
            animation-delay: 3s;
          }

          @keyframes rayPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }

          .animate-ray-1 { animation: rayPulse 2s ease-in-out infinite; animation-delay: 3.5s; }
          .animate-ray-2 { animation: rayPulse 2s ease-in-out infinite; animation-delay: 3.7s; }
          .animate-ray-3 { animation: rayPulse 2s ease-in-out infinite; animation-delay: 3.9s; }
          .animate-ray-4 { animation: rayPulse 2s ease-in-out infinite; animation-delay: 4.1s; }
          .animate-ray-5 { animation: rayPulse 2s ease-in-out infinite; animation-delay: 4.3s; }

          @keyframes fadeTextIn {
            0%, 20% { opacity: 0; }
            40%, 100% { opacity: 1; }
          }

          .animate-fade-text {
            animation: fadeTextIn 5s ease-out;
          }

          @keyframes dataTransform {
            0% { transform: translateX(-50px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }

          .animate-data-transform {
            animation: dataTransform 2s ease-out forwards;
            animation-delay: 1s;
          }

          @keyframes solutionReveal {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }

          .animate-solution-reveal {
            animation: solutionReveal 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            animation-delay: 3s;
          }
        </style>
      </section>

      <!-- CASE STUDY HERO SECTION -->
      <section class="py-24 px-4 bg-slate-950 relative overflow-hidden border-t border-slate-800">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <!-- Left side - Case Study -->
            <div class="animate-fade-in">
              <div class="inline-block mb-4 px-3 py-1 bg-blue-900/50 rounded-full text-blue-300 text-sm font-semibold">
                CASE STUDY • INDUSTRIAL
              </div>
              <h2 class="text-4xl font-bold text-white mb-6">
                Como uma fabricante economizou \$2.3M
              </h2>
              <p class="text-lg text-slate-400 mb-8 leading-relaxed">
                Implementação de Protheus 12 + Angular com migração de legacy system. Redução de ciclo de vendas e automação de processos financeiros.
              </p>

              <!-- Key Metrics Box -->
              <div class="grid grid-cols-3 gap-4 mb-8 p-6 bg-blue-900/20 rounded-xl border border-blue-500/30">
                <div>
                  <div class="text-2xl font-bold text-blue-400">6 meses</div>
                  <div class="text-sm text-slate-400">vs 18 meses padrão</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-blue-400">\$2.3M</div>
                  <div class="text-sm text-slate-400">ROI em 12 meses</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-blue-400">95%</div>
                  <div class="text-sm text-slate-400">Adoção em 30 dias</div>
                </div>
              </div>

              <!-- Results List -->
              <div class="space-y-3 mb-8">
                <div class="flex items-start">
                  <span class="text-green-400 mr-3 text-xl mt-1">✓</span>
                  <span class="text-slate-300"><span class="font-semibold text-white">45% mais rápido</span> no fechamento mensal</span>
                </div>
                <div class="flex items-start">
                  <span class="text-green-400 mr-3 text-xl mt-1">✓</span>
                  <span class="text-slate-300"><span class="font-semibold text-white">60% redução</span> em processos manuais</span>
                </div>
                <div class="flex items-start">
                  <span class="text-green-400 mr-3 text-xl mt-1">✓</span>
                  <span class="text-slate-300"><span class="font-semibold text-white">Zero downtime</span> na migração</span>
                </div>
                <div class="flex items-start">
                  <span class="text-green-400 mr-3 text-xl mt-1">✓</span>
                  <span class="text-slate-300"><span class="font-semibold text-white">99.9% uptime</span> pós-launch</span>
                </div>
              </div>

              <!-- Client Quote -->
              <blockquote class="border-l-4 border-blue-400 pl-6 py-4 italic text-slate-300">
                "A VCS Info não é um fornecedor, é um parceiro estratégico. Resolveram nossa implementação em tempo recorde."
                <footer class="text-sm text-slate-500 mt-2 not-italic">— Diretor de Operações, Fabricante 500+ funcionários</footer>
              </blockquote>
            </div>

            <!-- Right side - Isometric 3D Box with Benefits -->
            <div class="perspective h-96 flex items-center justify-center">
              <div class="animate-isometric w-72 h-72 relative" style="transform-style: preserve-3d;">
                <!-- Cube Front Face -->
                <div class="absolute w-56 h-56 bg-gradient-to-br from-blue-600 to-blue-700 opacity-90" style="transform: translateZ(112px); border: 2px solid #0ea5e9; box-shadow: inset 0 0 30px rgba(14, 165, 233, 0.3);">
                  <div class="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <div class="text-5xl font-black text-blue-200 mb-2">⚡</div>
                    <div class="text-2xl font-bold text-white">Implementação</div>
                    <div class="text-sm text-blue-200 mt-2">6 meses</div>
                  </div>
                </div>

                <!-- Cube Top Face -->
                <div class="absolute w-56 h-28 bg-gradient-to-b from-cyan-400 to-cyan-500 opacity-75" style="transform: rotateX(90deg) translateZ(112px); border: 2px solid #06b6d4;">
                  <div class="w-full h-full flex items-center justify-center">
                    <span class="text-white font-bold text-lg">Stack Moderna</span>
                  </div>
                </div>

                <!-- Cube Right Face -->
                <div class="absolute w-28 h-56 bg-gradient-to-r from-blue-500 to-blue-600 opacity-80" style="transform: rotateY(90deg) translateZ(112px); border: 2px solid #3b82f6;">
                  <div class="w-full h-full flex flex-col items-center justify-center text-center px-2">
                    <div class="text-white font-bold text-sm">ROI</div>
                    <div class="text-white font-black text-xl">400%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>
          @keyframes isometric-rotate {
            0% {
              transform: rotateX(20deg) rotateY(-30deg) rotateZ(0deg);
            }
            100% {
              transform: rotateX(20deg) rotateY(-30deg) rotateZ(360deg);
            }
          }

          .animate-isometric {
            animation: isometric-rotate 20s linear infinite;
          }
        </style>
      </section>

      <!-- TRUST & CERTIFICATION SECTION -->
      <section class="py-12 px-4 bg-slate-950 border-b border-slate-800">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-8">
            <p class="text-slate-400 text-sm font-semibold tracking-widest uppercase">Confiado por líderes industriais</p>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <!-- Client Logos (real o fake) -->
            <div class="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-700">
              <span class="text-2xl">📦</span>
              <span class="text-white font-semibold">TOTVS Certified</span>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-700">
              <span class="text-2xl">🏆</span>
              <span class="text-white font-semibold">40+ Implementações</span>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-700">
              <span class="text-2xl">⭐</span>
              <span class="text-white font-semibold">98% Satisfação</span>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-700">
              <span class="text-2xl">📈</span>
              <span class="text-white font-semibold">\$500M+ Implementado</span>
            </div>
          </div>
        </div>
      </section>

      <!-- VALUE PROPOSITION SECTION -->
      <section class="py-24 px-4 bg-slate-950">
        <div class="max-w-6xl mx-auto">
          <div class="mb-16 animate-fade-in">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
              Por que empresas escolhem a VCS Info
            </h2>
            <p class="text-xl text-slate-400 max-w-3xl">
              Metodologia comprovada que reduz risco, acelera time-to-value, e garante ROI
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Card 1 - Reduz Risco -->
            <div class="group animate-fade-in-up animation-delay-200 cursor-pointer">
              <div class="h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/50 overflow-hidden">
                <div class="w-full h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-6xl font-bold">
                  60%
                </div>
                <div class="p-6">
                  <h3 class="text-2xl font-bold text-white mb-3">Menos Risco</h3>
                  <p class="text-slate-400 leading-relaxed">
                    Metodologia comprovada reduz chance de falha em implementação. Change management incluído. Zero downtime.
                  </p>
                  <div class="mt-4 text-blue-400 font-semibold text-sm">
                    ✓ Evita custos de \$2-5M em falhas
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 2 - Acelera Implementação -->
            <div class="group animate-fade-in-up animation-delay-300 cursor-pointer">
              <div class="h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/50 overflow-hidden">
                <div class="w-full h-48 bg-gradient-to-br from-cyan-600 to-cyan-800 flex items-center justify-center text-white">
                  <div class="text-center">
                    <div class="text-4xl font-bold">6 meses</div>
                    <div class="text-sm text-cyan-200">vs 18 meses padrão</div>
                  </div>
                </div>
                <div class="p-6">
                  <h3 class="text-2xl font-bold text-white mb-3">Time-to-Value 3x Mais Rápido</h3>
                  <p class="text-slate-400 leading-relaxed">
                    Implementação acelerada com metodologia otimizada. Time dedicado 100%. Go-live em tempo recorde.
                  </p>
                  <div class="mt-4 text-blue-400 font-semibold text-sm">
                    ✓ Economiza 12 meses de operação
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 3 - ROI Garantido -->
            <div class="group animate-fade-in-up animation-delay-400 cursor-pointer">
              <div class="h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/50 overflow-hidden">
                <div class="w-full h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white text-6xl font-bold">
                  400%
                </div>
                <div class="p-6">
                  <h3 class="text-2xl font-bold text-white mb-3">ROI Comprovado</h3>
                  <p class="text-slate-400 leading-relaxed">
                    Implementações geram 150-400% ROI em 12-36 meses. Reduz processos manuais em 60%.
                  </p>
                  <div class="mt-4 text-blue-400 font-semibold text-sm">
                    ✓ Média \$2.3M economizado/ano
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SERVICES SECTION - IMPACT FOCUSED -->
      <section class="py-24 px-4 bg-slate-950 border-t border-slate-800">
        <div class="max-w-6xl mx-auto">
          <div class="mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
              Serviços que Entregam Resultados
            </h2>
            <p class="text-xl text-slate-400">
              De diagnóstico até go-live, garantindo implementação bem-sucedida com metodologia comprovada
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Service 1 - Discovery & Assessment -->
            <div class="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/30 transition-all duration-300">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <div class="text-3xl font-bold text-blue-400 mb-2">Discovery & Assessment</div>
                  <p class="text-slate-400 text-sm">Entender = Acertar</p>
                </div>
                <span class="text-4xl">🔍</span>
              </div>
              <ul class="space-y-3 text-slate-300 mb-6">
                <li class="flex items-start">
                  <span class="text-blue-400 mr-3 mt-1">→</span>
                  <span>Diagnóstico detalhado de sistemas legados</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-400 mr-3 mt-1">→</span>
                  <span>Roadmap de implementação customizado</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-400 mr-3 mt-1">→</span>
                  <span>Análise de risco e oportunidades de ROI</span>
                </li>
              </ul>
              <div class="text-blue-400 font-semibold text-sm pt-4 border-t border-slate-700">
                Entrega: Relatório executivo + proposta técnica em 2-3 semanas
              </div>
            </div>

            <!-- Service 2 - Rapid Implementation -->
            <div class="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/30 transition-all duration-300">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <div class="text-3xl font-bold text-blue-400 mb-2">Implementação Acelerada</div>
                  <p class="text-slate-400 text-sm">6 meses, não 18</p>
                </div>
                <span class="text-4xl">⚡</span>
              </div>
              <ul class="space-y-3 text-slate-300 mb-6">
                <li class="flex items-start">
                  <span class="text-blue-400 mr-3 mt-1">→</span>
                  <span>Implementação completa Protheus 12 + módulos</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-400 mr-3 mt-1">→</span>
                  <span>Migração de dados com zero downtime</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-400 mr-3 mt-1">→</span>
                  <span>Change management e treinamento inclusos</span>
                </li>
              </ul>
              <div class="text-blue-400 font-semibold text-sm pt-4 border-t border-slate-700">
                Garante: Adoção 95%+ em 30 dias pós-launch
              </div>
            </div>

            <!-- Service 3 - Modern Frontend -->
            <div class="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/30 transition-all duration-300">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <div class="text-3xl font-bold text-blue-400 mb-2">Front-end Moderno (Angular)</div>
                  <p class="text-slate-400 text-sm">Stack moderna para Protheus</p>
                </div>
                <span class="text-4xl">🎨</span>
              </div>
              <ul class="space-y-3 text-slate-300 mb-6">
                <li class="flex items-start">
                  <span class="text-blue-400 mr-3 mt-1">→</span>
                  <span>Customização PO-UI otimizada</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-400 mr-3 mt-1">→</span>
                  <span>Desenvolvimento Angular para dashboards e relatórios</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-400 mr-3 mt-1">→</span>
                  <span>Interface amigável + performance otimizada</span>
                </li>
              </ul>
              <div class="text-blue-400 font-semibold text-sm pt-4 border-t border-slate-700">
                Resultado: 40% mais rápido nos processos do usuário
              </div>
            </div>

            <!-- Service 4 - Risk Mitigation & Support -->
            <div class="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/30 transition-all duration-300">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <div class="text-3xl font-bold text-blue-400 mb-2">Mitigação de Risco & Suporte</div>
                  <p class="text-slate-400 text-sm">Segurança total pós-launch</p>
                </div>
                <span class="text-4xl">🛡️</span>
              </div>
              <ul class="space-y-3 text-slate-300 mb-6">
                <li class="flex items-start">
                  <span class="text-blue-400 mr-3 mt-1">→</span>
                  <span>Testes automatizados abrangentes (80%+ cobertura)</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-400 mr-3 mt-1">→</span>
                  <span>Suporte pós-implementação 90 dias (full-time)</span>
                </li>
                <li class="flex items-start">
                  <span class="text-blue-400 mr-3 mt-1">→</span>
                  <span>Otimização contínua + staff augmentation</span>
                </li>
              </ul>
              <div class="text-blue-400 font-semibold text-sm pt-4 border-t border-slate-700">
                Garante: 99.9% uptime + zero regressões
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA SECTION - ROI CALCULATOR -->
      <section class="py-20 px-4 bg-gradient-to-r from-slate-950 via-blue-900/30 to-slate-950 border-y border-slate-800">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
            Quanto você pode economizar?
          </h2>
          <p class="text-xl text-slate-300 mb-12">
            Use nossa calculadora de ROI para ver quanto sua empresa pode ganhar com Protheus + Angular
          </p>
          <button class="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg text-white transition-all duration-300 shadow-lg shadow-blue-900/50 hover:shadow-blue-800/70">
            Calcular Meu ROI Potencial
          </button>
        </div>
      </section>

      <!-- TESTIMONIALS SECTION -->
      <section class="py-24 px-4 bg-slate-950">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-4xl font-bold text-white mb-16 text-center">
            O que nossos clientes dizem
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Testimonial 1 -->
            <div class="p-8 bg-slate-900 rounded-xl border border-slate-700">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  JM
                </div>
                <div>
                  <p class="font-bold text-white">João Mendes</p>
                  <p class="text-sm text-slate-400">CTO, Fabricante São Paulo</p>
                </div>
              </div>
              <p class="text-slate-300 italic">
                "Implementação 3x mais rápida que o esperado. A metodologia da VCS Info é impecável."
              </p>
              <div class="mt-4 text-yellow-400">★★★★★</div>
            </div>

            <!-- Testimonial 2 -->
            <div class="p-8 bg-slate-900 rounded-xl border border-slate-700">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  CS
                </div>
                <div>
                  <p class="font-bold text-white">Cristiane Silva</p>
                  <p class="text-sm text-slate-400">Diretora Operacional, Distribuição</p>
                </div>
              </div>
              <p class="text-slate-300 italic">
                "Economizamos \$2.3M no primeiro ano. Parceria transformadora."
              </p>
              <div class="mt-4 text-yellow-400">★★★★★</div>
            </div>

            <!-- Testimonial 3 -->
            <div class="p-8 bg-slate-900 rounded-xl border border-slate-700">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  RP
                </div>
                <div>
                  <p class="font-bold text-white">Roberto Pereira</p>
                  <p class="text-sm text-slate-400">CEO, Indústria Química</p>
                </div>
              </div>
              <p class="text-slate-300 italic">
                "Zero downtime na migração. Processamento mensal agora em 2 dias."
              </p>
              <div class="mt-4 text-yellow-400">★★★★★</div>
            </div>
          </div>
        </div>
      </section>

      <!-- FINAL CTA -->
      <section class="py-24 px-4 bg-slate-950 border-t border-slate-800">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">
            Pronto para transformar seu Protheus?
          </h2>
          <p class="text-xl text-slate-300 mb-12">
            Solicite um assessment gratuito. Sem compromisso. Apenas análise do seu cenário.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg text-white transition-all duration-300 shadow-lg shadow-blue-900/50">
              Agendar Assessment (30 min)
            </button>
            <button class="px-10 py-4 bg-slate-800 hover:bg-slate-700 border border-blue-500 rounded-lg font-bold text-lg text-white transition-all duration-300">
              Falar com um Especialista
            </button>
          </div>
          <p class="text-slate-400 text-sm mt-8">
            Disponível para uma chamada de diagnóstico gratuita. Sem pressão de venda.
          </p>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class HomeComponent {}
