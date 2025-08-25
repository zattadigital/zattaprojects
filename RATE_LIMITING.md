# 🛡️ Sistema de Rate Limiting - Proteção Anti-Spam

## ✅ Proteções Implementadas:

### **1. 🚫 Rate Limiting por IP**
- **Limite:** 2 emails por IP por dia (24h)
- **Detecção automática** de IP real (funciona com proxies, CDNs)
- **Ofuscação de IP** nos logs (LGPD compliance)
- **Reset automático** após 24 horas

### **2. ⏱️ Debounce de Submissão**
- **Intervalo mínimo:** 30 segundos entre envios
- **Feedback visual** do tempo restante
- **Previne** cliques acidentais múltiplos

### **3. 🔍 Detecção de Duplicatas**
- **Janela:** 5 minutos para mesmo email + mensagem
- **Hash de conteúdo** para detectar mensagens similares
- **Previne** reenvios acidentais

### **4. 🤖 Validações Anti-Spam**

**Conteúdo da Mensagem:**
- ✅ **Comprimento mínimo:** 10 caracteres
- ✅ **Comprimento máximo:** 2000 caracteres
- ✅ **Detecção de texto repetitivo** (ratio < 30%)
- ✅ **Palavras-chave de spam** bloqueadas
- ✅ **Validação de email** regex

**Frontend:**
- ✅ **Keywords bloqueadas:** viagra, casino, lottery, etc.
- ✅ **Validação em tempo real**
- ✅ **Feedback imediato**

## 🔧 Como Funciona:

### **Rate Limiter (In-Memory)**
```javascript
// Estrutura dos dados:
{
  attempts: Map<IP, [timestamps]>,
  recentEmails: Map<hash, timestamp>
}

// Limpeza automática a cada hora
// Dados persistem durante execução do servidor
```

### **Detecção de IP**
```javascript
// Headers verificados (ordem de prioridade):
[
  'x-forwarded-for',     // Proxy padrão
  'x-real-ip',          // Nginx
  'cf-connecting-ip',   // CloudFlare
  'x-client-ip',        // Apache
  // ... outros
]
```

## 📊 Logs e Monitoramento:

### **Console Logs:**
```
[Contact Form] Tentativa de envio do IP: 192.168.xxx.xxx
[Rate Limit] IP 192.168.xxx.xxx bloqueado: Limite de 2 emails por dia atingido
[Duplicate] Email duplicado detectado de user@email.com
[Spam Detection] Texto repetitivo detectado
[Success] Email enviado para seu@email.com de user@email.com
```

### **Email Template Inclui:**
- IP ofuscado do remetente
- Tentativas restantes hoje
- Timestamp da mensagem
- Todas as informações do formulário

## 🚀 Performance:

### **Otimizações:**
- ✅ **Rate limiter singleton** - uma instância global
- ✅ **Limpeza automática** - remove dados antigos
- ✅ **Hash simples** - detecção rápida de duplicatas
- ✅ **Memory efficient** - Maps nativos do JavaScript

### **Escalabilidade:**
- 📝 **Atual:** In-memory (adequado para 1 servidor)
- 🔄 **Produção:** Migrar para Redis/Database para múltiplos servidores

## 🔒 Níveis de Proteção:

### **Nível 1 - Cliente (30s debounce)**
```javascript
// Previne cliques múltiplos acidentais
if (timeSinceLastSubmit < 30000) {
  return "Aguarde X segundos...";
}
```

### **Nível 2 - Validação de Conteúdo**
```javascript
// Anti-spam básico
const spamKeywords = ['viagra', 'casino', ...];
const hasSpam = keywords.some(k => message.includes(k));
```

### **Nível 3 - Server Rate Limiting**
```javascript
// 2 emails por IP por dia
const rateLimitCheck = rateLimiter.checkRateLimit(ip, 2, 24h);
```

### **Nível 4 - Detecção de Duplicatas**
```javascript
// Mesmo email + mensagem em 5 min
const duplicateCheck = rateLimiter.checkDuplicate(email, message);
```

### **Nível 5 - Análise de Padrões**
```javascript
// Texto repetitivo, comprimento, etc.
const repetitionRatio = uniqueWords.size / totalWords;
```

## 🛠️ Configuração:

### **Ajustar Limites:**
```javascript
// Em rateLimiter.js
checkRateLimit(ip, maxAttempts = 2, windowMs = 24 * 60 * 60 * 1000)

// Em ContactForm.jsx
const minInterval = 30000; // 30 segundos debounce
```

### **Adicionar Keywords Spam:**
```javascript
// Em ContactForm.jsx
const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'click here', 'buy now'];
```

## 📈 Monitoramento em Produção:

### **Estatísticas Disponíveis:**
```javascript
// Endpoint para monitoramento (criar se necessário)
rateLimiter.getStats()
// Retorna: { totalIPs, recentEmails, lastCleanup }
```

### **Alertas Recomendados:**
- 🚨 **Muitas tentativas bloqueadas** em pouco tempo
- 🚨 **Spike de detecções de spam**
- 🚨 **Rate limiter com muitos IPs** (possível DDoS)

## 🔄 Migração para Redis (Produção):

Para múltiplos servidores ou maior persistência:

```javascript
// utils/redisRateLimiter.js
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function checkRateLimit(ip) {
  const key = `rate_limit:${ip}`;
  const count = await redis.incr(key);
  
  if (count === 1) {
    await redis.expire(key, 86400); // 24h
  }
  
  return count <= 2;
}
```

## 🎯 Resultado:

**Proteção robusta contra:**
- ✅ **Spam automático**
- ✅ **Ataques de força bruta**
- ✅ **Emails duplicados**
- ✅ **Sobrecarga do servidor**
- ✅ **Custos desnecessários** (Resend)

**Mantendo:**
- ✅ **UX amigável** para usuários legítimos
- ✅ **Performance otimizada**
- ✅ **Conformidade LGPD** (IPs ofuscados)
- ✅ **Logs para debugging**
