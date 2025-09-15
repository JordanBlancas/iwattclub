/**
 * Formatea valores de energía en kWh con unidades apropiadas
 */
export function formatEnergy(kWh: number): string {
  if (kWh < 1) {
    return `${Math.round(kWh * 1000)} Wh`;
  } else if (kWh < 1000) {
    return `${kWh.toFixed(1)} kWh`;
  } else {
    return `${(kWh / 1000).toFixed(2)} MWh`;
  }
}

/**
 * Formatea valores de potencia en W con unidades apropiadas
 */
export function formatPower(watts: number): string {
  if (watts < 1000) {
    return `${Math.round(watts)} W`;
  } else {
    return `${(watts / 1000).toFixed(2)} kW`;
  }
}

/**
 * Formatea factor de potencia como porcentaje
 */
export function formatPowerFactor(pf: number): string {
  return `${(pf * 100).toFixed(1)}%`;
}

/**
 * Formatea voltaje con unidad
 */
export function formatVoltage(volts: number): string {
  return `${volts.toFixed(1)}V`;
}

/**
 * Formatea fechas de forma relativa (hace X minutos, horas, etc)
 */
export function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return 'hace unos segundos';
  if (minutes < 60) return `hace ${minutes} min`;
  if (hours < 24) return `hace ${hours}h`;
  if (days < 7) return `hace ${days}d`;
  
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Formatea fechas para gráficos (hora:minuto)
 */
export function formatChartTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Convierte CO2 ahorrado a equivalencias comprensibles
 */
export function formatCO2Impact(kg: number): string {
  // 1 árbol absorbe ~22kg CO2/año
  const trees = Math.round(kg / 22);
  if (trees > 0) {
    return `≈ ${trees} árboles/año`;
  }
  return `${kg.toFixed(1)} kg CO2`;
}

/**
 * Formatea números grandes (miles, millones)
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}