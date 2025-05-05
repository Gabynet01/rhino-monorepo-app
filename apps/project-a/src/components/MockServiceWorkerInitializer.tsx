'use client';

import { useEffect } from 'react';

const MockServiceWorkerInitializer = () => {
  useEffect(() => {
    const initMSW = async () => {
      console.log('Attempting to initialize MSW...');
      if (process.env.NODE_ENV === 'development') {
        try {
          console.log('Importing initializeMockServiceWorker...');
          const { initializeMockServiceWorker } = await import(
            '@rhino-portal/shared'
          );
          console.log('Calling initializeMockServiceWorker...');
          await initializeMockServiceWorker();
          console.log('MSW initialized successfully');
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
