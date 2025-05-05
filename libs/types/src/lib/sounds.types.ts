export const Sounds = [
  'click',
  'click-mini',
  'success',
  'error',
  'page-load',
  'add-to-cart',
] as const;

export type SoundType = (typeof Sounds)[number];

export interface SoundOptions {
  volume?: number;
  loop?: boolean;
}
