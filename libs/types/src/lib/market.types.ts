export const SUPPORTED_MARKETS = ['en', 'ca'] as const;
export type SupportedMarket = (typeof SUPPORTED_MARKETS)[number];

export function isValidMarket(market: string): market is SupportedMarket {
  return SUPPORTED_MARKETS.includes(market as SupportedMarket);
}
