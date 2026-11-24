// Doğrudan Çekirdek İş Mantığı Uçtan Uca Doğrulama Testi
import { generateLeadReply } from '../src/lib/gemini.ts';
import { sendLeadReplyEmail } from '../src/lib/email.ts';
import { DEFAULT_AI_TEMPLATE, calculateMetrics, INITIAL_LEADS } from '../src/lib/data-store.ts';

console.log('--- ÇEKİRDEK TEST BAŞLADI ---');

// 1. AI Yanıt Üretimi Testi (Fallback & Mantık)
async function runTests() {
  console.log('1. AI Yanıt Üretimi Test Ediliyor...');
  const result = await generateLeadReply({
    name: 'Oğuz Emir Topuz',
    email: 'oguz@test.com',
    message: 'Next.js SaaS projemiz için anında yanıt sistemi entegre etmek istiyoruz.',
    service: 'SaaS Otomasyonu',
    formName: 'Ana Sayfa İletişim',
    template: DEFAULT_AI_TEMPLATE,
  });

  if (!result || !result.reply || result.reply.length < 20) {
    throw new Error('AI yanıtı beklenen uzunlukta veya formatta üretilemedi!');
  }
  console.log('✅ TR AI Yanıtı Başarıyla Üretildi:');
  console.log('Model:', result.model);
  console.log('Örnek Yanıt Parçası:', result.reply.slice(0, 120) + '...\n');

  // 1.1 EN Modu Testi
  console.log('1.1 İngilizce (EN) AI Yanıtı Test Ediliyor...');
  const enResult = await generateLeadReply({
    name: 'Sarah Jenkins',
    email: 'sarah@acmecorp.com',
    message: 'We need urgent form integrations for our US website.',
    service: 'Enterprise AI',
    formName: 'Global Contact Form',
    language: 'en',
    template: DEFAULT_AI_TEMPLATE,
  });
  if (!enResult || !enResult.reply || !enResult.reply.includes('Hi Sarah')) {
    throw new Error('İngilizce AI yanıtı beklenen formatta üretilemedi!');
  }
  console.log('✅ EN AI Yanıtı Başarıyla Üretildi:');
  console.log('Model:', enResult.model);
  console.log('Örnek Yanıt Parçası:', enResult.reply.slice(0, 120) + '...\n');

  // 2. E-posta Gönderimi ve Simülasyon Testi
  console.log('2. E-posta Servisi Test Ediliyor...');
  const emailRes = await sendLeadReplyEmail({
    to: 'oguz@test.com',
    subject: 'Test Konusu',
    body: result.reply,
  });

  if (!emailRes.success) {
    throw new Error('E-posta servisi başarısız oldu!');
  }
  console.log('✅ E-posta servisi başarıyla yanıt verdi (simulated veya canlı).\n');

  // 3. Metrik Hesaplama Mantığı Testi
  console.log('3. Dashboard Metrik Hesaplaması Test Ediliyor...');
  const metrics = calculateMetrics(INITIAL_LEADS);
  if (metrics.totalLeads !== 4 || metrics.respondedLeads !== 3) {
    throw new Error('Metrik hesaplama mantığında hata var!');
  }
  console.log('✅ Metrikler Doğru Hesaplandı: Toplam Lead: ' + metrics.totalLeads + ', Yanıtlanan: ' + metrics.respondedLeads + ', Oran: %' + metrics.responseRatePercent + '\n');

  console.log('🎉 TÜM İŞ MANTIKLARI VE ÇEKİRDEK SERVİSLER HATASIZ ÇALIŞIYOR!');
}

runTests().catch((err) => {
  console.error('❌ Test Başarısız:', err);
  process.exit(1);
});
