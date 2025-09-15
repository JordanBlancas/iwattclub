import type { Measurement, Summary, Device, CommunityStats } from './index';
// import clientes de urql o AWS SDK aquí cuando conectes AppSync/Timestream.

export async function getSummary(): Promise<Summary> {
  // TODO: query a tu API (AppSync resolver o REST en API GW)
  // Ejemplo:
  // const result = await httpClient.query(SUMMARY_QUERY, { deviceId: 'main' });
  // return result.data.deviceSummary;
  
  console.warn('AWS adapter not implemented yet, returning empty data');
  return { energy_kWh_24h: 0, peakW: 0, pf_avg: 0 };
}

export async function getLastReadings(): Promise<Measurement[]> {
  // TODO: query histórico (Timestream resolver)
  // Ejemplo:
  // const result = await httpClient.query(HISTORICAL_READINGS_QUERY, {
  //   deviceId: 'main',
  //   startTime: new Date(Date.now() - 2*60*60*1000).toISOString(),
  //   endTime: new Date().toISOString()
  // });
  // return result.data.deviceReadings;
  
  console.warn('AWS adapter not implemented yet, returning empty data');
  return [];
}

export function subscribeLive(deviceId: string, cb: (m: Measurement) => void): () => void {
  // TODO: GraphQL subscription (graphql-ws) a AppSync
  // Ejemplo:
  // const wsClient = makeWsClient(() => getIdToken());
  // const unsubscribe = wsClient.subscribe(
  //   { query: ON_NEW_MEASUREMENT_SUBSCRIPTION, variables: { deviceId } },
  //   {
  //     next: (data) => cb(data.data.onNewMeasurement),
  //     error: (err) => console.error('Subscription error:', err),
  //     complete: () => console.log('Subscription completed')
  //   }
  // );
  // return unsubscribe;
  
  console.warn('AWS adapter not implemented yet, no real-time data');
  return () => {};
}

export async function getDevices(): Promise<Device[]> {
  // TODO: query lista de dispositivos del usuario
  console.warn('AWS adapter not implemented yet, returning empty data');
  return [];
}

export async function getDevice(id: string): Promise<Device | null> {
  // TODO: query dispositivo específico
  console.warn(`AWS adapter not implemented yet, device ${id} not found`);
  return null;
}

export async function getCommunityStats(): Promise<CommunityStats> {
  // TODO: query estadísticas de la comunidad
  console.warn('AWS adapter not implemented yet, returning empty data');
  return {
    totalMembers: 0,
    totalEnergy_kWh: 0,
    co2Saved_kg: 0,
    rankingPosition: 0,
  };
}