import { headers } from 'next/headers';

/**
 * Obtém o IP real do cliente considerando proxies, load balancers, etc.
 * Funciona com Vercel, Netlify, CloudFlare e outros providers
 */
export function getClientIP() {
  const headersList = headers();
  
  // Lista de headers possíveis para o IP real (em ordem de prioridade)
  const ipHeaders = [
    'x-forwarded-for',          // Proxy padrão
    'x-real-ip',               // Nginx
    'x-client-ip',             // Apache
    'cf-connecting-ip',        // CloudFlare
    'x-cluster-client-ip',     // Cluster
    'x-forwarded',             // Outros proxies
    'forwarded-for',           // HTTP Forwarded
    'forwarded',               // HTTP Forwarded
    'client-ip',               // Cliente IP
    'remote-addr'              // Endereço remoto
  ];
  
  // Tenta obter IP dos headers
  for (const header of ipHeaders) {
    const value = headersList.get(header);
    if (value) {
      // x-forwarded-for pode conter múltiplos IPs separados por vírgula
      // O primeiro é geralmente o IP real do cliente
      const ip = value.split(',')[0].trim();
      
      // Valida se é um IP válido
      if (isValidIP(ip)) {
        return ip;
      }
    }
  }
  
  // Fallback para desenvolvimento local
  return '127.0.0.1';
}

/**
 * Valida se uma string é um IP válido (IPv4 ou IPv6)
 */
function isValidIP(ip) {
  // Remove espaços e verifica se não está vazio
  ip = ip.trim();
  if (!ip) return false;
  
  // Regex para IPv4
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
  // Regex básico para IPv6
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

/**
 * Normaliza IP para uso consistente (converte IPv6 localhost para IPv4)
 */
export function normalizeIP(ip) {
  // Converte IPv6 localhost para IPv4
  if (ip === '::1' || ip === '::ffff:127.0.0.1') {
    return '127.0.0.1';
  }
  
  // Remove prefixo IPv6-mapped IPv4
  if (ip.startsWith('::ffff:')) {
    return ip.substring(7);
  }
  
  return ip;
}

/**
 * Ofusca parcialmente um IP para logs (LGPD/GDPR compliance)
 */
export function obfuscateIP(ip) {
  if (!ip) return 'unknown';
  
  // Para IPv4: mostra apenas os 2 primeiros octetos
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.xxx.xxx`;
    }
  }
  
  // Para IPv6: mostra apenas os primeiros grupos
  if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length >= 4) {
      return `${parts[0]}:${parts[1]}:xxxx:xxxx`;
    }
  }
  
  return 'xxx.xxx.xxx.xxx';
}
