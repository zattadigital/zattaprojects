'use client';

import { useFormStatus } from 'react-dom';
import { useState, useEffect, useRef } from 'react';

// Componente para o botão de submit com estado de loading
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="tmp-btn hover-icon-reverse btn-border btn-md tmp-modern-button radius-round download-icon"
      style={{
        opacity: pending ? 0.7 : 1,
        cursor: pending ? 'not-allowed' : 'pointer'
      }}
    >
      <span className="icon-reverse-wrapper">
        <span className="btn-text">
          {pending ? 'Enviando...' : 'Enviar Mensagem'}
        </span>
        <span className="btn-hack" />
        <span className="btn-icon">
          {pending ? (
            <i className="fa-solid fa-spinner fa-spin" />
          ) : (
            <i className="ffa-sharp fa-regular fa-arrow-right" />
          )}
        </span>
        <span className="btn-icon">
          {pending ? (
            <i className="fa-solid fa-spinner fa-spin" />
          ) : (
            <i className="ffa-sharp fa-regular fa-arrow-right" />
          )}
        </span>
      </span>
    </button>
  );
}

// Componente principal do formulário
export default function ContactForm({ sendContactEmail }) {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' | 'error'
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const submitTimeoutRef = useRef(null);

  // Simula carregamento do componente
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Cleanup do timeout ao desmontar
  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        clearTimeout(submitTimeoutRef.current);
      }
    };
  }, []);

  // Função para lidar com o resultado da action
  async function handleSubmit(formData) {
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    const minInterval = 30000; // 30 segundos entre submissões
    
    // Debounce: previne submissões muito rápidas
    if (timeSinceLastSubmit < minInterval) {
      const remainingTime = Math.ceil((minInterval - timeSinceLastSubmit) / 1000);
      setMessage(`Aguarde ${remainingTime} segundos antes de enviar outra mensagem.`);
      setMessageType('error');
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      
      return;
    }
    
    // Verificar comprimento mínimo da mensagem
    if (messageText.length < 10) {
      setMessage('Mensagem muito curta. Por favor, forneça mais detalhes.');
      setMessageType('error');
      
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      
      return;
    }
    
    setIsSubmitting(true);
    setLastSubmitTime(now);
    
    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
        // Limpar formulário
        document.getElementById('contact-form').reset();
      } else {
        setMessage(result.message);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Erro inesperado. Tente novamente mais tarde.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
    
    // Limpar mensagem após 5 segundos
    submitTimeoutRef.current = setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  }

  if (isLoading) {
    return (
      <div className="contact-form">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          fontSize: '16px',
          color: '#666'
        }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '10px', fontSize: '20px' }} />
          Carregando formulário...
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form">
      {/* Mensagem de feedback */}
      {message && (
        <div 
          style={{
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '8px',
            backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
            border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            color: messageType === 'success' ? '#155724' : '#721c24',
            fontSize: '14px',
            lineHeight: '1.4'
          }}
        >
          <i className={`fa-solid ${messageType === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}`} 
             style={{ marginRight: '8px' }} />
          {message}
        </div>
      )}

      <div id="form-messages" className="error" />
      <form
        className="tmp-dynamic-form"
        id="contact-form"
        action={handleSubmit}
      >
        <div className="contact-form-wrapper row">
          <div className="col-lg-6">
            <div className="form-group">
              <input
                className="input-field"
                name="name"
                id="contact-name"
                placeholder="Seu Nome *"
                type="text"
                required
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <input
                className="input-field"
                name="phone"
                id="contact-phone"
                placeholder="Seu Telefone"
                type="tel"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <input
                className="input-field"
                id="contact-email"
                name="email"
                placeholder="Seu Email *"
                type="email"
                required
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <input
                className="input-field"
                type="text"
                id="subject"
                name="subject"
                placeholder="Assunto"
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <textarea
                className="input-field"
                placeholder="Sua Mensagem *"
                name="message"
                id="contact-message"
                required
                rows="5"
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="tmp-button-here">
              <SubmitButton />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
