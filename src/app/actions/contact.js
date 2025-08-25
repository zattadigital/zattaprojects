'use server';

import { Resend } from 'resend';
import rateLimiter from '../utils/rateLimiter';
import { getClientIP, normalizeIP, obfuscateIP } from '../utils/getClientIP';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData) {
  try {
    // Get client IP
    const clientIP = normalizeIP(getClientIP());
    const obfuscatedIP = obfuscateIP(clientIP);
    
    
    // Verify rate limiting by IP (2 emails per day)
    const rateLimitCheck = rateLimiter.checkRateLimit(clientIP, 2, 24 * 60 * 60 * 1000);
    
    if (!rateLimitCheck.allowed) {
      return {
        success: false,
        message: rateLimitCheck.message
      };
    }
    
    // Extract form data
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Basic validation
    if (!name || !email || !message) {
      return {
        success: false,
        message: 'Por favor, preencha todos os campos obrigatórios.'
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Por favor, insira um email válido.'
      };
    }
    
    // Check for recent duplicates (same email + similar message)
    const duplicateCheck = rateLimiter.checkDuplicate(email, message, 5 * 60 * 1000);
    
    if (duplicateCheck.isDuplicate) {
      return {
        success: false,
        message: duplicateCheck.message
      };
    }
    
    // Additional spam validation
    const messageLength = message.trim().length;
    if (messageLength < 10) {
      return {
        success: false,
        message: 'Mensagem muito curta. Por favor, forneça mais detalhes.'
      };
    }
    
    if (messageLength > 2000) {
      return {
        success: false,
        message: 'Mensagem muito longa. Limite: 2000 caracteres.'
      };
    }
    
    // Check for repetitive text (possible spam)
    const words = message.toLowerCase().split(/\s+/);
    const uniqueWords = new Set(words);
    const repetitionRatio = uniqueWords.size / words.length;
    
    if (words.length > 20 && repetitionRatio < 0.3) {
      return {
        success: false,
        message: 'Mensagem contém muito texto repetitivo. Tente ser mais específico.'
      };
    }

    // Email template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
          📧 Nova Mensagem do Portfólio
        </h2>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <h3 style="color: #667eea; margin: 0 0 15px 0;">Informações do Contato:</h3>
          <p style="margin: 8px 0;"><strong>Nome:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
          ${phone ? `<p style="margin: 8px 0;"><strong>Telefone:</strong> ${phone}</p>` : ''}
          ${subject ? `<p style="margin: 8px 0;"><strong>Assunto:</strong> ${subject}</p>` : ''}
        </div>

        <div style="margin: 20px 0; padding: 15px; background-color: #fff; border-left: 4px solid #667eea;">
          <h3 style="color: #333; margin: 0 0 15px 0;">Mensagem:</h3>
          <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 5px; font-size: 12px; color: #666;">
          <p style="margin: 0;">Enviado em: ${new Date().toLocaleString('pt-BR')}</p>
          <p style="margin: 5px 0 0 0;">IP: ${obfuscatedIP}</p>
          <p style="margin: 5px 0 0 0;">Tentativas restantes hoje: ${rateLimitCheck.attemptsRemaining}</p>
        </div>
      </div>
    `;

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.TO_EMAIL || 'your_email@gmail.com',
      subject: `💼 Contato do Portfólio: ${subject || 'Nova mensagem'}`,
      html: emailHtml,
      // Email reply to the sender
      replyTo: email,
    });

    // Record successful attempt
    rateLimiter.recordAttempt(clientIP);
    
    return {
      success: true,
      message: `Mensagem enviada com sucesso! Retornarei o contato em breve. (${rateLimitCheck.attemptsRemaining - 1} envios restantes hoje)`,
      emailId: emailResponse.data?.id
    };

  } catch (error) {
    return {
      success: false,
      message: 'Erro interno do servidor. Tente novamente mais tarde ou entre em contato pelo WhatsApp.'
    };
  }
}
