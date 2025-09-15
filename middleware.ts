import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FEATURES } from './lib/featureFlags';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // En modo DEMO, permitir acceso a todas las rutas
  if (FEATURES.DEMO_MODE) {
    return NextResponse.next();
  }
  
  // Rutas que requieren autenticación
  const protectedRoutes = ['/dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // TODO: Implementar verificación de autenticación con Cognito
    // Por ahora, en modo no-demo sin auth, redirigir al home
    
    // const token = request.cookies.get('auth-token');
    // if (!token) {
    //   return NextResponse.redirect(new URL('/', request.url));
    // }
    
    // Verificar token con Cognito aquí
    // const isValidToken = await verifyToken(token.value);
    // if (!isValidToken) {
    //   return NextResponse.redirect(new URL('/', request.url));
    // }
    
    console.warn('Protected route accessed in non-DEMO mode without auth implementation');
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};