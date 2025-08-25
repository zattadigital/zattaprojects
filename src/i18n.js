import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Lista de locales suportados
export const locales = ['pt-BR', 'en'];
export const defaultLocale = 'pt-BR';

export default getRequestConfig(async ({requestLocale}) => {
  // Obter locale da requisição ou usar padrão
  const locale = requestLocale || defaultLocale;
  
  // Validar se o locale é suportado
  if (!locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
