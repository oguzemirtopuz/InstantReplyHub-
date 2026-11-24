export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  leadLimitMonthly: number;
  features: string[];
  stripePriceId?: string;
  popular?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Başlangıç (Free)",
    priceMonthly: 0,
    priceYearly: 0,
    leadLimitMonthly: 50,
    features: [
      "Aylık 50 otomatik lead yanıtı",
      "Standart Gemini 1.5 Flash modeli",
      "Typeform, Tally & Webflow webhookları",
      "Temel istatistik paneli",
    ],
  },
  {
    id: "growth",
    name: "Büyüme (Growth)",
    priceMonthly: 29,
    priceYearly: 290,
    leadLimitMonthly: 1000,
    popular: true,
    features: [
      "Aylık 1.000 otomatik lead yanıtı",
      "Özel şirket prompt ve üslup ayarları",
      "Resend ile kendi alan adınızdan (domain) gönderim",
      "Gelişmiş analitik ve CSV aktarımı",
      "Öncelikli e-posta desteği",
    ],
    stripePriceId: "price_growth_monthly",
  },
  {
    id: "scale",
    name: "Ölçek (Scale & Agency)",
    priceMonthly: 79,
    priceYearly: 790,
    leadLimitMonthly: 10000,
    features: [
      "Aylık 10.000 otomatik lead yanıtı",
      "Sınırsız form ve webhook bağlantısı",
      "Çoklu ekip üyeleri ve ajans workspace'i",
      "WhatsApp & SMS bildirim altyapısı (v2)",
      "Özel SLA ve 7/24 VIP destek",
    ],
    stripePriceId: "price_scale_monthly",
  },
];
