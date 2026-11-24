import { Lead, Integration, AITemplate, DashboardMetrics } from "@/types";

export const DEFAULT_AI_TEMPLATE: AITemplate = {
  id: "template-default",
  name: "Standart Satış & Karşılama Şablonu",
  tone: "friendly",
  company_name: "TechPulse Yazılım & SaaS Çözümleri",
  company_description: "B2B SaaS şirketleri ve dijital ajanslar için otomasyon ve özel yazılım çözümleri üretiyoruz.",
  cta_text: "Size en uygun yol haritasını konuşmak için 15 dakikalık ücretsiz demo randevusu ayarlayabilirsiniz: https://cal.com/techpulse/demo",
  custom_instructions: "Müşterinin formdaki mesajına ve ilgilendiği konuya doğrudan değin. Samimi, enerjik ama profesyonel ol. İlk 2 cümlede ilgilendikleri için teşekkür et ve sorunlarına çözüm sunabileceğimizden bahset.",
  updated_at: new Date().toISOString(),
};

export const INITIAL_INTEGRATIONS: Integration[] = [
  {
    id: "int-typeform-1",
    name: "Ana Web Sitesi Teklif Formu",
    platform: "typeform",
    webhook_token: "wh_tok_tf_98231a4f",
    is_active: true,
    auto_reply_enabled: true,
    target_email: "kurucu@techpulse.io",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "int-webflow-2",
    name: "Landing Page Hızlı İletişim",
    platform: "webflow",
    webhook_token: "wh_tok_wf_11029c7b",
    is_active: true,
    auto_reply_enabled: true,
    target_email: "satis@techpulse.io",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "int-custom-3",
    name: "Özel Webhook & Tally Form",
    platform: "tally",
    webhook_token: "wh_tok_tally_48720e9a",
    is_active: true,
    auto_reply_enabled: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    form_name: "Ana Web Sitesi Teklif Formu",
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@growthagency.co",
    phone: "+90 532 555 12 34",
    message: "Ajansımız için haftalık 50+ lead geliyor, otomatik yanıt ve WhatsApp bilgilendirmesi istiyoruz. Fiyat ve teslim süresi nedir?",
    status: "responded",
    ai_response: "Merhaba Ahmet Bey,\n\nGrowth Agency için gelen haftalık 50+ lead'i anında karşılamak ve dönüşümü maksimize etmek harika bir hedef! InstantReplyHub altyapımız tam olarak bu ihtiyacınız için tasarlandı; webhook entegrasyonumuzla lead'leriniz 5 saniye içinde karşılanır.\n\nFiyatlandırma modellerimiz ve özel entegrasyon süreçlerimizi değerlendirmek üzere 15 dakikalık kısa bir görüşme planlayabiliriz:\nhttps://cal.com/techpulse/demo\n\nBaşarılar dilerim,\nTechPulse Ekibi",
    ai_model: "gemini-1.5-flash",
    response_time_seconds: 4,
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    responded_at: new Date(Date.now() - 1000 * 60 * 15 + 4000).toISOString(),
  },
  {
    id: "lead-2",
    form_name: "Landing Page Hızlı İletişim",
    name: "Selin Demir",
    email: "selin@demirdesign.com",
    phone: "+90 541 222 33 44",
    message: "E-ticaret sitemiz için müşteri iletişim botu arıyoruz. Shopify ile uyumlu mu?",
    status: "responded",
    ai_response: "Merhaba Selin Hanım,\n\nDemir Design e-ticaret siteniz için ulaştığınız için teşekkür ederiz! Shopify formları ve webhooks ile %100 uyumluyuz. Müşterileriniz form doldurduğu anda sepet veya ürün sorularına anında akıllı yanıtlar iletilebilir.\n\nDetaylı demo için hemen görüşelim:\nhttps://cal.com/techpulse/demo",
    ai_model: "gemini-1.5-flash",
    response_time_seconds: 6,
    created_at: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
    responded_at: new Date(Date.now() - 1000 * 60 * 85 + 6000).toISOString(),
  },
  {
    id: "lead-3",
    form_name: "Ana Web Sitesi Teklif Formu",
    name: "Caner Kılıç",
    email: "caner@b2btech.net",
    message: "Kurumsal paket detaylarını ve API dokümantasyonunu incelemek istiyorum.",
    status: "responded",
    ai_response: "Merhaba Caner Bey,\n\nİlginiz için teşekkür ederiz. Kurumsal SLA güvencesi, sınırsız webhook ve özel AI yönlendirme içeren kurumsal dokümantasyonumuzu hazırladık.\n\nSize özel çözümü planlamak için randevu oluşturabilirsiniz:\nhttps://cal.com/techpulse/demo",
    ai_model: "gemini-1.5-flash",
    response_time_seconds: 5,
    created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    responded_at: new Date(Date.now() - 1000 * 60 * 240 + 5000).toISOString(),
  },
  {
    id: "lead-4",
    form_name: "Özel Webhook & Tally Form",
    name: "Zeynep Arslan",
    email: "zeynep@arslanhukuk.av.tr",
    message: "Danışmanlık formu için müvekkillere ilk karşılama mesajı göndermek istiyoruz.",
    status: "pending",
    response_time_seconds: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

export function calculateMetrics(leads: Lead[]): DashboardMetrics {
  const total = leads.length;
  const responded = leads.filter((l) => l.status === "responded");
  const totalResponded = responded.length;

  const totalSeconds = responded.reduce((acc, curr) => acc + (curr.response_time_seconds || 0), 0);
  const avgSeconds = totalResponded > 0 ? Math.round(totalSeconds / totalResponded) : 0;
  const rate = total > 0 ? Math.round((totalResponded / total) * 100) : 0;

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayLeads = leads.filter((l) => l.created_at.startsWith(todayStr)).length;

  return {
    totalLeads: total,
    respondedLeads: totalResponded,
    avgResponseTimeSeconds: avgSeconds,
    responseRatePercent: rate,
    todayLeads,
  };
}
