'use client';

import { FEATURES } from '@/lib/featureFlags';

export default function DemoBadge() {
  if (!FEATURES.DEMO_MODE) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-pulse-slow">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          MODO DEMO
        </div>
      </div>
      
      {/* Tooltip informativo */}
      <div className="absolute top-12 right-0 bg-black text-white text-xs p-3 rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 max-w-xs">
        <div className="mb-2 font-medium">🚀 Datos de demostración</div>
        <div className="text-gray-300">
          Los datos mostrados son simulados. Cambia NEXT_PUBLIC_DEMO=false para conectar con AWS IoT.
        </div>
        <div className="absolute -top-1 right-6 w-2 h-2 bg-black transform rotate-45"></div>
      </div>
    </div>
  );
}