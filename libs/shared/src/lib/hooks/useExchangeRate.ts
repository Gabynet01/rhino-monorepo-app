'use client';

import { useEffect, useState } from 'react';
import { exchangeRateService } from '../services/exchangeRateService';

export const useExchangeRate = (initialRate = 1.35) => {
  const [exchangeRate, setExchangeRate] = useState<number>(initialRate);

  useEffect(() => {
    const subscription = exchangeRateService.subscribeToCADRate().subscribe({
      next: (data) => setExchangeRate(data.rate),
      error: (err) => console.error('WebSocket error:', err),
    });
    return () => subscription.unsubscribe();
  }, []);

  return exchangeRate;
};
