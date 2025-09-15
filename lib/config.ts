export const APP_CONFIG = {
  name: 'iWatt.club',
  description: 'El club de la energía inteligente',
  version: '0.1.0',
  
  // URLs de la aplicación
  urls: {
    home: '/',
    dashboard: '/dashboard',
    community: '/comunidad',
    challenges: '/retos',
    education: '/educacion',
  },
  
  // Configuración de gráficos
  charts: {
    realTimeInterval: 3000, // 3 segundos
    historicalPoints: 120,  // 2 horas de datos (1 punto/minuto)
    colors: {
      power: '#3b82f6',      // blue-500
      voltage: '#10b981',    // emerald-500
      powerFactor: '#f59e0b' // amber-500
    }
  },
  
  // Límites y umbrales
  thresholds: {
    voltage: {
      min: 220,
      max: 240,
    },
    powerFactor: {
      good: 0.95,
      warning: 0.85,
    }
  }
} as const;