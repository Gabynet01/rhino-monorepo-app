import { SUPPORTED_MARKETS, SupportedMarket } from './market.types';
import { Product } from './products.types';

export type MarketParam = {
  market: SupportedMarket;
};

export type ProductParam = {
  id: Product['id'];
};

export async function generateStaticParams(): Promise<MarketParam[]> {
  return SUPPORTED_MARKETS.map((market) => ({ market }));
}
