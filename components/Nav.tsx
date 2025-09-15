'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APP_CONFIG } from '@/lib/config';
import { FEATURES } from '@/lib/featureFlags';

const navigation = [
  { name: 'Inicio', href: APP_CONFIG.urls.home },
  { name: 'Dashboard', href: APP_CONFIG.urls.dashboard },
  { name: 'Comunidad', href: APP_CONFIG.urls.community },
  { name: 'Retos', href: APP_CONFIG.urls.challenges },
  { name: 'Educación', href: APP_CONFIG.urls.education },
];

export default function Nav() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y nombre */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-energy-500 to-power-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{APP_CONFIG.name}</h1>
              {FEATURES.DEMO_MODE && (
                <span className="text-xs text-amber-600 font-medium">DEMO</span>
              )}
            </div>
          </Link>
          
          {/* Navegación principal */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-power-100 text-power-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          
          {/* Acciones del usuario */}
          <div className="flex items-center space-x-4">
            {FEATURES.DEMO_MODE ? (
              <div className="text-sm text-gray-500">
                Modo Demo
              </div>
            ) : (
              <button className="btn-primary">
                Iniciar Sesión
              </button>
            )}
            
            {/* Menú móvil (hamburguesa) */}
            <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Navegación móvil (se muestra cuando se abre el menú) */}
        <div className="md:hidden border-t border-gray-200 py-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-power-100 text-power-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}