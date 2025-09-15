import Link from 'next/link';
import { FEATURES } from '@/lib/featureFlags';

const currentChallenges = [
  {
    id: 1,
    title: 'Ahorro Nocturno',
    description: 'Reduce tu consumo entre 23:00 y 06:00 en un 20%',
    category: 'Eficiencia',
    difficulty: 'Fácil',
    participants: 847,
    progress: 65,
    reward: '50 puntos',
    daysLeft: 12,
    icon: '🌙',
    status: 'active'
  },
  {
    id: 2,
    title: 'Desafío LED',
    description: 'Reemplaza al menos 5 bombillas por LED este mes',
    category: 'Equipamiento',
    difficulty: 'Media',
    participants: 234,
    progress: 80,
    reward: '100 puntos',
    daysLeft: 18,
    icon: '💡',
    status: 'participating'
  },
  {
    id: 3,
    title: 'Semana Verde',
    description: 'Mantén tu factor de potencia >0.95 durante 7 días consecutivos',
    category: 'Optimización',
    difficulty: 'Difícil',
    participants: 156,
    progress: 43,
    reward: '200 puntos',
    daysLeft: 8,
    icon: '⚡',
    status: 'active'
  }
];

const upcomingChallenges = [
  {
    id: 4,
    title: 'Comunidad Solar',
    description: 'Reto colectivo: generar 1 MWh con paneles solares comunitarios',
    category: 'Renovables',
    participants: 0,
    startsIn: 5,
    reward: '500 puntos',
    icon: '☀️'
  },
  {
    id: 5,
    title: 'Hogar Inteligente',
    description: 'Automatiza al menos 3 dispositivos para optimizar consumo',
    category: 'Automatización',
    participants: 0,
    startsIn: 12,
    reward: '150 puntos',
    icon: '🏠'
  }
];

const completedChallenges = [
  {
    id: 101,
    title: 'Mes de la Eficiencia',
    description: 'Reducir consumo promedio en 15% durante octubre',
    result: 'Completado con 18.5% de ahorro',
    points: 75,
    icon: '🏆',
    completedDate: '2024-10-31'
  },
  {
    id: 102,
    title: 'Desconexión Total',
    description: 'Eliminar consumo fantasma de al menos 10 dispositivos',
    result: 'Completado - 12 dispositivos optimizados',
    points: 50,
    icon: '🔌',
    completedDate: '2024-09-15'
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Fácil': return 'bg-green-100 text-green-800';
    case 'Media': return 'bg-yellow-100 text-yellow-800';
    case 'Difícil': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Eficiencia': return 'bg-blue-100 text-blue-800';
    case 'Equipamiento': return 'bg-purple-100 text-purple-800';
    case 'Optimización': return 'bg-green-100 text-green-800';
    case 'Renovables': return 'bg-yellow-100 text-yellow-800';
    case 'Automatización': return 'bg-indigo-100 text-indigo-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎯 Retos Energéticos
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Participa en desafíos mensuales, gana puntos y mejora tu eficiencia energética
              junto con la comunidad.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-power-600 mb-1">3</div>
            <div className="text-sm text-gray-600">Retos activos</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-energy-600 mb-1">1</div>
            <div className="text-sm text-gray-600">Participando</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">125</div>
            <div className="text-sm text-gray-600">Puntos ganados</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">2</div>
            <div className="text-sm text-gray-600">Retos completados</div>
          </div>
        </div>

        {/* Retos actuales */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Retos actuales</h2>
            {FEATURES.DEMO_MODE && (
              <span className="text-sm text-amber-600 bg-amber-100 px-2 py-1 rounded">
                Datos demo
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentChallenges.map((challenge) => (
              <div key={challenge.id} className="card relative overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{challenge.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(challenge.category)}`}>
                          {challenge.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {challenge.status === 'participating' && (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>

                {challenge.status === 'participating' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Tu progreso</span>
                      <span className="text-sm text-gray-600">{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-energy-500 to-power-500 h-2 rounded-full"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>👥 {challenge.participants} participantes</span>
                  <span>⏱️ {challenge.daysLeft} días restantes</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-energy-600">
                    🏆 {challenge.reward}
                  </span>
                  
                  {challenge.status === 'active' ? (
                    <button className="btn-primary text-sm px-4 py-2">
                      Unirse
                    </button>
                  ) : (
                    <button className="btn-secondary text-sm px-4 py-2">
                      Ver progreso
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Próximos retos */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximos retos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingChallenges.map((challenge) => (
              <div key={challenge.id} className="card opacity-75">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{challenge.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(challenge.category)}`}>
                      {challenge.category}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <div>🏆 {challenge.reward}</div>
                    <div>Comienza en {challenge.startsIn} días</div>
                  </div>
                  
                  <button className="btn-secondary text-sm px-4 py-2" disabled>
                    Próximamente
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retos completados */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tus logros</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedChallenges.map((challenge) => (
              <div key={challenge.id} className="card border-green-200 bg-green-50">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{challenge.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                    <span className="text-xs text-gray-500">
                      Completado el {new Date(challenge.completedDate).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                <p className="text-sm text-green-700 font-medium mb-3">{challenge.result}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600 font-medium">
                    ✨ +{challenge.points} puntos ganados
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}