'use client';
import React from 'react';
import { Product, SupportedMarket } from '@rhino-portal/types';
import Link from 'next/link';
import Image from 'next/image';
import { CURRENCY } from '@rhino-portal/constants';
import { ProductsMarketContent } from '../../../shared/types/market-content.types';

const { useExchangeRate, useBrand } = await import('@rhino-portal/shared');

type Props = {
  market: SupportedMarket;
  products: Product[];
};

export default function ProductsList({ market, products }: Props) {
  const brandConfig = useBrand();
  const exchangeRate = useExchangeRate();

  const defaultContent: ProductsMarketContent = {
    title: `Products - ${brandConfig.brandConfig.name}`,
    description: 'Browse our selection of products',
    backToHome: 'Back to Home',
    viewDetails: 'View Details',
    currency: CURRENCY.en,
  };

  const marketContent: Record<SupportedMarket, ProductsMarketContent> = {
    en: defaultContent,
    ca: {
      ...defaultContent,
      title: `Products - ${brandConfig.brandConfig.name} Canada`,
      description: 'Browse our selection of Canadian products',
      currency: CURRENCY.ca,
    },
  };

  const content = marketContent[market];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-red-500">{content.title}</h1>
      <p className="mb-8">{content.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer"
            onClick={() => {
              // This is handled client-side, but we include it for documentation
              // The sound would be played with the Click sound
            }}
          >
            <div className="h-48 overflow-hidden">
              <Image
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
                width={300}
                height={200}
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 line-clamp-1">
                {product.title}
              </h2>
              <p className="text-gray-400 text-sm mb-2">{product.category}</p>
              <p className="text-gray-300 mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-red-400 font-bold">
                  {content.currency}
                  {market === 'ca'
                    ? (product.price * exchangeRate).toFixed(2)
                    : product.price}
                </span>

                <Link
                  href={`/${market}/product/${product.id}`}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm transition-colors"
                >
                  {content.viewDetails}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href={`/${market}`}
          className="text-red-400 hover:text-red-300 hover:underline"
        >
          {content.backToHome}
        </Link>
      </div>
    </div>
  );
}
