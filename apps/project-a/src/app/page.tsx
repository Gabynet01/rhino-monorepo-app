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
              Welcome to <span className="text-green-500">Green Project</span>
              <br />
              <span className="text-3xl md:text-4xl font-medium">Your Ultimate Gaming Portal</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-xl">
              Explore our extensive collection of games, connect with other players, and enjoy 
              a seamless gaming experience designed with you in mind.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/en"
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-lg"
              >
                English Market
              </Link>
              <Link 
                href="/ca"
                className="px-6 py-3 border border-green-600 text-green-400 font-medium rounded-lg hover:bg-green-800 hover:text-white transition-colors text-lg"
              >
                Canadian Market
              </Link>
            </div>
          </div>
          
          {/* Hero Image - Placeholder */}
          <div className="md:w-1/2 relative">
            <div className="aspect-video w-full max-w-lg mx-auto relative overflow-hidden rounded-xl shadow-xl bg-gray-800 p-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-900/30 animate-pulse"></div>
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="text-center p-6">
                  <svg className="w-24 h-24 mx-auto text-green-500 mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                  <h3 className="text-xl font-bold text-white">Game Portal Preview</h3>
                  <p className="text-gray-400 mt-2">Interactive game previews and multiplayer experiences await</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Live Game Streaming</h3>
            <p className="text-gray-400">Watch top gamers and stream your own gameplay with our integrated streaming platform.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-gray-800 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Community Features</h3>
            <p className="text-gray-400">Join gaming communities, participate in discussions, and connect with like-minded players.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-gray-800 rounded-xl p-6 transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure Transactions</h3>
            <p className="text-gray-400">Purchase games and in-game items with our secure payment system and enjoy instant delivery.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
