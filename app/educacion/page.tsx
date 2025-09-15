import Link from 'next/link';

const articles = [
  {
    id: 1,
    title: 'Guía completa para optimizar el consumo energético en casa',
    excerpt: 'Descubre técnicas prácticas para reducir tu factura eléctrica hasta un 30% sin sacrificar comodidad.',
    category: 'Básicos',
    readTime: '8 min',
    difficulty: 'Principiante',
    image: '📊',
    tags: ['Ahorro', 'Eficiencia', 'Hogar'],
    publishDate: '2024-12-10'
  },
  {
    id: 2,
    title: 'Entendiendo el factor de potencia y su impacto en tu factura',
    excerpt: 'Aprende qué es el factor de potencia, por qué es importante y cómo mejorarlo para maximizar la eficiencia.',
    category: 'Técnico',
    readTime: '12 min',
    difficulty: 'Intermedio',
    image: '⚡',
    tags: ['Factor de Potencia', 'Técnico', 'Medición'],
    publishDate: '2024-12-08'
  },
  {
    id: 3,
    title: 'Instalación de paneles solares: ROI y consideraciones técnicas',
    excerpt: 'Análisis detallado de la inversión en energía solar, cálculos de retorno y aspectos técnicos clave.',
    category: 'Renovables',
    readTime: '15 min',
    difficulty: 'Avanzado',
    image: '☀️',
    tags: ['Solar', 'Inversión', 'ROI'],
    publishDate: '2024-12-05'
  },
  {
    id: 4,
    title: 'Automatización inteligente: Cuando la tecnología ahorra energía',
    excerpt: 'Explora dispositivos IoT y sistemas de automatización que optimizan el consumo de manera inteligente.',
    category: 'Tecnología',
    readTime: '10 min',
    difficulty: 'Intermedio',
    image: '🏠',
    tags: ['IoT', 'Automatización', 'Smart Home'],
    publishDate: '2024-12-03'
  },
  {
    id: 5,
    title: 'Mitos y realidades sobre el consumo eléctrico doméstico',
    excerpt: 'Desmontamos los mitos más comunes sobre el ahorro energético y aclaramos las realidades.',
    category: 'Básicos',
    readTime: '6 min',
    difficulty: 'Principiante',
    image: '💡',
    tags: ['Mitos', 'Educación', 'Fundamentos'],
    publishDate: '2024-12-01'
  },
  {
    id: 6,
    title: 'Cómo leer y analizar tu medidor inteligente',
    excerpt: 'Tutorial paso a paso para interpretar los datos de tu medidor y identificar oportunidades de ahorro.',
    category: 'Técnico',
    readTime: '9 min',
    difficulty: 'Intermedio',
    image: '📈',
    tags: ['Medidores', 'Análisis', 'Datos'],
    publishDate: '2024-11-28'
  }
];

const webinars = [
  {
    id: 1,
    title: 'Masterclass: Optimización Energética Avanzada',
    description: 'Sesión en vivo con expertos sobre técnicas avanzadas de optimización energética para hogares y pequeñas empresas.',
    speaker: 'Dr. María González, Ingeniera Energética',
    date: '2024-12-20',
    time: '19:00 CET',
    duration: '90 min',
    attendees: 156,
    status: 'upcoming',
    image: '🎓'
  },
  {
    id: 2,
    title: 'Q&A: Energías Renovables y Autoconsumo',
    description: 'Sesión de preguntas y respuestas sobre instalación de paneles solares, baterías y sistemas de autoconsumo.',
    speaker: 'Ing. Carlos Ruiz, Especialista Solar',
    date: '2024-12-15',
    time: '18:30 CET',
    duration: '60 min',
    attendees: 89,
    status: 'upcoming',
    image: '☀️'
  },
  {
    id: 3,
    title: 'Análisis de Datos Energéticos con Python',
    description: 'Workshop técnico para análisis avanzado de patrones de consumo utilizando herramientas de programación.',
    speaker: 'Alex Martín, Data Scientist',
    date: '2024-12-05',
    time: '20:00 CET',
    duration: '120 min',
    attendees: 234,
    status: 'completed',
    image: '📊'
  }
];

const categories = [
  { name: 'Todos', count: articles.length, active: true },
  { name: 'Básicos', count: 2, active: false },
  { name: 'Técnico', count: 2, active: false },
  { name: 'Renovables', count: 1, active: false },
  { name: 'Tecnología', count: 1, active: false },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Principiante': return 'bg-green-100 text-green-800';
    case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
    case 'Avanzado': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Básicos': return 'bg-blue-100 text-blue-800';
    case 'Técnico': return 'bg-purple-100 text-purple-800';
    case 'Renovables': return 'bg-green-100 text-green-800';
    case 'Tecnología': return 'bg-indigo-100 text-indigo-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              📚 Centro de Educación
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recursos, guías y webinars para dominar la eficiencia energética y las tecnologías renovables.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="card text-center">
            <div className="text-2xl font-bold text-power-600 mb-1">{articles.length}</div>
            <div className="text-sm text-gray-600">Artículos disponibles</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-energy-600 mb-1">2</div>
            <div className="text-sm text-gray-600">Webinars próximos</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">12</div>
            <div className="text-sm text-gray-600">Horas de contenido</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">479</div>
            <div className="text-sm text-gray-600">Estudiantes activos</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar con filtros */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      category.active
                        ? 'bg-power-100 text-power-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <span className="text-xs text-gray-500">({category.count})</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Próximos webinars */}
            <div className="card mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">🎥 Próximos webinars</h3>
              <div className="space-y-4">
                {webinars.filter(w => w.status === 'upcoming').slice(0, 2).map((webinar) => (
                  <div key={webinar.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-2 mb-2">
                      <span className="text-lg">{webinar.image}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900 leading-tight">
                          {webinar.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">{webinar.speaker}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <div>{new Date(webinar.date).toLocaleDateString('es-ES')} - {webinar.time}</div>
                      <div className="mt-1">👥 {webinar.attendees} registrados</div>
                    </div>
                    <button className="w-full mt-3 btn-primary text-xs py-2">
                      Registrarse
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {/* Artículos destacados */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos y guías</h2>
              
              <div className="grid gap-6">
                {articles.map((article) => (
                  <article key={article.id} className="card hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                          {article.image}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(article.category)}`}>
                            {article.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(article.difficulty)}`}>
                            {article.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">
                            📖 {article.readTime}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-power-600 transition-colors">
                          <Link href={`/educacion/articulo/${article.id}`}>
                            {article.title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-600 mb-3">{article.excerpt}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {article.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <span className="text-sm text-gray-500">
                            {new Date(article.publishDate).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Webinars */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Webinars y eventos</h2>
              
              <div className="grid gap-6">
                {webinars.map((webinar) => (
                  <div key={webinar.id} className={`card ${
                    webinar.status === 'completed' ? 'opacity-75' : ''
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                          {webinar.image}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {webinar.title}
                          </h3>
                          <span className={`text-xs px-3 py-1 rounded ${
                            webinar.status === 'upcoming' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {webinar.status === 'upcoming' ? 'Próximo' : 'Completado'}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{webinar.description}</p>
                        <p className="text-sm text-power-600 font-medium mb-3">
                          🎤 {webinar.speaker}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <div>📅 {new Date(webinar.date).toLocaleDateString('es-ES')} - {webinar.time}</div>
                            <div>⏱️ {webinar.duration} | 👥 {webinar.attendees} registrados</div>
                          </div>
                          
                          <button className={`btn-primary ${
                            webinar.status === 'completed' ? 'btn-secondary' : ''
                          }`}>
                            {webinar.status === 'upcoming' ? 'Registrarse' : 'Ver grabación'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}