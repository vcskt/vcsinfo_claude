import { AnimationConfig, PresetId, InteractivityType } from '../types';
import { Sliders, Sparkles, Palette, Zap, Cpu, Settings, Eye } from 'lucide-react';

interface SidebarProps {
  config: AnimationConfig;
  onChange: (newConfig: AnimationConfig) => void;
}

const PRESETS = [
  {
    id: 'neural-grid' as PresetId,
    name: 'Rede Neural',
    desc: 'Nós e conexões que se ligam por distância com física gravitacional sob o mouse.',
  },
  {
    id: 'matrix-rain' as PresetId,
    name: 'Chuva Binária',
    desc: 'Fluxos verticais de caracteres binários no estilo Matrix com rastro digital.',
  },
  {
    id: 'cyber-grid' as PresetId,
    name: 'Grid Synthwave',
    desc: 'Linhas de perspectiva infinita movendo-se sob um sol vetorial cyberpunk.',
  },
  {
    id: 'particle-vortex' as PresetId,
    name: 'Vórtice Quântico',
    desc: 'Nebulosa de partículas orbitando um núcleo energético reativo ao cursor.',
  },
  {
    id: 'quantum-waves' as PresetId,
    name: 'Ondas de Fluxo',
    desc: 'Ondulações fluidas de faíscas que se moldam dinamicamente pelo vento magnético.',
  },
];

const THEME_PALETTES = [
  {
    name: 'Cyberpunk Neon',
    primary: '#ff007f',
    secondary: '#00f0ff',
    bg: '#05050a',
  },
  {
    name: 'Quantum Teal',
    primary: '#00ffcc',
    secondary: '#3b82f6',
    bg: '#050a0f',
  },
  {
    name: 'Matrix Green',
    primary: '#10b981',
    secondary: '#047857',
    bg: '#040705',
  },
  {
    name: 'Cosmic Purple',
    primary: '#a855f7',
    secondary: '#ec4899',
    bg: '#080510',
  },
  {
    name: 'Sunset Gold',
    primary: '#f59e0b',
    secondary: '#ef4444',
    bg: '#0a0604',
  },
  {
    name: 'Slate Minimal',
    primary: '#cbd5e1',
    secondary: '#475569',
    bg: '#0a0d12',
  },
];

export default function Sidebar({ config, onChange }: SidebarProps) {
  const handlePresetSelect = (presetId: PresetId) => {
    // Merge defaults for clean switching experience
    const updated = { ...config, presetId };
    
    // Auto tune standard particle counts based on preset for best visual performance
    if (presetId === 'matrix-rain') {
      updated.particleCount = 50; // columns computed inside anyway
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
    
    onChange(updated);
  };

  const applyPalette = (palette: typeof THEME_PALETTES[0]) => {
    onChange({
      ...config,
      primaryColor: palette.primary,
      secondaryColor: palette.secondary,
      backgroundColor: palette.bg,
    });
  };

  return (
    <div className="flex flex-col gap-6 bg-[#0a0a0f]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 text-slate-200 h-full overflow-y-auto scrollbar-thin max-h-[100%] select-none" id="sidebar-container">
      {/* Sidebar Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800/80">
        <div className="p-2 bg-cyan-950 text-cyan-400 rounded-xl border border-cyan-800/40">
          <Cpu className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h2 className="font-sans font-bold tracking-tight text-white text-base">Configurações</h2>
          <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Painel de Customização</p>
        </div>
      </div>

      {/* 1. PRESETS SELECTOR */}
      <div className="space-y-3">
        <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Estilo Visual da Animação
        </label>
        <div className="grid grid-cols-1 gap-2">
          {PRESETS.map((p) => {
            const isSelected = config.presetId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handlePresetSelect(p.id)}
                className={`group text-left px-3.5 py-3 rounded-xl border transition-all duration-350 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/40 to-slate-950 border-cyan-500/80 shadow-lg shadow-cyan-500/5'
                    : 'bg-slate-950/30 border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-950/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold font-sans ${isSelected ? 'text-cyan-400' : 'text-slate-200'}`}>
                    {p.name}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400" />
                  )}
                </div>
                <p className="text-[10px] leading-relaxed text-slate-400 group-hover:text-slate-300">
                  {p.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. THEME COLOR PALETTES */}
      <div className="space-y-3">
        <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-violet-400" />
          Paletas de Cores Tech
        </label>
        <div className="grid grid-cols-2 gap-2">
          {THEME_PALETTES.map((palette) => (
            <button
              key={palette.name}
              onClick={() => applyPalette(palette)}
              className="flex flex-col items-start p-2 rounded-lg bg-slate-950/40 border border-slate-800/60 hover:border-slate-700/80 transition-all cursor-pointer text-left"
            >
              <span className="text-[9px] font-medium text-slate-400 mb-1.5 truncate w-full">
                {palette.name}
              </span>
              <div className="flex items-center gap-1">
                <span
                  className="w-3.5 h-3.5 rounded-md border border-black/40 shadow-sm"
                  style={{ backgroundColor: palette.primary }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-md border border-black/40 shadow-sm"
                  style={{ backgroundColor: palette.secondary }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-md border border-black/40 shadow-sm"
                  style={{ backgroundColor: palette.bg }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. SIMULATION PARAMS */}
      <div className="space-y-4 pt-2 border-t border-slate-800/40">
        <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-emerald-400" />
          Parâmetros de Simulação
        </label>

        {/* Speed Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 text-[11px]">Velocidade do Fluxo</span>
            <span className="font-mono text-[11px] text-emerald-400 font-semibold">
              {config.speed.toFixed(1)}x
            </span>
          </div>
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={config.speed}
            onChange={(e) => onChange({ ...config, speed: parseFloat(e.target.value) })}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Particle density slider (Hide for cyber-grid) */}
        {config.presetId !== 'cyber-grid' && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 text-[11px]">Densidade / Partículas</span>
              <span className="font-mono text-[11px] text-emerald-400 font-semibold">
                {config.particleCount}
              </span>
            </div>
            <input
              type="range"
              min="20"
              max={config.presetId === 'particle-vortex' ? 300 : 200}
              step="5"
              value={config.particleCount}
              onChange={(e) => onChange({ ...config, particleCount: parseInt(e.target.value) })}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        )}

        {/* Size Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 text-[11px]">Tamanho das Partículas</span>
            <span className="font-mono text-[11px] text-emerald-400 font-semibold">
              {config.particleSize.toFixed(1)}px
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max={config.presetId === 'matrix-rain' ? 24 : 8}
            step="0.5"
            value={config.particleSize}
            onChange={(e) => onChange({ ...config, particleSize: parseFloat(e.target.value) })}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Neural Grid specific parameters */}
        {config.presetId === 'neural-grid' && (
          <>
            {/* Connection Distance */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 text-[11px]">Distância de Conexão</span>
                <span className="font-mono text-[11px] text-emerald-400 font-semibold">
                  {config.lineDistance}px
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="220"
                step="5"
                value={config.lineDistance}
                onChange={(e) => onChange({ ...config, lineDistance: parseInt(e.target.value) })}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Line width */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 text-[11px]">Espessura da Conexão</span>
                <span className="font-mono text-[11px] text-emerald-400 font-semibold">
                  {config.lineWidth.toFixed(1)}px
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.2"
                value={config.lineWidth}
                onChange={(e) => onChange({ ...config, lineWidth: parseFloat(e.target.value) })}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </>
        )}
      </div>

      {/* 4. MOUSE PHYSICS & GRAPHICS */}
      <div className="space-y-4 pt-2 border-t border-slate-800/40">
        <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
          <Settings className="w-3.5 h-3.5 text-cyan-400" />
          Física & Filtros de Tela
        </label>

        {/* Glow switch */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 text-[11px] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            Efeito Brilho Neon (Glow)
          </span>
          <button
            onClick={() => onChange({ ...config, glow: !config.glow })}
            className={`w-9 h-5 rounded-full relative transition-all ${
              config.glow ? 'bg-cyan-500' : 'bg-slate-800'
            } cursor-pointer`}
          >
            <span
              className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-all ${
                config.glow ? 'left-4.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Interactivity type (only for relevant presets) */}
        {['neural-grid', 'particle-vortex', 'quantum-waves'].includes(config.presetId) && (
          <div className="space-y-1.5">
            <span className="text-slate-300 text-[11px] flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              Interação com o Mouse
            </span>
            <div className="grid grid-cols-3 gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800/80">
              {(['gravity', 'repulsion', 'none'] as InteractivityType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => onChange({ ...config, interactivity: type })}
                  className={`py-1 text-[10px] font-medium rounded capitalize transition-all cursor-pointer ${
                    config.interactivity === type
                      ? 'bg-cyan-950 text-cyan-400 font-semibold border border-cyan-800/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {type === 'gravity' ? 'Atração' : type === 'repulsion' ? 'Repulsa' : 'Nenhuma'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Manual hex color overrides */}
        <div className="space-y-2">
          <span className="text-slate-300 text-[11px] block">Cores Customizadas</span>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-1.5 bg-slate-950/40 border border-slate-800 px-2 py-1 rounded-lg">
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => onChange({ ...config, primaryColor: e.target.value })}
                className="w-5 h-5 rounded border border-slate-800 cursor-pointer bg-transparent shrink-0"
              />
              <span className="font-mono text-[9px] text-slate-400 select-all uppercase">
                {config.primaryColor}
              </span>
            </div>
            <div className="flex-1 flex items-center gap-1.5 bg-slate-950/40 border border-slate-800 px-2 py-1 rounded-lg">
              <input
                type="color"
                value={config.secondaryColor}
                onChange={(e) => onChange({ ...config, secondaryColor: e.target.value })}
                className="w-5 h-5 rounded border border-slate-800 cursor-pointer bg-transparent shrink-0"
              />
              <span className="font-mono text-[9px] text-slate-400 select-all uppercase">
                {config.secondaryColor}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
