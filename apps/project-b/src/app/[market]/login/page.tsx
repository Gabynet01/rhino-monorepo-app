'use client';

import React, { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { MarketParam, isValidMarket } from '@rhino-portal/types';

type LoginPageProps = {
  params: Promise<MarketParam>;
};

export default function LoginPage({ params }: LoginPageProps) {
  const { market } = React.use(params);

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isValidMarket(market)) {
    notFound();
  }

  const marketContent = {
    en: {
      title: 'Login to Red Project',
      description:
        'Please enter your credentials to access additional features.',
      usernameLabel: 'Username',
      passwordLabel: 'Password',
      submitButton: 'Log In',
      goBackLabel: 'Go back to home',
    },
    ca: {
      title: 'Login to Red Project Canada',
      description: 'Please enter your credentials to access Canadian features.',
      usernameLabel: 'Username',
      passwordLabel: 'Password',
      submitButton: 'Log In',
      goBackLabel: 'Go back to home',
    },
  };

  const content = marketContent[market];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Project B requires validation before login
      if (!username.trim() || !password.trim()) {
        throw new Error('Username and password cannot be empty');
      }

      if (username === 'user' && password === 'password') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);

        // Redirect to products page
        router.push(`/${market}/products`);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      // Custom error handling for Project B
      setError(
        err instanceof Error ? err.message : 'An error occurred during login'
      );

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-red-500">{content.title}</h1>
      <p className="mb-8">{content.description}</p>

      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        {error && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2">
              {content.usernameLabel}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2">
              {content.passwordLabel}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : content.submitButton}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href={`/${market}`}
            className="text-red-400 hover:text-red-300 hover:underline"
          >
            {content.goBackLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
