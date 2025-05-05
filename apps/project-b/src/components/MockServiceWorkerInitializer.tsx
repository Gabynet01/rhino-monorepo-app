'use client';

import { useEffect } from 'react';

const MockServiceWorkerInitializer = () => {
  useEffect(() => {
    const initMSW = async () => {
      if (process.env.NODE_ENV === 'development') {
        try {
          const { initializeMockServiceWorker } = await import('@rhino-portal/shared');
          await initializeMockServiceWorker();
        } catch (error) {
          console.error('Error initializing Mock Service Worker:', error);
        }
      }
    };

    initMSW();
  }, []);

  // This component doesn't render anything
  return null;
};

export default MockServiceWorkerInitializer;
