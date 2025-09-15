import type { Measurement, Summary, Device, CommunityStats } from './index';

export async function getSummary(): Promise<Summary> {
  // Simula un delay de red
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return { 
    energy_kWh_24h: 128.4, 
    peakW: 3250, 
    pf_avg: 0.94 
  };
}

export async function getLastReadings(): Promise<Measurement[]> {
  // Simula datos históricos de las últimas 2 horas (120 puntos, 1 por minuto)
  const now = Date.now();
  return Array.from({ length: 120 }).map((_, i) => {
    const timestamp = now - (119 - i) * 60_000;
    const timeOfDay = (timestamp / (1000 * 60 * 60)) % 24;
    
    // Simula patrón realista de consumo durante el día
    let basePower = 800; // Consumo base nocturno
    if (timeOfDay >= 6 && timeOfDay <= 9) basePower = 2200; // Pico matutino
    else if (timeOfDay >= 18 && timeOfDay <= 22) basePower = 1800; // Pico vespertino
    else if (timeOfDay >= 9 && timeOfDay <= 18) basePower = 1200; // Día normal
    
    return {
      ts: new Date(timestamp).toISOString(),
      powerW: Math.round(basePower + 400 * Math.sin(i / 6) + Math.random() * 200),
      voltageV: 228 + Math.random() * 4 - 2, // 226-230V
      pf: 0.90 + Math.random() * 0.08, // 0.90-0.98
    };
  });
}

export function subscribeLive(deviceId: string, cb: (m: Measurement) => void): () => void {
  let isActive = true;
  
  const generateReading = () => {
    if (!isActive) return;
    
    const now = new Date();
    const timeOfDay = now.getHours() + now.getMinutes() / 60;
    
    // Patrón de consumo realista por horas
    let basePower = 800;
    if (timeOfDay >= 6 && timeOfDay <= 9) basePower = 2200;
    else if (timeOfDay >= 18 && timeOfDay <= 22) basePower = 1800;
    else if (timeOfDay >= 9 && timeOfDay <= 18) basePower = 1200;
    
    cb({
      ts: now.toISOString(),
      powerW: Math.round(basePower + 400 * Math.sin(Date.now() / 10000) + Math.random() * 150),
      voltageV: 228 + Math.random() * 4 - 2,
      pf: 0.90 + Math.random() * 0.08,
    });
  };
  
  // Primera lectura inmediata
  generateReading();
  
  // Lecturas cada 3 segundos
  const interval = setInterval(generateReading, 3000);
  
  return () => {
    isActive = false;
    clearInterval(interval);
  };
}

export async function getDevices(): Promise<Device[]> {
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return [
    {
      id: 'demo-1',
      name: 'Medidor Principal',
      location: 'Entrada General',
      status: 'online',
      lastSeen: new Date().toISOString(),
    },
    {
      id: 'demo-2', 
      name: 'Sala de Estar',
      location: 'Planta Baja',
      status: 'online',
      lastSeen: new Date(Date.now() - 30000).toISOString(),
    },
    {
      id: 'demo-3',
      name: 'Aire Acondicionado',
      location: 'Dormitorio Principal',
      status: 'offline',
      lastSeen: new Date(Date.now() - 3600000).toISOString(),
    }
  ];
}

export async function getDevice(id: string): Promise<Device | null> {
  const devices = await getDevices();
  return devices.find(d => d.id === id) || null;
}

export async function getCommunityStats(): Promise<CommunityStats> {
  await new Promise(resolve => setTimeout(resolve, 120));
  
  return {
    totalMembers: 1247,
    totalEnergy_kWh: 156432,
    co2Saved_kg: 78216,
    rankingPosition: 23,
  };
}