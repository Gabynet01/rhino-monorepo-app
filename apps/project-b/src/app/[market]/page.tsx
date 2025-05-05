import React from 'react';
import { notFound } from 'next/navigation';
import { MarketParam, isValidMarket } from '@rhino-portal/types';

type MarketWelcomeProps = {
  params: Promise<MarketParam>;
};

export default function MarketWelcomePage({ params }: MarketWelcomeProps) {
  const { market } = React.use(params);

  if (!isValidMarket(market)) {
    notFound();
  }

  const marketContent = {
    en: {
      title: 'Welcome to Red Project - English Market',
      description: 'This is the English market homepage for Project B.',
    },
    ca: {
      title: 'Welcome to Red Project - Canadian Market',
      description: 'This is the Canadian market homepage for Project B.',
    },
  };

  const content = marketContent[market];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-red-500">{content.title}</h1>
      <p className="mb-4">{content.description}</p>
      <div className="flex space-x-4 mt-8">
        <a
          href={`/${market}/login`}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
        >
          Login
        </a>
        <a
          href={`/${market}/products`}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
        >
          Browse Products
        </a>
      </div>
    </div>
  );
}

export { generateStaticParams } from '@rhino-portal/types';
