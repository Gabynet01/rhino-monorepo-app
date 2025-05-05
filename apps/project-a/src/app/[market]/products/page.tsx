// app/[market]/products/page.tsx
import { notFound } from 'next/navigation';
import { MarketParam, Product, isValidMarket } from '@rhino-portal/types';
import { Suspense } from 'react';
import ProductList from './products.client';

export const revalidate = 300; // ISR: 5 minutes

type ProductsPageProps = {
  params: Promise<MarketParam>;
};

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/games`
        : '/api/games'
    );
    console.log('res: ', res);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    const products = data.products;

    return products;
  } catch (err) {
    console.error(err);
    return [];
  }
}

function shuffleTopProducts(products: Product[]): Product[] {
  const top = products.slice(0, 10);
  const rest = products.slice(10);

  for (let i = top.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [top[i], top[j]] = [top[j], top[i]];
  }

  console.log('Content refreshed at:', new Date().toISOString());

  return [...top, ...rest];
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { market } = await params;

  if (!isValidMarket(market)) {
    notFound();
  }

  let products = await getProducts();
  products = shuffleTopProducts(products);

  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductList market={market} products={products} />
    </Suspense>
  );
}
