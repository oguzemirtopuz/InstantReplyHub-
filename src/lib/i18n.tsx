"use client";

import * as React from "react";

export type Language = "tr" | "en";

export interface Translations {
  common: {
    close: string;
    cancel: string;
    save: string;
    delete: string;
    copy: string;
    copied: string;
    saved: string;
    active: string;
    inactive: string;
    viewAll: string;
    inspect: string;
    status: string;
    date: string;
    actions: string;
    loading: string;
  };
  nav: {
    overview: string;
    leads: string;
    integrations: string;
    simulator: string;
    settings: string;
    landingPage: string;
    aiEngineActive: string;
    aiEngineDesc: string;
  };
  landing: {
    badge: string;
    heroTitlePrefix: string;
    heroTitleHighlight: string;
    heroTitleSuffix: string;
    heroSubtitle: string;
    ctaStart: string;
    ctaSimulator: string;
    metricAvgTime: string;
    metricAvgTimeDesc: string;
    metricBoost: string;
    metricBoostDesc: string;
    metricAutomation: string;
    metricAutomationDesc: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    footerCopyright: string;
  };
  dashboard: {
    welcomeBadge: string;
    welcomeTitle: string;
    welcomeDesc: string;
    copyWebhookBtn: string;
    openSimulatorBtn: string;
    totalLeads: string;
    todayLeads: string;
    autoResponded: string;
    successRate: string;
    avgResponseTime: string;
    industryAvg: string;
    estimatedConversion: string;
    quickAdvantage: string;
    recentLeadsTitle: string;
    recentLeadsSubtitle: string;
    tableCustomer: string;
    tableForm: string;
    tableStatus: string;
    tableTime: string;
    tableDate: string;
    tableAction: string;
    statusResponded: string;
    statusPending: string;
    modalIncomingMessage: string;
    modalAiGenerated: string;
    modalCopyText: string;
  };
  leads: {
    title: string;
    subtitle: string;
    exportCsv: string;
    searchPlaceholder: string;
    allStatus: string;
    onlyResponded: string;
    onlyPending: string;
    noLeadsFound: string;
    generateAiBtn: string;
    deleteConfirm: string;
  };
  integrations: {
    title: string;
    subtitle: string;
    addNewForm: string;
    webhookTargetUrl: string;
    autoReplyLabel: string;
    docsTitle: string;
    docsDesc: string;
    modalTitle: string;
    modalFormName: string;
    modalFormPlatform: string;
    modalSubmit: string;
  };
  simulator: {
    badge: string;
    title: string;
    subtitle: string;
    formTitle: string;
    outputTitle: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientService: string;
    clientMessage: string;
    startBtn: string;
    generatingBtn: string;
    emptyTitle: string;
    emptySubtitle: string;
    secondsNotice: string;
    copyReplyBtn: string;
  };
  settings: {
    title: string;
    subtitle: string;
    companySection: string;
    companyName: string;
    ctaLink: string;
    companyDesc: string;
    aiSection: string;
    toneLabel: string;
    toneFriendly: string;
    toneProfessional: string;
    toneConsultative: string;
    toneUrgent: string;
    customInstructionsLabel: string;
    customInstructionsHint: string;
    apiKeysSection: string;
    apiKeysNotice: string;
    geminiKeyLabel: string;
    resendKeyLabel: string;
    saveAllBtn: string;
  };
  login: {
    titleLogin: string;
    titleRegister: string;
    subtitle: string;
    emailLabel: string;
    passwordLabel: string;
    btnSubmitLogin: string;
    btnSubmitRegister: string;
    orDivider: string;
    btnDemo: string;
    toggleToRegister: string;
    toggleToLogin: string;
  };
}

export const DICTIONARY: Record<Language, Translations> = {
  tr: {
    common: {
      close: "Kapat",
      cancel: "İptal",
      save: "Kaydet",
      delete: "Sil",
      copy: "Kopyala",
      copied: "Kopyalandı!",
      saved: "Kaydedildi!",
      active: "Aktif",
      inactive: "Devre Dışı",
      viewAll: "Tümünü Gör",
      inspect: "İncele",
      status: "Durum",
      date: "Tarih",
      actions: "İşlem",
      loading: "Yükleniyor...",
    },
    nav: {
      overview: "Genel Bakış",
      leads: "Lead Yönetimi",
      integrations: "Entegrasyonlar",
      simulator: "Canlı AI Simülatörü",
      settings: "AI & Ayarlar",
      landingPage: "Landing Sayfası",
      aiEngineActive: "AI Yanıt Motoru",
      aiEngineDesc: "Google Gemini 1.5 Flash ile 5 saniyenin altında otomatik yanıtlar üretir.",
    },
    landing: {
      badge: "AI Destekli Satış ve Lead Dönüşüm Motoru",
      heroTitlePrefix: "Lead'iniz ",
      heroTitleHighlight: "Saniyeler İçinde",
      heroTitleSuffix: " Yanıtlansın, Satışınız Katlansın.",
      heroSubtitle:
        "Landing page ve formlarınızı bağlayın. Gelen her potansiyel müşteriye yapay zeka ile kişiselleştirilmiş, samimi ve satış odaklı ilk e-postayı 5 saniye içinde gönderin.",
      ctaStart: "Hemen Ücretsiz Başla",
      ctaSimulator: "Canlı AI Simülatörünü Dene",
      metricAvgTime: "5 Saniye",
      metricAvgTimeDesc: "Ortalama İlk Yanıt Süresi",
      metricBoost: "%82+",
      metricBoostDesc: "Dönüşüm Artışı (İlk 5 Dk)",
      metricAutomation: "7/24",
      metricAutomationDesc: "Sıfır İnsan Müdahalesi ile Otomasyon",
      howItWorksTitle: "Nasıl Çalışır?",
      howItWorksSubtitle: "3 basit adımda gelen her lead'i sıcak bir satış fırsatına dönüştürün.",
      step1Title: "1. Formunu Bağla",
      step1Desc: "Webflow, Typeform, Tally veya özel sitenizin form webhook'unu tek tıkla entegre edin.",
      step2Title: "2. AI Kişiselleştirsin",
      step2Desc: "Gemini AI, müşterinin bütçesini ve talebini analiz ederek insansı ve ikna edici bir e-posta hazırlar.",
      step3Title: "3. Anında Yanıtla & Kazan",
      step3Desc: "Müşteri sitenizden çıkmadan gelen kutusuna sıcak teklifinizi veya toplantı linkinizi ulaştırın.",
      footerCopyright: "© 2026 InstantReplyHub. Tüm hakları saklıdır.",
    },
    dashboard: {
      welcomeBadge: "AI Otomasyon Motoru Aktif",
      welcomeTitle: "Hoş Geldiniz! Lead Yanıt Sistemi Devrede 🚀",
      welcomeDesc:
        "Formlarınızdan gelen her bildirim anında Gemini AI ile işlenir ve müşterinize kişiselleştirilmiş ilk teklif iletilir.",
      copyWebhookBtn: "Webhook Linkini Kopyala",
      openSimulatorBtn: "Lead Simülatörü Aç",
      totalLeads: "Toplam Gelen Lead",
      todayLeads: "Bugün gelen",
      autoResponded: "Otomatik Yanıtlanan",
      successRate: "başarı oranı",
      avgResponseTime: "Ortalama Yanıt Süresi",
      industryAvg: "Sektör ortalaması 4+ saat",
      estimatedConversion: "Tahmini Dönüşüm Artışı",
      quickAdvantage: "5 dk altı dönüş avantajı",
      recentLeadsTitle: "Son Gelen Lead'ler",
      recentLeadsSubtitle: "Formlarınızdan otomatik yakalanan ve işlenen talepler",
      tableCustomer: "Müşteri / E-posta",
      tableForm: "Kaynak Form",
      tableStatus: "Durum",
      tableTime: "Yanıt Süresi",
      tableDate: "Tarih",
      tableAction: "İşlem",
      statusResponded: "Yanıtlandı",
      statusPending: "Bekliyor",
      modalIncomingMessage: "Gelen Müşteri Mesajı / Talep",
      modalAiGenerated: "AI Tarafından Oluşturulan & Gönderilen E-posta",
      modalCopyText: "Yanıtı Kopyala",
    },
    leads: {
      title: "Lead Yönetimi",
      subtitle: "Tüm gelen form kayıtlarını inceleyin, filtreleyin ve AI yanıtlarını yönetin.",
      exportCsv: "CSV Olarak İndir",
      searchPlaceholder: "İsim, e-posta veya mesaj ara...",
      allStatus: "Tüm Durumlar",
      onlyResponded: "Yanıtlananlar",
      onlyPending: "Bekleyenler",
      noLeadsFound: "Aramanıza uygun lead bulunamadı.",
      generateAiBtn: "Şimdi AI Yanıtı Oluştur & Gönder",
      deleteConfirm: "Bu lead kaydını silmek istediğinize emin misiniz?",
    },
    integrations: {
      title: "Form & Webhook Entegrasyonları",
      subtitle: "Typeform, Tally, Webflow veya özel sitenizin formlarını bağlayın.",
      addNewForm: "Yeni Form Bağla",
      webhookTargetUrl: "Webhook Hedef URL",
      autoReplyLabel: "Otomatik Yanıt",
      docsTitle: "Geliştirici & Webhook Dokümantasyonu",
      docsDesc: "Formunuzdan gelen POST isteklerini aşağıdaki JSON formatında webhook adresinize iletmeniz yeterlidir:",
      modalTitle: "Yeni Form Entegrasyonu Bağla",
      modalFormName: "Form Adı / Tanımı",
      modalFormPlatform: "Form Platformu",
      modalSubmit: "Entegrasyonu Oluştur",
    },
    simulator: {
      badge: "Etkileşimli Test Ortamı",
      title: "Canlı Lead ve AI Yanıt Simülatörü",
      subtitle: "Aşağıdaki formu sanki sitenizi ziyaret eden bir müşteri gibi doldurun ve yapay zekanın saniyeler içinde nasıl bir teklif yanıtı ürettiğini görün.",
      formTitle: "Müşteri Formu (Giriş)",
      outputTitle: "Üretilen Otomatik E-posta Yanıtı",
      clientName: "Müşteri Adı Soyadı",
      clientEmail: "E-posta Adresi",
      clientPhone: "Telefon Numarası",
      clientService: "İlgilenilen Hizmet / Paket",
      clientMessage: "Müşteri Mesajı / Talebi",
      startBtn: "Simülasyonu Başlat & AI Yanıtını Üret",
      generatingBtn: "Gemini AI Yanıtı Hazırlıyor...",
      emptyTitle: "Henüz simülasyon başlatılmadı",
      emptySubtitle: "Soldaki formu doldurup 'Simülasyonu Başlat' butonuna tıklayarak canlı çıktıyı burada görebilirsiniz.",
      secondsNotice: "saniyede oluşturuldu",
      copyReplyBtn: "Metni Kopyala",
    },
    settings: {
      title: "AI & Sistem Ayarları",
      subtitle: "Yapay zekanın müşterilerinize yanıt verirken kullanacağı şirket bilgisi, üslup ve takvim linkinizi özelleştirin.",
      companySection: "Şirket Profili & Bilgileri",
      companyName: "Şirket / Marka Adı",
      ctaLink: "Toplantı / Demo Linki (CTA)",
      companyDesc: "Şirket Faaliyet Alanı & Sunduğunuz Hizmetler",
      aiSection: "AI Üslup ve Yanıt Kuralları",
      toneLabel: "İletişim Tonu",
      toneFriendly: "Samimi & Enerjik",
      toneProfessional: "Kurumsal & Ciddi",
      toneConsultative: "Uzman Danışman",
      toneUrgent: "Hızlı & Satış Odaklı",
      customInstructionsLabel: "Özel Prompt Talimatları (AI Kuralları)",
      customInstructionsHint: "Örnek: Müşteriye adıyla hitap et, en fazla 3 paragraf oluştur ve toplantı takvimine yönlendir.",
      apiKeysSection: "Özel API Anahtarları (Opsiyonel)",
      apiKeysNotice: "Varsayılan olarak sunucu ortam değişkenleri (.env) kullanılır. Dilerseniz buraya özel anahtarlar girebilirsiniz.",
      geminiKeyLabel: "Google Gemini API Key",
      resendKeyLabel: "Resend API Key (E-posta Gönderimi)",
      saveAllBtn: "Tüm Değişiklikleri Kaydet",
    },
    login: {
      titleLogin: "Hesabınıza Giriş Yapın",
      titleRegister: "Yeni Hesap Oluşturun",
      subtitle: "Formlarınızdan gelen her lead'i saniyeler içinde karşılayın.",
      emailLabel: "E-posta Adresi",
      passwordLabel: "Şifre",
      btnSubmitLogin: "Giriş Yap",
      btnSubmitRegister: "Kayıt Ol & Başla",
      orDivider: "veya",
      btnDemo: "Hemen Demo Olarak Giriş Yap",
      toggleToRegister: "Hesabınız yok mu? Yeni hesap oluşturun",
      toggleToLogin: "Zaten hesabınız var mı? Giriş yapın",
    },
  },
  en: {
    common: {
      close: "Close",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      copy: "Copy",
      copied: "Copied!",
      saved: "Saved!",
      active: "Active",
      inactive: "Disabled",
      viewAll: "View All",
      inspect: "Inspect",
      status: "Status",
      date: "Date",
      actions: "Action",
      loading: "Loading...",
    },
    nav: {
      overview: "Overview",
      leads: "Lead Management",
      integrations: "Integrations",
      simulator: "Live AI Simulator",
      settings: "AI & Settings",
      landingPage: "Landing Page",
      aiEngineActive: "AI Reply Engine",
      aiEngineDesc: "Generates automated replies under 5 seconds with Google Gemini 1.5 Flash.",
    },
    landing: {
      badge: "AI-Powered Sales & Lead Conversion Engine",
      heroTitlePrefix: "Reply to Your Leads ",
      heroTitleHighlight: "in Seconds,",
      heroTitleSuffix: " Multiply Your Conversions.",
      heroSubtitle:
        "Connect your landing pages and forms. Send personalized, warm and high-converting AI email replies to every lead within 5 seconds.",
      ctaStart: "Get Started Free",
      ctaSimulator: "Try Live AI Simulator",
      metricAvgTime: "5 Seconds",
      metricAvgTimeDesc: "Average First Response Time",
      metricBoost: "+82%",
      metricBoostDesc: "Conversion Boost (Under 5 Min)",
      metricAutomation: "24/7",
      metricAutomationDesc: "Zero-Touch Smart Automation",
      howItWorksTitle: "How It Works?",
      howItWorksSubtitle: "Turn every incoming lead into a warm sales opportunity in 3 simple steps.",
      step1Title: "1. Connect Your Form",
      step1Desc: "Integrate Webflow, Typeform, Tally or custom webhook in just one click.",
      step2Title: "2. Let AI Personalize",
      step2Desc: "Gemini AI analyzes customer budget and message to craft a human-like, persuasive email.",
      step3Title: "3. Reply Fast & Win",
      step3Desc: "Deliver your warm pitch and booking calendar before the customer leaves your website.",
      footerCopyright: "© 2026 InstantReplyHub. All rights reserved.",
    },
    dashboard: {
      welcomeBadge: "AI Automation Engine Active",
      welcomeTitle: "Welcome! Lead Response System is Live 🚀",
      welcomeDesc:
        "Every notification from your forms is processed instantly with Gemini AI and a tailored offer is sent to your customer.",
      copyWebhookBtn: "Copy Webhook Link",
      openSimulatorBtn: "Open Lead Simulator",
      totalLeads: "Total Incoming Leads",
      todayLeads: "Received today",
      autoResponded: "Auto Responded",
      successRate: "success rate",
      avgResponseTime: "Avg Response Time",
      industryAvg: "Industry average is 4+ hours",
      estimatedConversion: "Estimated Conversion Boost",
      quickAdvantage: "Advantage of responding < 5 min",
      recentLeadsTitle: "Recent Leads",
      recentLeadsSubtitle: "Requests automatically captured and handled from your forms",
      tableCustomer: "Customer / Email",
      tableForm: "Source Form",
      tableStatus: "Status",
      tableTime: "Response Time",
      tableDate: "Date",
      tableAction: "Action",
      statusResponded: "Responded",
      statusPending: "Pending",
      modalIncomingMessage: "Customer Message / Request",
      modalAiGenerated: "AI-Generated & Sent Email",
      modalCopyText: "Copy Reply",
    },
    leads: {
      title: "Lead Management",
      subtitle: "Inspect, filter and manage all incoming form leads and AI responses.",
      exportCsv: "Export as CSV",
      searchPlaceholder: "Search name, email or message...",
      allStatus: "All Statuses",
      onlyResponded: "Responded",
      onlyPending: "Pending",
      noLeadsFound: "No leads matched your search.",
      generateAiBtn: "Generate & Send AI Reply Now",
      deleteConfirm: "Are you sure you want to delete this lead record?",
    },
    integrations: {
      title: "Form & Webhook Integrations",
      subtitle: "Connect Typeform, Tally, Webflow or custom site forms.",
      addNewForm: "Connect New Form",
      webhookTargetUrl: "Webhook Endpoint URL",
      autoReplyLabel: "Auto Reply",
      docsTitle: "Developer & Webhook Documentation",
      docsDesc: "Simply send POST requests from your form in the following JSON format to your webhook URL:",
      modalTitle: "Connect New Form Integration",
      modalFormName: "Form Name / Label",
      modalFormPlatform: "Form Platform",
      modalSubmit: "Create Integration",
    },
    simulator: {
      badge: "Interactive Sandbox",
      title: "Live Lead & AI Response Simulator",
      subtitle: "Fill out the form below as if you were a customer visiting your site and watch the AI craft a personalized offer in seconds.",
      formTitle: "Customer Form (Input)",
      outputTitle: "Generated Automated Email Response",
      clientName: "Customer Full Name",
      clientEmail: "Email Address",
      clientPhone: "Phone Number",
      clientService: "Service / Package of Interest",
      clientMessage: "Customer Message / Request",
      startBtn: "Start Simulation & Generate AI Reply",
      generatingBtn: "Gemini AI is crafting the reply...",
      emptyTitle: "Simulation has not started yet",
      emptySubtitle: "Fill out the form on the left and click 'Start Simulation' to see the live output here.",
      secondsNotice: "generated in seconds",
      copyReplyBtn: "Copy Email Body",
    },
    settings: {
      title: "AI & System Settings",
      subtitle: "Customize your company profile, tone of voice and booking link used by the AI when responding to leads.",
      companySection: "Company Profile & Details",
      companyName: "Company / Brand Name",
      ctaLink: "Meeting / Demo Link (CTA)",
      companyDesc: "Field of Business & Services Offered",
      aiSection: "AI Tone & Response Guidelines",
      toneLabel: "Tone of Voice",
      toneFriendly: "Friendly & Energetic",
      toneProfessional: "Corporate & Formal",
      toneConsultative: "Expert Consultant",
      toneUrgent: "Fast & Sales-Driven",
      customInstructionsLabel: "Custom Prompt Rules (AI Directives)",
      customInstructionsHint: "Example: Address customer by name, keep under 3 paragraphs, guide to booking calendar.",
      apiKeysSection: "Custom API Keys (Optional)",
      apiKeysNotice: "Server environment variables (.env) are used by default. You can define custom keys here if desired.",
      geminiKeyLabel: "Google Gemini API Key",
      resendKeyLabel: "Resend API Key (Email Delivery)",
      saveAllBtn: "Save All Changes",
    },
    login: {
      titleLogin: "Sign In to Your Account",
      titleRegister: "Create a New Account",
      subtitle: "Respond to every lead from your forms in seconds.",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      btnSubmitLogin: "Sign In",
      btnSubmitRegister: "Register & Start",
      orDivider: "or",
      btnDemo: "Sign In as Demo User",
      toggleToRegister: "Don't have an account? Sign up",
      toggleToLogin: "Already have an account? Sign in",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>("tr");

  React.useEffect(() => {
    const saved = localStorage.getItem("irh_lang") as Language | null;
    if (saved === "tr" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("irh_lang", lang);
  };

  const t = DICTIONARY[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
