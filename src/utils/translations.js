import { notFound } from 'next/navigation';

// Função para carregar mensagens dos arquivos JSON
const loadMessages = async (locale) => {
  try {
    const messages = await import(`../../messages/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Failed to load messages for ${locale}:`, error);
    return {};
  }
};

// Função para obter traduções (server-side)
export const getTranslations = async (locale = 'pt-BR') => {
  if (!locales.includes(locale)) {
    notFound();
  }
  const messages = await loadMessages(locale);
  return messages;
};

// Lista de locales suportados
export const locales = ['pt-BR', 'en'];
export const defaultLocale = 'pt-BR';
