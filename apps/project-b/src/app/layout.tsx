import './global.css';
import React from 'react';
import { Suspense } from 'react';
import MockServiceWorkerInitializer from '../components/MockServiceWorkerInitializer';
import { PROJECTS } from '@rhino-portal/types';

const { BrandProvider, ModalQueueProvider, ErrorBoundary, ModalQueue } =
  await import('@rhino-portal/shared');

export const metadata = {
  title: 'Red Project - Game Portal',
  description:
    'The premier gaming destination for enthusiasts and casual gamers',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white">
        {process.env.NODE_ENV === 'development' && (
          <MockServiceWorkerInitializer />
        )}

        <BrandProvider brandId={PROJECTS.PROJECT_B}>
          <ModalQueueProvider>
            <ErrorBoundary>
              <ModalQueue />

              <Suspense
                fallback={
                  <div className="flex h-screen w-full items-center justify-center">
                    Loading...
                  </div>
                }
              >
                {children}
              </Suspense>
            </ErrorBoundary>
          </ModalQueueProvider>
        </BrandProvider>
      </body>
    </html>
  );
}
