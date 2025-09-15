'use client';

import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  Area,
  AreaChart
} from 'recharts';
import { Measurement } from '@/lib/data';
import { formatChartTime, formatPower, formatVoltage, formatPowerFactor } from '@/lib/utils/format';
import { APP_CONFIG } from '@/lib/config';

interface EnergyChartProps {
  data: Measurement[];
  height?: number;
  showVoltage?: boolean;
  showPowerFactor?: boolean;
  type?: 'line' | 'area';
  loading?: boolean;
}

export default function EnergyChart({
  data,
  height = 300,
  showVoltage = false,
  showPowerFactor = false,
  type = 'line',
  loading = false
}: EnergyChartProps) {
  // Prepara los datos para el gráfico
  const chartData = data.map(measurement => ({
    time: formatChartTime(measurement.ts),
    fullTime: measurement.ts,
    powerW: measurement.powerW,
    voltageV: measurement.voltageV,
    pf: measurement.pf * 100, // Convierte a porcentaje para el gráfico
  }));
  
  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-sm text-gray-600 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
            {entry.name}: {
              entry.dataKey === 'powerW' 
                ? formatPower(entry.value)
                : entry.dataKey === 'voltageV' 
                ? formatVoltage(entry.value)
                : formatPowerFactor(entry.value / 100)
            }
          </p>
        ))}
      </div>
    );
  };
  
  // Componente de loading
  if (loading) {
    return (
      <div className="w-full bg-gray-50 rounded-lg border border-gray-200" style={{ height }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-power-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Cargando datos...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Sin datos
  if (!data.length) {
    return (
      <div className="w-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center" style={{ height }}>
        <div className="text-center">
          <div className="text-4xl text-gray-400 mb-2">📊</div>
          <p className="text-gray-500">No hay datos disponibles</p>
        </div>
      </div>
    );
  }
  
  const Chart = type === 'area' ? AreaChart : LineChart;
  
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
      <ResponsiveContainer width="100%" height={height}>
        <Chart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="time"
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#ddd' }}
          />
          <YAxis 
            tick={{ fill: '#666' }}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {/* Potencia (siempre visible) */}
          {type === 'area' ? (
            <Area
              type="monotone"
              dataKey="powerW"
              stroke={APP_CONFIG.charts.colors.power}
              fill={APP_CONFIG.charts.colors.power}
              fillOpacity={0.3}
              strokeWidth={2}
              dot={false}
              name="Potencia (W)"
              connectNulls
            />
          ) : (
            <Line
              type="monotone"
              dataKey="powerW"
              stroke={APP_CONFIG.charts.colors.power}
              strokeWidth={2}
              dot={false}
              name="Potencia (W)"
              connectNulls
            />
          )}
          
          {/* Voltaje (opcional) */}
          {showVoltage && (
            <>
              {type === 'area' ? (
                <Area
                  type="monotone"
                  dataKey="voltageV"
                  stroke={APP_CONFIG.charts.colors.voltage}
                  fill={APP_CONFIG.charts.colors.voltage}
                  fillOpacity={0.2}
                  strokeWidth={2}
                  dot={false}
                  name="Voltaje (V)"
                  connectNulls
                />
              ) : (
                <Line
                  type="monotone"
                  dataKey="voltageV"
                  stroke={APP_CONFIG.charts.colors.voltage}
                  strokeWidth={2}
                  dot={false}
                  name="Voltaje (V)"
                  connectNulls
                />
              )}
            </>
          )}
          
          {/* Factor de potencia (opcional) */}
          {showPowerFactor && (
            <>
              {type === 'area' ? (
                <Area
                  type="monotone"
                  dataKey="pf"
                  stroke={APP_CONFIG.charts.colors.powerFactor}
                  fill={APP_CONFIG.charts.colors.powerFactor}
                  fillOpacity={0.2}
                  strokeWidth={2}
                  dot={false}
                  name="Factor de Potencia (%)"
                  connectNulls
                />
              ) : (
                <Line
                  type="monotone"
                  dataKey="pf"
                  stroke={APP_CONFIG.charts.colors.powerFactor}
                  strokeWidth={2}
                  dot={false}
                  name="Factor de Potencia (%)"
                  connectNulls
                />
              )}
            </>
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}