import React from 'react';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Hero Content */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Welcome to <span className="text-red-500">Red Project</span>
              <br />
              <span className="text-3xl md:text-4xl font-medium">
                Your Premium Shopping Experience
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-xl">
              Discover exclusive products, enjoy premium shopping, and
              experience a seamless checkout process designed with your
              convenience in mind.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/en"
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-lg"
              >
                English Market
              </Link>
              <Link
                href="/ca"
                className="px-6 py-3 border border-red-600 text-red-400 font-medium rounded-lg hover:bg-red-800 hover:text-white transition-colors text-lg"
              >
                Canadian Market
              </Link>
            </div>
          </div>

          {/* Hero Image - Placeholder */}
          <div className="md:w-1/2 relative">
            <div className="aspect-video w-full max-w-lg mx-auto relative overflow-hidden rounded-xl shadow-xl bg-gray-800 p-2">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-900/30 animate-pulse"></div>
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="text-center p-6">
                  <svg
                    className="w-24 h-24 mx-auto text-red-500 mb-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  </svg>
                  <h3 className="text-xl font-bold text-white">
                    Shopping Portal Preview
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Exclusive deals and premium shopping experiences await
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Premium Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-red-900 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Exclusive Products
            </h3>
            <p className="text-gray-400">
              Discover unique, high-quality products that can&apos;t be found
              anywhere else in the market.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-red-900 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Premium Pricing
            </h3>
            <p className="text-gray-400">
              Enjoy transparent pricing, special discounts, and loyalty rewards
              with every purchase.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-red-900 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Fast Delivery</h3>
            <p className="text-gray-400">
              Experience lightning-fast delivery with real-time tracking and
              premium packaging.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
