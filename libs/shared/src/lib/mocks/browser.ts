'use client';

import { handlers } from './handlers';

export const initializeMockServiceWorker = async () => {
  const { setupWorker } = await import('msw/browser');

  const worker = setupWorker(...handlers);

  if (process.env.NODE_ENV === 'development') {
    console.log('Starting MSW worker with handlers:', handlers.length);
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
        options: {
          scope: '/',
        },
      },
    });
    console.log('MSW initialized in development environment');
  }
};
