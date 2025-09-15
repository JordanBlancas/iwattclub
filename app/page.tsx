import Link from 'next/link';
import KpiCard from '@/components/KpiCard';
import EnergyChart from '@/components/EnergyChart';
import { getSummary, getLastReadings, getCommunityStats } from '@/lib/data';
import { formatEnergy, formatPower, formatPowerFactor, formatCO2Impact, formatLargeNumber } from '@/lib/utils/format';
import { APP_CONFIG } from '@/lib/config';

// Icons como componentes
const EnergyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const PowerIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const EfficiencyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CommunityIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export default async function HomePage() {
  // Carga datos en paralelo (Server Components)
  const [summary, readings, communityStats] = await Promise.all([
    getSummary(),
    getLastReadings(),
    getCommunityStats()
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-power-600 to-energy-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              El club de la <span className="text-yellow-300">energía inteligente</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-power-100 max-w-3xl mx-auto">
              Únete a la comunidad que está transformando el consumo energético. 
              Monitorea, optimiza y compite por un futuro más sostenible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/comunidad" className="btn-primary bg-white text-power-700 hover:bg-gray-100 px-8 py-3 text-lg">
                Únete al club
              </Link>
              <Link href="/dashboard" className="btn-secondary border-white text-white hover:bg-white hover:text-power-700 px-8 py-3 text-lg">
                Ver Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KPIs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tu consumo en tiempo real
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Monitorea tus métricas clave de energía y descubre oportunidades de optimización.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <KpiCard
              title="Consumo 24h"
              value={formatEnergy(summary.energy_kWh_24h)}
              color="green"
              icon={<EnergyIcon />}
              trend="down"
              trendValue="5.2% vs ayer"
            />
            <KpiCard
              title="Potencia Máxima"
              value={formatPower(summary.peakW)}
              color="blue"
              icon={<PowerIcon />}
              trend="up"
              trendValue="Peak a las 19:30"
            />
            <KpiCard
              title="Eficiencia"
              value={formatPowerFactor(summary.pf_avg)}
              color="yellow"
              icon={<EfficiencyIcon />}
              trend="up"
              trendValue="Excelente"
            />
          </div>

          {/* Gráfico de consumo */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Consumo de las últimas 2 horas
            </h3>
            <EnergyChart data={readings} height={400} />
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Impacto de la comunidad
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Juntos estamos creando un impacto real en el planeta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <KpiCard
              title="Miembros Activos"
              value={formatLargeNumber(communityStats.totalMembers)}
              color="purple"
              icon={<CommunityIcon />}
            />
            <KpiCard
              title="Energía Total"
              value={formatEnergy(communityStats.totalEnergy_kWh)}
              color="green"
              icon={<EnergyIcon />}
            />
            <KpiCard
              title="CO₂ Evitado"
              value={formatCO2Impact(communityStats.co2Saved_kg)}
              color="green"
            />
            <KpiCard
              title="Tu Posición"
              value={`#${communityStats.rankingPosition}`}
              color="blue"
              subtitle="en el ranking"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Herramientas completas para optimizar tu consumo energético.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-power-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PowerIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Monitoreo en tiempo real</h3>
              <p className="text-gray-600">
                Visualiza tu consumo instantáneo y histórico con gráficos detallados.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-energy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CommunityIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comunidad activa</h3>
              <p className="text-gray-600">
                Compite con otros usuarios, comparte tips y celebra logros juntos.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <EfficiencyIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimización inteligente</h3>
              <p className="text-gray-600">
                Recibe sugerencias personalizadas para reducir tu consumo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-energy-600 to-power-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para unirte al cambio?
          </h2>
          <p className="text-xl mb-8 text-power-100">
            Miles de usuarios ya están optimizando su consumo energético con nosotros.
          </p>
          <Link 
            href="/comunidad" 
            className="btn-primary bg-white text-power-700 hover:bg-gray-100 px-8 py-3 text-lg inline-block"
          >
            Comenzar ahora
          </Link>
        </div>
      </section>
    </div>
  );
}