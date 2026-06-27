import { useState } from 'react';
import { AnimationConfig } from './types';
import Sidebar from './components/Sidebar';
import CanvasRenderer from './components/CanvasRenderer';
import CodeExporter from './components/CodeExporter';
import { Cpu, Terminal, Eye, Code2, Sparkles, Layers, ArrowUpRight, Sliders, Zap } from 'lucide-react';

export default function App() {
  const [activeMode, setActiveMode] = useState<'visual' | 'studio'>('visual');
  const [config, setConfig] = useState<AnimationConfig>({
    presetId: 'neural-grid',
    particleCount: 100,
    speed: 1.0,
    primaryColor: '#00ffcc',
    secondaryColor: '#3b82f6',
    backgroundColor: '#050a0f',
    glow: true,
    interactivity: 'gravity',
    particleSize: 2.0,
    lineDistance: 110,
    lineWidth: 1.0,
    noiseScale: 0.01,
  });

  const changePreset = (presetId: 'neural-grid' | 'matrix-rain' | 'cyber-grid' | 'particle-vortex' | 'quantum-waves') => {
    const updated = { ...config, presetId };
    if (presetId === 'matrix-rain') {
      updated.particleCount = 50;
      updated.particleSize = 14;
    } else if (presetId === 'cyber-grid') {
      updated.particleCount = 0;
    } else if (presetId === 'particle-vortex') {
      updated.particleCount = 180;
      updated.particleSize = 1.5;
    } else if (presetId === 'quantum-waves') {
      updated.particleCount = 140;
      updated.particleSize = 1.8;
    } else {
      updated.particleCount = 100;
      updated.particleSize = 2;
    }
    setConfig(updated);
  };

  const setPalette = (primary: string, secondary: string, bg: string) => {
    setConfig({
      ...config,
      primaryColor: primary,
      secondaryColor: secondary,
      backgroundColor: bg,
    });
  };

  return (
    <div className="min-h-screen bg-[#06060a] text-slate-100 flex flex-col font-sans relative antialiased" id="app-root">
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-950/20 to-transparent pointer-events-none animate-pulse duration-5000" />

      {/* HEADER SECTION */}
      <header className="border-b border-slate-900/80 bg-[#06060a]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-md shadow-cyan-500/20">
            <Cpu className="w-5 h-5 text-black font-bold" />
            <div className="absolute -inset-0.5 bg-cyan-400 rounded-xl blur-md opacity-30 -z-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-white tracking-tight leading-none">
                Tech Animation Studio
              </h1>
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                Angular v19+
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Gerador de animações imersivas em HTML5 Canvas para atração de clientes
            </p>
          </div>
        </div>

        {/* MODE SWITCH BUTTONS */}
        <div className="flex items-center gap-1.5 bg-slate-950/90 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveMode('visual')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeMode === 'visual'
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-250'
            }`}
            id="mode-switch-visual"
          >
            <Eye className="w-3.5 h-3.5" />
            Apenas o Visual 🇧🇷
          </button>
          <button
            onClick={() => setActiveMode('studio')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeMode === 'studio'
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-250'
            }`}
            id="mode-switch-studio"
          >
            <Code2 className="w-3.5 h-3.5" />
            Estúdio Angular & Código
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ALTA PERFORMANCE (60 FPS)
          </span>
        </div>
      </header>

      {/* 1. APENAS O VISUAL - MOCKUP HERO SECTION FOR ATTRACTING CLIENTS */}
      {activeMode === 'visual' && (
        <div className="flex-1 flex flex-col relative overflow-hidden" id="visual-only-mode">
          
          {/* Active Interactive Animation Background */}
          <div className="absolute inset-0 z-0">
            <CanvasRenderer config={config} />
          </div>

          {/* Solid Top Gradient Shade */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#06060a] to-transparent pointer-events-none z-10" />
          
          {/* Interactive Floating Quick-Menu for Client Demo */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 rounded-2xl px-4 py-3 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Controle do Visual:
              </span>
            </div>

            {/* Micro selector buttons */}
            <div className="flex flex-wrap gap-1 justify-center">
              {[
                { id: 'neural-grid', name: 'Rede Neural' },
                { id: 'matrix-rain', name: 'Matrix' },
                { id: 'cyber-grid', name: 'Synthwave' },
                { id: 'particle-vortex', name: 'Vórtice' },
                { id: 'quantum-waves', name: 'Fluxo' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => changePreset(item.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${
                    config.presetId === item.id
                      ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Quick Palette Swapper */}
            <div className="flex items-center gap-1 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-3">
              {[
                { name: 'Teal', p: '#00ffcc', s: '#3b82f6', bg: '#050a0f' },
                { name: 'Neon', p: '#ff007f', s: '#00f0ff', bg: '#05050a' },
                { name: 'Green', p: '#10b981', s: '#047857', bg: '#040705' },
                { name: 'Sunset', p: '#f59e0b', s: '#ef4444', bg: '#0a0604' },
              ].map((palette) => (
                <button
                  key={palette.name}
                  onClick={() => setPalette(palette.p, palette.s, palette.bg)}
                  className="w-4 h-4 rounded-full border border-black/50 transition-all hover:scale-125 cursor-pointer relative group"
                  style={{ background: `linear-gradient(135deg, ${palette.p}, ${palette.s})` }}
                  title={palette.name}
                >
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 bg-black text-[8px] text-white px-1 rounded transition-opacity pointer-events-none whitespace-nowrap">
                    {palette.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Floating Settings Card on the Right (Interactive) */}
          <div className="absolute top-24 right-6 z-30 hidden lg:block w-72 bg-[#06060a]/90 backdrop-blur-md border border-slate-850 rounded-2xl p-5 shadow-2xl space-y-4 select-none pointer-events-auto">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Painel de Efeitos
              </span>
              <span className="text-[9px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase font-semibold">
                60 FPS
              </span>
            </div>

            {/* Speed Control */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">Velocidade da Onda</span>
                <span className="font-mono text-cyan-400">{config.speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={config.speed}
                onChange={(e) => setConfig({ ...config, speed: parseFloat(e.target.value) })}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Size Control */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">Tamanho da Partícula</span>
                <span className="font-mono text-cyan-400">{config.particleSize.toFixed(1)}px</span>
              </div>
              <input
                type="range"
                min="0.5"
                max={config.presetId === 'matrix-rain' ? 24 : 8}
                step="0.5"
                value={config.particleSize}
                onChange={(e) => setConfig({ ...config, particleSize: parseFloat(e.target.value) })}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Density Control */}
            {config.presetId !== 'cyber-grid' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300">Densidade / Elementos</span>
                  <span className="font-mono text-cyan-400">{config.particleCount}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max={config.presetId === 'particle-vortex' ? 300 : 200}
                  step="5"
                  value={config.particleCount}
                  onChange={(e) => setConfig({ ...config, particleCount: parseInt(e.target.value) })}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            )}

            {/* Interactivity selection */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Tipo de Interação:</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'gravity', label: 'Atrair' },
                  { id: 'repulse', label: 'Repelir' },
                  { id: 'none', label: 'Nenhuma' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setConfig({ ...config, interactivity: type.id as any })}
                    className={`py-1 rounded text-[10px] font-medium transition-all cursor-pointer ${
                      config.interactivity === type.id
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Glow Switch */}
            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-900">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400/20" />
                Brilho Neon (Glow)
              </span>
              <button
                onClick={() => setConfig({ ...config, glow: !config.glow })}
                className={`w-8 h-4.5 rounded-full relative transition-all ${
                  config.glow ? 'bg-cyan-500' : 'bg-slate-800'
                } cursor-pointer`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-all ${
                    config.glow ? 'left-4' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Premium Landing Content Overlay (Client Demonstration Content) */}
          <div className="flex-1 max-w-5xl mx-auto w-full px-6 flex flex-col justify-center relative z-25 py-20 select-none pointer-events-none">
            
            {/* Immersive visual content with glass-effect elements that are responsive */}
            <div className="max-w-2xl space-y-6 md:space-y-8 animate-fade-in">
              
              {/* Animated Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800/80 shadow-lg text-xs tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-slate-300 font-bold tracking-widest text-[10px] uppercase">
                  TECNOLOGIA INTERATIVA PREMIUM
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-cyan-400 font-bold font-mono text-[10px]">60 FPS FLUID</span>
              </div>

              {/* Spectacular agency-level display typography */}
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                  Experiências Digitais que <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">
                    Atraem Clientes
                  </span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-sans max-w-xl">
                  Capturamos a atenção dos seus visitantes nos primeiros segundos através de animações vetoriais fluidas, interativas e de altíssimo desempenho. Mostre inovação de verdade.
                </p>
              </div>

              {/* Glowing Call-to-actions (Interactive with pointer-events-auto so they can test click effects) */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2 pointer-events-auto">
                <button 
                  onClick={() => alert('Parabéns! Essa ação simula o início de contato de um lead qualificado atraído pela beleza do seu site.')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-cyan-500/15 cursor-pointer flex items-center gap-2"
                >
                  Falar com Especialista
                  <ArrowUpRight className="w-4 h-4 stroke-[3px]" />
                </button>
                <button 
                  onClick={() => setActiveMode('studio')}
                  className="px-6 py-3.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 hover:border-slate-700/80 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-slate-900 cursor-pointer"
                >
                  Exportar Componente Angular
                </button>
              </div>

              {/* Tech Spec Badges (Attract tech-focused leads) */}
              <div className="grid grid-cols-3 gap-3 pt-6 max-w-md border-t border-slate-800/30">
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-900/60">
                  <div className="font-mono text-lg font-bold text-cyan-400">100%</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">Foco em Canvas</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-900/60">
                  <div className="font-mono text-lg font-bold text-indigo-400">60 FPS</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">Sem Lag de Tela</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-900/60">
                  <div className="font-mono text-lg font-bold text-emerald-400">Oms</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">Delay de Entrada</div>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive footer for demonstration */}
          <div className="absolute bottom-6 right-6 z-20 hidden md:block select-none pointer-events-none text-slate-500 font-mono text-[10px] text-right">
            <p>CONEXÃO SENSORIZADA ATIVA // PROTÓTIPO DE PORTFÓLIO</p>
            <p className="text-cyan-500/60 mt-0.5">MOVA O CURSOR SOBRE A TELA PARA INTERAGIR</p>
          </div>

        </div>
      )}

      {/* 2. MODO ESTÚDIO - FULL COMPREHENSIVE DEVELOPER VIEW */}
      {activeMode === 'studio' && (
        <>
          {/* INTRODUCTORY BANNER FOR CLIENTS */}
          <section className="px-6 pt-5">
            <div className="max-w-7xl mx-auto bg-gradient-to-r from-cyan-950/25 via-slate-950/30 to-indigo-950/25 border border-slate-800/70 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
              {/* Decorative Corner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
              
              <div className="space-y-1.5 max-w-4xl">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-widest text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded-full border border-cyan-800/30 uppercase">
                  <Sparkles className="w-3 h-3" /> Atração Visual Inteligente
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Como encantar e atrair clientes de tecnologia através de animações premium?
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                  Landing pages tecnológicas de alta conversão utilizam elementos em movimento para prender a atenção do usuário nos primeiros 3 segundos. Com este gerador, você ajusta o comportamento visual na tela e exporta um componente <strong className="text-cyan-400">Angular Standalone</strong> otimizado que renderiza diretamente em Canvas — sem pesar no carregamento do site!
                </p>
              </div>
              
              <div className="shrink-0 flex gap-2">
                <div className="px-3.5 py-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 text-center min-w-[85px]">
                  <div className="font-mono text-lg font-bold text-emerald-400">+300%</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-wider">Engajamento</div>
                </div>
                <div className="px-3.5 py-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 text-center min-w-[85px]">
                  <div className="font-mono text-lg font-bold text-cyan-400">60 FPS</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-wider">Desempenho</div>
                </div>
              </div>
            </div>
          </section>

          {/* MAIN STUDIO AREA */}
          <main className="flex-1 px-6 py-6 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* SIDEBAR EDIT PANEL (4 COLS) */}
            <div className="lg:col-span-4 h-auto lg:h-[840px] sticky lg:top-24">
              <Sidebar config={config} onChange={setConfig} />
            </div>

            {/* PREVIEW + CODE OUTPUT PANEL (8 COLS) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* PREVIEW STAGE */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    Visualização do Site em Tempo Real
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">
                    Interativo: use o mouse sobre a tela
                  </span>
                </div>
                
                <div className="w-full h-[380px] md:h-[420px]">
                  <CanvasRenderer config={config} />
                </div>
              </div>

              {/* CODE EXPORTER PANEL */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-violet-400" />
                    Código de Integração para Angular
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Componente Standalone Otimizado
                  </span>
                </div>
                
                <CodeExporter config={config} />
              </div>

            </div>
          </main>
        </>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-950 mt-12 py-6 px-6 bg-slate-950/60 text-center text-[11px] text-slate-500 font-mono select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            Tech Animation Studio © {new Date().getFullYear()} — Criado para desenvolvedores Angular focados em alta conversão.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 font-sans text-xs">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Renderização em <span className="text-cyan-400 font-semibold">HTML5 Canvas 2D</span> com zero impacto de carregamento.
          </div>
        </div>
      </footer>
    </div>
  );
}
