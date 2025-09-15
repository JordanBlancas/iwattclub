import { createClient as createHTTP, fetchExchange } from '@urql/core';
import { createClient as createWS, Client } from 'graphql-ws';

export const httpClient = createHTTP({
  url: process.env.NEXT_PUBLIC_APPSYNC_HTTP ?? '',
  exchanges: [fetchExchange],
  fetchOptions: () => {
    // En producción, aquí iría el token de Cognito
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Si usas API Key (solo para desarrollo)
    if (process.env.APPSYNC_API_KEY) {
      headers['x-api-key'] = process.env.APPSYNC_API_KEY;
    }
    
    // Si usas Cognito IdToken (producción)
    // const token = getIdToken();
    // if (token) {
    //   headers['Authorization'] = `Bearer ${token}`;
    // }
    
    return { headers };
  },
});

export function makeWsClient(getAuthToken: () => Promise<string>): Client | null {
  const url = process.env.NEXT_PUBLIC_APPSYNC_WSS;
  if (!url) {
    console.warn('No WebSocket URL configured for real-time subscriptions');
    return null;
  }
  
  return createWS({
    url,
    connectionParams: async () => {
      try {
        const authToken = await getAuthToken();
        return {
          // Para AppSync con Cognito: encabezado auth
          authToken,
          // O para API Key:
          // 'x-api-key': process.env.NEXT_PUBLIC_APPSYNC_API_KEY
        };
      } catch (error) {
        console.error('Failed to get auth token for WebSocket:', error);
        return {};
      }
    },
    retryAttempts: 3,
    shouldRetry: () => true,
  });
}

// Cliente WebSocket singleton (se inicializa cuando se necesita)
let wsClientInstance: Client | null = null;

export function getWsClient(): Client | null {
  if (!wsClientInstance) {
    wsClientInstance = makeWsClient(async () => {
      // TODO: implementar cuando tengamos Cognito
      return '';
    });
  }
  return wsClientInstance;
}