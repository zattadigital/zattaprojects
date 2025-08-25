import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { defaultLocale, locales } from '../utils/translations';

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // Detectar locale preferido
  let preferredLocale = defaultLocale;
  if (acceptLanguage.includes('en')) {
    preferredLocale = 'en';
  } else if (acceptLanguage.includes('pt')) {
    preferredLocale = 'pt-BR';
  }
  
  // Garantir que o locale é válido
  if (!locales.includes(preferredLocale)) {
    preferredLocale = defaultLocale;
  }
  
  // Redirecionar para a versão localizada
  redirect(`/${preferredLocale}`);
}
