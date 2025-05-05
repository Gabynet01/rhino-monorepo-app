import { WebSocketSubject } from 'rxjs/webSocket';

export class ExchangeRateService {
  private socket$: WebSocketSubject<any>;
  private apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_KEY;

  constructor() {
    this.socket$ = new WebSocketSubject({
      url: `wss://ws.coinapi.io/v1/`,
      protocol: 'json',
      openObserver: {
        next: () =>
          this.socket$.next({
            type: 'hello',
            apikey: this.apiKey,
            subscribe_data_type: ['exrate'],
            subscribe_filter_asset_id: ['CAD'],
          }),
      },
    });
  }

  subscribeToCADRate() {
    return this.socket$.multiplex(
      () => ({
        type: 'exrate_subscribe',
        apikey: this.apiKey,
        asset_id_base: 'CAD',
        asset_id_quote: 'USD',
      }),
      () => ({
        type: 'exrate_unsubscribe',
        apikey: this.apiKey,
        asset_id_base: 'CAD',
        asset_id_quote: 'USD',
      }),
      (message) =>
        message.asset_id_base === 'CAD' && message.asset_id_quote === 'USD'
    );
  }

  closeConnection() {
    this.socket$.complete();
  }
}

export const exchangeRateService = new ExchangeRateService();
