'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useBrand } from '../../hooks/useBrand';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Client component for sound effects
const ErrorFallbackWithSound: React.FC<{
  error: Error;
  reset: () => void;
  children?: ReactNode;
}> = ({ error, reset, children }) => {
  const { brandConfig } = useBrand();

  if (children) {
    return children;
  }

  return (
    <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            Something went wrong
          </h3>
          <div className="mt-2 text-sm text-red-700 dark:text-red-300">
            <p className="whitespace-pre-wrap">{error.message}</p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={reset}
              style={{ backgroundColor: brandConfig.primaryColor }}
              className="rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

class ErrorBoundaryClass extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error, this.reset);
      }

      if (React.isValidElement(this.props.fallback)) {
        return this.props.fallback;
      }

      return (
        <ErrorFallbackWithSound error={this.state.error} reset={this.reset} />
      );
    }

    return this.props.children;
  }
}

// Wrapper for use with 'use client' directive
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = (props) => {
  return <ErrorBoundaryClass {...props} />;
};
