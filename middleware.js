import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  // Lista de todos os locales suportados
  locales: ['pt-BR', 'en'],
  
  // Locale padrão (português brasileiro)
  defaultLocale: 'pt-BR'
});

export default function middleware(request) {
  console.log('🔍 Middleware triggered for:', request.nextUrl.pathname);
  
  const response = intlMiddleware(request);
  
  console.log('📤 Middleware response:', response?.status, response?.headers?.get('location'));
  
  return response;
}

export const config = {
  // Aplicar middleware em todas as rotas - matcher mais simples
  matcher: ['/', '/(pt-BR|en)/:path*']
};
