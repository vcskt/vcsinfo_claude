export type InteractivityType = 'gravity' | 'repulsion' | 'none';

export type PresetId = 'neural-grid' | 'matrix-rain' | 'cyber-grid' | 'particle-vortex' | 'quantum-waves';

export interface AnimationConfig {
  presetId: PresetId;
  particleCount: number;
  speed: number;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  glow: boolean;
  interactivity: InteractivityType;
  particleSize: number;
  lineDistance: number;
  lineWidth: number;
  noiseScale: number;
}

export interface AnimationPreset {
  id: PresetId;
  name: string;
  description: string;
  defaultConfig: AnimationConfig;
  minParticles: number;
  maxParticles: number;
  minSpeed: number;
  maxSpeed: number;
  minSize: number;
  maxSize: number;
}
