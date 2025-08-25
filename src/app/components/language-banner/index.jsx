"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const LanguageBanner = ({ locale, translations }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const t = translations?.language?.banner || {};
  const router = useRouter();
  const pathname = usePathname();

  // TODOS os useEffect devem estar ANTES de qualquer early return
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Verificar se o banner já foi mostrado/rejeitado
    const bannerDismissed = localStorage.getItem('languageBannerDismissed');
    const userPreferredLocale = localStorage.getItem('userPreferredLocale');
    
    // Detectar idioma do browser
    const browserLanguage = navigator.language || navigator.userLanguage;
    const isBrowserEnglish = browserLanguage.startsWith('en');
    const isBrowserPortuguese = browserLanguage.startsWith('pt');
    
    // Mostrar banner apenas se:
    // 1. Banner não foi dismissado antes
    // 2. Usuário não tem preferência salva
    // 3. Browser está em inglês mas site em português (ou vice-versa)
    const shouldShow = !bannerDismissed && 
                      !userPreferredLocale && 
                      ((isBrowserEnglish && locale === 'pt-BR') || 
                       (isBrowserPortuguese && locale === 'en'));

    if (shouldShow) {
      setShowBanner(true);
      // Mostrar com animação após um pequeno delay
      setTimeout(() => setIsVisible(true), 500);
      
      // Auto-hide após 8 segundos
      setTimeout(() => {
        handleDismiss();
      }, 8000);
    }
  }, [locale]);

  // Só renderizar após hidratação (early return DEPOIS de todos os hooks)
  if (!mounted) {
    return null;
  }

  const handleAccept = () => {
    // Determinar locale alternativo
    const targetLocale = locale === 'pt-BR' ? 'en' : 'pt-BR';
    
    // Salvar preferência
    localStorage.setItem('userPreferredLocale', targetLocale);
    localStorage.setItem('languageBannerDismissed', 'true');
    
    // Redirecionar para o outro idioma
    const newPathname = pathname.replace(`/${locale}`, `/${targetLocale}`);
    router.push(newPathname);
    
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const handleDismiss = () => {
    // Marcar banner como dismissado e salvar preferência atual
    localStorage.setItem('languageBannerDismissed', 'true');
    localStorage.setItem('userPreferredLocale', locale);
    
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div 
      className={`language-banner ${isVisible ? 'visible' : ''}`}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        fontSize: '14px',
        fontWeight: '500',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.3s ease-in-out',
        maxWidth: '350px',
        animation: isVisible ? 'slideInDown 0.5s ease-out' : 'none'
      }}
    >
      {/* Ícone de idioma */}
      <div style={{ fontSize: '18px' }}>
        {locale === 'pt-BR' ? '🇺🇸' : '🇧🇷'}
      </div>
      
      {/* Mensagem */}
      <div style={{ flex: 1 }}>
        {t.message || 'Versão em inglês disponível'}
      </div>
      
      {/* Botões */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleAccept}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          {t.yes || 'Sim'}
        </button>
        
        <button
          onClick={handleDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.8)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = 'white';
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = 'rgba(255, 255, 255, 0.8)';
            e.target.style.background = 'transparent';
          }}
          title={t.no || 'Não, obrigado'}
        >
          ✕
        </button>
      </div>
      
      {/* CSS para animações */}
      <style jsx>{`
        @keyframes slideInDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .language-banner:hover {
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default LanguageBanner;
