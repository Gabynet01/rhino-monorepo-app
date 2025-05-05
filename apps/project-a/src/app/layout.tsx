import './global.css';
import React from 'react';
import { Suspense } from 'react';
import { PROJECTS } from '@rhino-portal/types';
import MockServiceWorkerInitializer from '../components/MockServiceWorkerInitializer';

const { BrandProvider, ModalQueueProvider, ErrorBoundary, ModalQueue } =
  await import('@rhino-portal/shared');

export const metadata = {
  title: 'Green Project - Game Portal',
  description:
    'The ultimate gaming portal for casual and hardcore gamers alike',
};

export default function RootLayout({
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

        <BrandProvider brandId={PROJECTS.PROJECT_A}>
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
