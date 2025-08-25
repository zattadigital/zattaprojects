"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LanguageSelector({ currentLocale }) {
  const router = useRouter();
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = async (newLocale) => {
    if (newLocale === currentLocale) return;
    
    setIsChanging(true);
    
    // Salvar preferência no localStorage
    localStorage.setItem('preferredLanguage', newLocale);
    
    // Navegar para nova rota
    router.push(`/${newLocale}`);
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '14px', color: '#666' }}>Idioma:</span>
      
      <select 
        value={currentLocale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        disabled={isChanging}
        style={{
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #ddd',
          background: 'white',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#010A10',
        //   fontWeight: 'bold'
        }}
      >
        <option value="pt-BR">🇧🇷 Português</option>
        <option value="en">🇺🇸 English</option>
      </select>
      
      {isChanging && (
        <span style={{ fontSize: '12px', color: '#999' }}>
          Carregando...
        </span>
      )}
    </div>
  );
}
