import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { MarketParam, isValidMarket, Product } from '@rhino-portal/types';
import ProductsList from './products.client';

export const revalidate = 300; // ISR: 5 minutes

type ProductsPageProps = {
  params: Promise<MarketParam>;
};

export { generateStaticParams } from '@rhino-portal/types';

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch('https://dummyjson.com/products');

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    const products = data.products;

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

function shuffleTopProducts(products: Product[]): Product[] {
  const topProducts = products.slice(0, 10);
  const remainingProducts = products.slice(10);

  for (let i = topProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [topProducts[i], topProducts[j]] = [topProducts[j], topProducts[i]];
  }

  // Console log to show content change as required in the assessment
  console.log('Content refreshed at:', new Date().toISOString());

  return [...topProducts, ...remainingProducts];
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { market } = await params;

  if (!isValidMarket(market)) {
    notFound();
  }

  // Fetch products based on market
  let products = await getProducts();

  // Apply shuffling to demonstrate content changes
  products = shuffleTopProducts(products);

  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsList market={market} products={products} />
    </Suspense>
  );
}
