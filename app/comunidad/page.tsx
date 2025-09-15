import KpiCard from '@/components/KpiCard';
import { getCommunityStats } from '@/lib/data';
import { formatEnergy, formatCO2Impact, formatLargeNumber } from '@/lib/utils/format';
import { FEATURES } from '@/lib/featureFlags';

// Mock data para el ranking
const mockRanking = [
  { position: 1, name: 'EcoWarrior23', energy_saved: 450.2, trend: 'up' },
  { position: 2, name: 'GreenHome', energy_saved: 423.8, trend: 'same' },
  { position: 3, name: 'SolarPower', energy_saved: 398.5, trend: 'up' },
  { position: 4, name: 'SmartUser', energy_saved: 367.2, trend: 'down' },
  { position: 5, name: 'EnergyOptimizer', energy_saved: 334.9, trend: 'up' },
  { position: 23, name: 'Tú', energy_saved: 128.4, trend: 'up', isCurrentUser: true },
];

const achievements = [
  {
    title: 'Ahorro Colectivo',
    description: 'La comunidad ha ahorrado más de 100 MWh este mes',
    icon: '🏆',
    progress: 85,
    target: '100 MWh'
  },
  {
    title: 'Nuevos Miembros',
    description: 'Objetivo de 1,500 miembros activos',
    icon: '👥',
    progress: 65,
    target: '1,500 usuarios'
  },
  {
    title: 'CO₂ Evitado',
    description: 'Evitamos 50 toneladas de CO₂ este mes',
    icon: '🌱',
    progress: 92,
    target: '50 toneladas'
  }
];

const tips = [
  {
    author: 'EcoWarrior23',
    tip: 'Usa temporizadores en electrodomésticos para evitar consumo fantasma durante la noche.',
    likes: 42,
    category: 'Electrodomésticos'
  },
  {
    author: 'SolarPower',
    tip: 'Instala LED en toda la casa. La inversión se recupera en 6 meses.',
    likes: 38,
    category: 'Iluminación'
  },
  {
    author: 'GreenHome',
    tip: 'Programa tu termostato 2°C menos en invierno. Puedes ahorrar hasta 15% en calefacción.',
    likes: 35,
    category: 'Climatización'
  }
];

export default async function CommunityPage() {
  const communityStats = await getCommunityStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Comunidad iWatt.club
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conecta con otros usuarios, comparte experiencias y acelera tu optimización energética.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <KpiCard
            title="Miembros Activos"
            value={formatLargeNumber(communityStats.totalMembers)}
            color="purple"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            }
          />
          <KpiCard
            title="Energía Total Ahorrada"
            value={formatEnergy(communityStats.totalEnergy_kWh)}
            color="green"
            trend="up"
            trendValue="+12% este mes"
          />
          <KpiCard
            title="CO₂ Evitado"
            value={formatCO2Impact(communityStats.co2Saved_kg)}
            color="green"
          />
          <KpiCard
            title="Tu Ranking"
            value={`#${communityStats.rankingPosition}`}
            subtitle="de 1,247 usuarios"
            color="blue"
            trend="up"
            trendValue="Subiste 3 pos."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ranking */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  🏆 Ranking del mes
                </h2>
                {FEATURES.DEMO_MODE && (
                  <span className="text-sm text-amber-600 bg-amber-100 px-2 py-1 rounded">
                    Datos demo
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {mockRanking.map((user) => (
                  <div
                    key={user.position}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      user.isCurrentUser 
                        ? 'bg-power-50 border-power-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        user.position <= 3 
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {user.position}
                      </div>
                      <div>
                        <p className={`font-medium ${user.isCurrentUser ? 'text-power-700' : 'text-gray-900'}`}>
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatEnergy(user.energy_saved)} ahorrados
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {user.trend === 'up' && (
                        <div className="text-green-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      {user.trend === 'down' && (
                        <div className="text-red-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Logros colectivos */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🎯 Logros colectivos
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{achievement.icon}</span>
                        <span className="font-medium text-sm">{achievement.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-energy-500 to-power-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips de la comunidad */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 Tips de la comunidad
              </h3>
              <div className="space-y-4">
                {tips.map((tip, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-gray-900">{tip.author}</span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {tip.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{tip.tip}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>👍 {tip.likes}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 btn-secondary text-sm">
                Ver todos los tips
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}