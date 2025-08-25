import { notFound } from 'next/navigation';
import { locales } from '../../utils/translations';

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  // Verificar se o locale é válido
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <div data-locale={locale}>
      {children}
    </div>
  );
}
