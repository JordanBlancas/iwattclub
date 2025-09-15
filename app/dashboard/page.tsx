'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import KpiCard from '@/components/KpiCard';
import EnergyChart from '@/components/EnergyChart';
import { 
  getSummary, 
  getLastReadings, 
  subscribeLive, 
  getDevices 
} from '@/lib/data';
import type { Measurement, Summary, Device } from '@/lib/data';
import { formatEnergy, formatPower, formatPowerFactor, formatRelativeTime } from '@/lib/utils/format';
import { APP_CONFIG } from '@/lib/config';
import { FEATURES } from '@/lib/featureFlags';

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [historicalData, setHistoricalData] = useState<Measurement[]>([]);
  const [liveData, setLiveData] = useState<Measurement[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Cargar datos iniciales
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [summaryData, readings, devicesData] = await Promise.all([
          getSummary(),
          getLastReadings(),
          getDevices()
        ]);
        
        setSummary(summaryData);
        setHistoricalData(readings);
        setLiveData(readings.slice(-20)); // Últimos 20 puntos para el gráfico en vivo
        setDevices(devicesData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadInitialData();
  }, []);
  
  // Suscripción a datos en tiempo real
  const handleLiveUpdate = useCallback((newMeasurement: Measurement) => {
    setLiveData(prev => {
      const updated = [...prev, newMeasurement];
      // Mantener solo los últimos 50 puntos para el gráfico en vivo
      return updated.slice(-50);
    });
  }, []);
  
  useEffect(() => {
    if (!FEATURES.REAL_TIME_UPDATES) return;
    
    const unsubscribe = subscribeLive('demo-1', handleLiveUpdate);
    return unsubscribe;
  }, [handleLiveUpdate]);
  
  // Actualizar resumen cada minuto
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const newSummary = await getSummary();
        setSummary(newSummary);
      } catch (error) {
        console.error('Error updating summary:', error);
      }
    }, 60000); // 60 segundos
    
    return () => clearInterval(interval);
  }, []);
  
  const getDeviceStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'offline': return 'text-red-600';
      case 'error': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };
  
  const getDeviceStatusIcon = (status: Device['status']) => {
    switch (status) {
      case 'online': return '🟢';
      case 'offline': return '🔴';
      case 'error': return '🟡';
      default: return '⚪';
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-power-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                ⚡ Dashboard Energético
              </h1>
              <p className="text-gray-600">
                Monitoreo en tiempo real de tu consumo energético
              </p>
            </div>
            
            {FEATURES.DEMO_MODE && (
              <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                Modo Demo - Datos simulados
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KpiCard
            title="Consumo 24h"
            value={summary ? formatEnergy(summary.energy_kWh_24h) : '---'}
            color="green"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            trend="down"
            trendValue="5.2% vs ayer"
            loading={!summary}
          />
          <KpiCard
            title="Potencia Actual"
            value={liveData.length > 0 ? formatPower(liveData[liveData.length - 1].powerW) : '---'}
            color="blue"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            subtitle="En tiempo real"
            loading={liveData.length === 0}
          />
          <KpiCard
            title="Factor de Potencia"
            value={summary ? formatPowerFactor(summary.pf_avg) : '---'}
            color="yellow"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            trend="up"
            trendValue="Excelente"
            loading={!summary}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gráfico principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Consumo en tiempo real */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  📊 Consumo en tiempo real
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Actualizando cada 3s</span>
                </div>
              </div>
              <EnergyChart 
                data={liveData} 
                height={350}
                showVoltage={true}
                showPowerFactor={false}
                loading={liveData.length === 0}
              />
            </div>

            {/* Histórico de 2 horas */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                📈 Histórico (últimas 2 horas)
              </h2>
              <EnergyChart 
                data={historicalData} 
                height={300}
                type="area"
                showVoltage={false}
                showPowerFactor={true}
                loading={historicalData.length === 0}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Dispositivos */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🔌 Tus dispositivos
              </h3>
              
              {devices.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-sm">No hay dispositivos configurados</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {devices.map((device) => (
                    <Link 
                      key={device.id} 
                      href={`/dashboard/devices/${device.id}`}
                      className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{device.name}</div>
                          <div className="text-sm text-gray-500">{device.location}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getDeviceStatusColor(device.status)}`}>
                            {getDeviceStatusIcon(device.status)} {device.status}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatRelativeTime(device.lastSeen)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              
              <button className="w-full mt-4 btn-secondary text-sm">
                + Agregar dispositivo
              </button>
            </div>

            {/* Alertas y notificaciones */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🚨 Alertas
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <span className="text-yellow-600">⚠️</span>
                    <div>
                      <div className="font-medium text-yellow-800 text-sm">
                        Factor de potencia bajo
                      </div>
                      <div className="text-xs text-yellow-700">
                        Detectado hace 15 min en el medidor principal
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600">ℹ️</span>
                    <div>
                      <div className="font-medium text-blue-800 text-sm">
                        Consumo óptimo
                      </div>
                      <div className="text-xs text-blue-700">
                        Tu consumo está 12% por debajo del promedio
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ⚡ Acciones rápidas
              </h3>
              
              <div className="space-y-3">
                <Link href="/retos" className="block btn-primary text-center">
                  Ver retos activos
                </Link>
                <Link href="/comunidad" className="block btn-secondary text-center">
                  Comparar con la comunidad
                </Link>
                <button className="w-full btn-secondary">
                  Exportar datos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}