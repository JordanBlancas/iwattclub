'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import KpiCard from '@/components/KpiCard';
import EnergyChart from '@/components/EnergyChart';
import { 
  getDevice, 
  getSummary, 
  getLastReadings, 
  subscribeLive 
} from '@/lib/data';
import type { Measurement, Summary, Device } from '@/lib/data';
import { 
  formatEnergy, 
  formatPower, 
  formatVoltage,
  formatPowerFactor, 
  formatRelativeTime 
} from '@/lib/utils/format';
import { FEATURES } from '@/lib/featureFlags';

export default function DeviceDetailPage() {
  const params = useParams();
  const deviceId = params.id as string;
  
  const [device, setDevice] = useState<Device | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [historicalData, setHistoricalData] = useState<Measurement[]>([]);
  const [liveData, setLiveData] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  // Cargar datos iniciales
  useEffect(() => {
    async function loadDeviceData() {
      try {
        const [deviceData, summaryData, readings] = await Promise.all([
          getDevice(deviceId),
          getSummary(),
          getLastReadings()
        ]);
        
        if (!deviceData) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        
        setDevice(deviceData);
        setSummary(summaryData);
        setHistoricalData(readings);
        setLiveData(readings.slice(-20));
      } catch (error) {
        console.error('Error loading device data:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    
    if (deviceId) {
      loadDeviceData();
    }
  }, [deviceId]);
  
  // Suscripción a datos en tiempo real
  const handleLiveUpdate = useCallback((newMeasurement: Measurement) => {
    setLiveData(prev => {
      const updated = [...prev, newMeasurement];
      return updated.slice(-50);
    });
  }, []);
  
  useEffect(() => {
    if (!FEATURES.REAL_TIME_UPDATES || !device) return;
    
    const unsubscribe = subscribeLive(deviceId, handleLiveUpdate);
    return unsubscribe;
  }, [deviceId, device, handleLiveUpdate]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-power-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dispositivo...</p>
        </div>
      </div>
    );
  }
  
  if (notFound || !device) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dispositivo no encontrado</h1>
          <p className="text-gray-600 mb-6">
            El dispositivo con ID &quot;{deviceId}&quot; no existe o no tienes permisos para acceder.
          </p>
          <Link href="/dashboard" className="btn-primary">
            Volver al dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  const getStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'error': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: Device['status']) => {
    switch (status) {
      case 'online': return '🟢';
      case 'offline': return '🔴';
      case 'error': return '🟡';
      default: return '⚪';
    }
  };
  
  const currentReading = liveData.length > 0 ? liveData[liveData.length - 1] : null;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Link 
                  href="/dashboard" 
                  className="text-power-600 hover:text-power-700 transition-colors"
                >
                  ← Dashboard
                </Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-600">Dispositivo</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{device.name}</h1>
                  <p className="text-gray-600">📍 {device.location}</p>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(device.status)}`}>
                  {getStatusIcon(device.status)} {device.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-500 mt-1">
                Última actividad: {formatRelativeTime(device.lastSeen)}
              </p>
            </div>
            
            {FEATURES.DEMO_MODE && (
              <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                Datos simulados
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs del dispositivo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <KpiCard
            title="Potencia Actual"
            value={currentReading ? formatPower(currentReading.powerW) : '---'}
            color="blue"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            subtitle="En tiempo real"
            loading={!currentReading}
          />
          <KpiCard
            title="Voltaje"
            value={currentReading ? formatVoltage(currentReading.voltageV) : '---'}
            color="green"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            }
            trend={currentReading && currentReading.voltageV > 230 ? 'up' : 'neutral'}
            trendValue={currentReading && currentReading.voltageV > 230 ? 'Normal' : ''}
            loading={!currentReading}
          />
          <KpiCard
            title="Factor de Potencia"
            value={currentReading ? formatPowerFactor(currentReading.pf) : '---'}
            color="yellow"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            trend={currentReading && currentReading.pf > 0.95 ? 'up' : 'neutral'}
            trendValue={currentReading && currentReading.pf > 0.95 ? 'Excelente' : 'Bueno'}
            loading={!currentReading}
          />
          <KpiCard
            title="Consumo 24h"
            value={summary ? formatEnergy(summary.energy_kWh_24h) : '---'}
            color="purple"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            trend="down"
            trendValue="3.2% vs ayer"
            loading={!summary}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gráficos principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Monitoreo en tiempo real */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  📊 Monitoreo en tiempo real
                </h2>
                {device.status === 'online' && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Actualizando cada 3s</span>
                  </div>
                )}
              </div>
              <EnergyChart 
                data={liveData} 
                height={350}
                showVoltage={true}
                showPowerFactor={true}
                loading={liveData.length === 0}
              />
            </div>

            {/* Histórico extendido */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                📈 Tendencia histórica (2 horas)
              </h2>
              <EnergyChart 
                data={historicalData} 
                height={300}
                type="area"
                showVoltage={false}
                showPowerFactor={false}
                loading={historicalData.length === 0}
              />
            </div>
          </div>

          {/* Sidebar con detalles */}
          <div className="space-y-6">
            {/* Información del dispositivo */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📋 Información del dispositivo
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">ID del dispositivo</span>
                  <span className="text-sm font-mono text-gray-900">{device.id}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Nombre</span>
                  <span className="text-sm text-gray-900">{device.name}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Ubicación</span>
                  <span className="text-sm text-gray-900">{device.location}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Estado</span>
                  <span className={`text-sm px-2 py-1 rounded ${getStatusColor(device.status)}`}>
                    {device.status}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Última actividad</span>
                  <span className="text-sm text-gray-900">{formatRelativeTime(device.lastSeen)}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <button className="w-full btn-secondary text-sm">
                  Editar dispositivo
                </button>
                <button className="w-full btn-secondary text-sm text-red-600 hover:bg-red-50">
                  Eliminar dispositivo
                </button>
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📊 Estadísticas rápidas
              </h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">Potencia promedio</span>
                    <span className="text-lg font-bold text-blue-600">
                      {historicalData.length > 0 
                        ? formatPower(historicalData.reduce((acc, r) => acc + r.powerW, 0) / historicalData.length)
                        : '---'
                      }
                    </span>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-900">Voltaje promedio</span>
                    <span className="text-lg font-bold text-green-600">
                      {historicalData.length > 0 
                        ? formatVoltage(historicalData.reduce((acc, r) => acc + r.voltageV, 0) / historicalData.length)
                        : '---'
                      }
                    </span>
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-yellow-900">FP promedio</span>
                    <span className="text-lg font-bold text-yellow-600">
                      {historicalData.length > 0 
                        ? formatPowerFactor(historicalData.reduce((acc, r) => acc + r.pf, 0) / historicalData.length)
                        : '---'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones rápidas */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ⚡ Acciones
              </h3>
              
              <div className="space-y-3">
                <button className="w-full btn-primary">
                  Exportar datos históricos
                </button>
                <button className="w-full btn-secondary">
                  Configurar alertas
                </button>
                <button className="w-full btn-secondary">
                  Generar reporte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}