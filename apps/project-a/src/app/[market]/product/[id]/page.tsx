'use client';

import React, { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  MarketParam,
  isValidMarket,
  ProductParam,
  Product,
} from '@rhino-portal/types';
import { ProductMarketContent } from '../../../../shared/types/market-content.types';
import { CURRENCY } from '@rhino-portal/constants';

const { useExchangeRate } = await import('@rhino-portal/shared');

type ProductDetailPageProps = {
  params: Promise<MarketParam & ProductParam>;
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { market, id } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const exchangeRate = useExchangeRate();

  if (!isValidMarket(market)) {
    notFound();
  }

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

        let productData: Product = await response.json();

        // Market-specific modifications
        if (market === 'ca') {
          // Convert price to CAD
          productData = {
            ...productData,
            price: Math.round(productData.price * exchangeRate * 100) / 100, // Convert to CAD
          };
        }

        setProduct(productData);
        setSelectedImage(productData.thumbnail);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, market, exchangeRate]);

  const defaultMarketContent: ProductMarketContent = {
    title: 'Product Details - Green Project',
    backToProducts: 'Back to Products',
    loginPrompt: 'Log in to see more details',
    addToCart: 'Add to Cart',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    currency: CURRENCY.en,
    stockLabel: 'Stock',
    brandLabel: 'Brand',
    ratingLabel: 'Rating',
    discountLabel: 'Discount',
    extendedInfoTitle: 'Extended Information',
    loginNow: 'Login Now',
  };

  const marketContent = {
    en: defaultMarketContent,
    ca: {
      ...defaultMarketContent,
      title: 'Product Details - Green Project Canada',
      currency: CURRENCY.ca,
    },
  };

  const content = marketContent[market];

  const handleAddToCart = () => {
    alert(`Added ${product?.title} to cart!`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {error || 'Product not found'}
        </div>
        <Link
          href={`/${market}/products`}
          className="text-green-400 hover:text-green-300 hover:underline"
        >
          {content.backToProducts}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-green-500">
        {content.title}
      </h1>

      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image gallery */}
          <div className="md:w-1/2">
            <div className="mb-4 h-64 md:h-96 overflow-hidden rounded">
              <Image
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-contain"
                width={500}
                height={500}
                priority
              />
            </div>

            {/* Thumbnail gallery */}
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer h-16 w-16 rounded overflow-hidden border-2 ${
                    selectedImage === image
                      ? 'border-green-500'
                      : 'border-transparent'
                  }`}
                  onClick={() => {
                    setSelectedImage(image);
                  }}
                >
                  <Image
                    src={image}
                    alt={`${product.title} - view ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product details */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
            <p className="text-gray-400 text-sm mb-4">{product.category}</p>
            <p className="text-gray-300 mb-6">{product.description}</p>

            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-green-400 mr-4">
                {content.currency}
                {product.price}
              </span>

              {product.discountPercentage > 0 && (
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                  {product.discountPercentage}% {content.discountLabel}
                </span>
              )}
            </div>

            <div className="mb-6">
              <span
                className={`inline-block px-3 py-1 rounded ${
                  product.stock > 0
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                }`}
              >
                {product.stock > 0 ? content.inStock : content.outOfStock}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 rounded text-white transition-colors disabled:opacity-50 mb-6"
            >
              {content.addToCart}
            </button>

            {/* Basic product info for all users */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-gray-400 text-sm">{content.brandLabel}</h3>
                <p>{product.brand}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">{content.ratingLabel}</h3>
                <p>{product.rating}/5</p>
              </div>
            </div>

            {/* Extended info section only for logged-in users */}
            {isLoggedIn ? (
              <div className="border border-green-600 rounded p-4">
                <h3 className="text-lg font-bold mb-3 text-green-500">
                  {content.extendedInfoTitle}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-gray-400 text-sm">
                      {content.stockLabel}
                    </h4>
                    <p>{product.stock} units</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">SKU</h4>
                    <p>PRD-{product.id.toString().padStart(5, '0')}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">Category ID</h4>
                    <p>CAT-{product.category.slice(0, 3).toUpperCase()}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">
                      Warehouse Location
                    </h4>
                    <p>{market === 'ca' ? 'Toronto' : 'Dallas'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-gray-600 rounded p-4 text-center">
                <p className="mb-3">{content.loginPrompt}</p>
                <Link
                  href={`/${market}/login`}
                  className="text-green-400 hover:text-green-300 hover:underline"
                >
                  {content.loginNow}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          href={`/${market}/products`}
          className="text-green-400 hover:text-green-300 hover:underline"
        >
          {content.backToProducts}
        </Link>
      </div>
    </div>
  );
}
