// Sistema de Rate Limiting simples em memória
// Para produção, considere usar Redis ou outro storage persistente

class RateLimiter {
  constructor() {
    // Map para armazenar tentativas por IP
    this.attempts = new Map();
    // Map para armazenar emails recentes (anti-spam)
    this.recentEmails = new Map();
    
    // Limpeza automática a cada hora
    setInterval(() => {
      this.cleanup();
    }, 60 * 60 * 1000); // 1 hora
  }

  /**
   * Verifica se o IP pode enviar email
   * @param {string} ip - Endereço IP
   * @param {number} maxAttempts - Máximo de tentativas permitidas (padrão: 2)
   * @param {number} windowMs - Janela de tempo em ms (padrão: 24h)
   */
  checkRateLimit(ip, maxAttempts = 2, windowMs = 24 * 60 * 60 * 1000) {
    const now = Date.now();
    const key = ip;
    
    if (!this.attempts.has(key)) {
      this.attempts.set(key, []);
    }
    
    const attempts = this.attempts.get(key);
    
    // Remove tentativas antigas
    const validAttempts = attempts.filter(timestamp => 
      now - timestamp < windowMs
    );
    
    this.attempts.set(key, validAttempts);
    
    // Verifica se excedeu o limite
    if (validAttempts.length >= maxAttempts) {
      const oldestAttempt = Math.min(...validAttempts);
      const timeUntilReset = windowMs - (now - oldestAttempt);
      
      return {
        allowed: false,
        timeUntilReset,
        attemptsRemaining: 0,
        message: `Limite de ${maxAttempts} emails por dia atingido. Tente novamente em ${Math.ceil(timeUntilReset / (60 * 60 * 1000))} horas.`
      };
    }
    
    return {
      allowed: true,
      attemptsRemaining: maxAttempts - validAttempts.length,
      message: 'OK'
    };
  }

  /**
   * Registra uma tentativa de envio
   * @param {string} ip - Endereço IP
   */
  recordAttempt(ip) {
    const now = Date.now();
    const key = ip;
    
    if (!this.attempts.has(key)) {
      this.attempts.set(key, []);
    }
    
    const attempts = this.attempts.get(key);
    attempts.push(now);
    this.attempts.set(key, attempts);
  }

  /**
   * Verifica se é um email duplicado recente
   * @param {string} email - Email do remetente
   * @param {string} message - Conteúdo da mensagem
   * @param {number} windowMs - Janela de tempo para considerar duplicado (padrão: 5 min)
   */
  checkDuplicate(email, message, windowMs = 5 * 60 * 1000) {
    const now = Date.now();
    const contentHash = this.hashContent(email + message);
    
    if (this.recentEmails.has(contentHash)) {
      const timestamp = this.recentEmails.get(contentHash);
      if (now - timestamp < windowMs) {
        return {
          isDuplicate: true,
          message: 'Mensagem duplicada detectada. Aguarde alguns minutos antes de enviar novamente.'
        };
      }
    }
    
    // Registra o novo email
    this.recentEmails.set(contentHash, now);
    
    return {
      isDuplicate: false,
      message: 'OK'
    };
  }

  /**
   * Hash simples para detectar conteúdo duplicado
   */
  hashContent(content) {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }

  /**
   * Limpa registros antigos para economizar memória
   */
  cleanup() {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const hourMs = 60 * 60 * 1000;
    
    // Limpa tentativas antigas (mais de 24h)
    for (const [key, attempts] of this.attempts.entries()) {
      const validAttempts = attempts.filter(timestamp => 
        now - timestamp < dayMs
      );
      
      if (validAttempts.length === 0) {
        this.attempts.delete(key);
      } else {
        this.attempts.set(key, validAttempts);
      }
    }
    
    // Limpa emails recentes (mais de 1h)
    for (const [hash, timestamp] of this.recentEmails.entries()) {
      if (now - timestamp > hourMs) {
        this.recentEmails.delete(hash);
      }
    }
    
  }

  /**
   * Obtém estatísticas do rate limiter
   */
  getStats() {
    return {
      totalIPs: this.attempts.size,
      recentEmails: this.recentEmails.size,
      lastCleanup: new Date().toISOString()
    };
  }
}

// Instância singleton
const rateLimiter = new RateLimiter();

export default rateLimiter;
