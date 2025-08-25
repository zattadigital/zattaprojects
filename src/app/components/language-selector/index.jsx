"use client";

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('language.selector');
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'pt-BR', name: t('portuguese'), flag: '🇧🇷' },
    { code: 'en', name: t('english'), flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  const handleLanguageChange = (newLocale) => {
    // Salvar preferência do usuário
    localStorage.setItem('userPreferredLocale', newLocale);
    localStorage.setItem('languageBannerDismissed', 'true');
    
    // Construir nova URL com o locale
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
    
    setIsOpen(false);
  };

  return (
    <div className="language-selector" style={{ position: 'relative' }}>
      {/* Botão principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          minWidth: '80px',
          justifyContent: 'space-between'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
      >
        <span>{currentLanguage?.flag}</span>
        <span style={{ 
          fontSize: '12px', 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          ▼
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            marginTop: '8px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            overflow: 'hidden',
            zIndex: 1000,
            minWidth: '140px',
            animation: 'fadeInDown 0.3s ease-out'
          }}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: locale === language.code ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                color: locale === language.code ? '#667eea' : '#333',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                fontWeight: locale === language.code ? '600' : '500',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                if (locale !== language.code) {
                  e.target.style.background = 'rgba(102, 126, 234, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (locale !== language.code) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{language.flag}</span>
              <span>{language.name}</span>
              {locale === language.code && (
                <span style={{ marginLeft: 'auto', color: '#667eea', fontSize: '12px' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay para fechar dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* CSS para animações */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LanguageSelector;
