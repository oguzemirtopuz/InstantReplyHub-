"use client";

import * as React from "react";
import { 
  Settings, 
  Sparkles, 
  Save, 
  KeyRound, 
  Bot, 
  Building, 
  Calendar,
  CheckCircle2
} from "lucide-react";
import { DEFAULT_AI_TEMPLATE } from "@/lib/data-store";
import { AITemplate } from "@/types";
import { toast } from "sonner";

export default function SettingsPage() {
  const [template, setTemplate] = React.useState<AITemplate>(DEFAULT_AI_TEMPLATE);
  const [apiKeys, setApiKeys] = React.useState({
    geminiKey: "",
    resendKey: "",
  });

  React.useEffect(() => {
    const stored = localStorage.getItem("irh_template");
    if (stored) {
      try {
        setTemplate(JSON.parse(stored));
      } catch {
        setTemplate(DEFAULT_AI_TEMPLATE);
      }
    }
    const storedKeys = localStorage.getItem("irh_keys");
    if (storedKeys) {
      try {
        setApiKeys(JSON.parse(storedKeys));
      } catch {}
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("irh_template", JSON.stringify(template));
    localStorage.setItem("irh_keys", JSON.stringify(apiKeys));
    toast.success("Ayarlar ve AI prompt kuralları başarıyla kaydedildi!");
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          AI & Sistem Ayarları
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Yapay zekanın müşterilerinize yanıt verirken kullanacağı şirket bilgisi, üslup ve takvim linkinizi özelleştirin.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Şirket ve İletişim Bilgileri */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Building className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">Şirket Profili & Bilgileri</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">
                Şirket / Marka Adı
              </label>
              <input
                type="text"
                required
                value={template.company_name}
                onChange={(e) => setTemplate({ ...template, company_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">
                Toplantı / Demo Linki (CTA)
              </label>
              <input
                type="text"
                required
                value={template.cta_text}
                onChange={(e) => setTemplate({ ...template, cta_text: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground block mb-1.5">
              Şirket Faaliyet Alanı & Sunduğunuz Hizmetler
            </label>
            <textarea
              rows={2}
              required
              value={template.company_description}
              onChange={(e) => setTemplate({ ...template, company_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
            />
          </div>
        </div>

        {/* AI Karakteri ve Kuralları */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Bot className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">AI Üslup ve Yanıt Kuralları</h3>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground block mb-1.5">
              İletişim Tonu (Tone of Voice)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "friendly", label: "Samimi & Enerjik" },
                { id: "professional", label: "Kurumsal & Ciddi" },
                { id: "consultative", label: "Uzman Danışman" },
                { id: "urgent", label: "Hızlı & Satış Odaklı" },
              ].map((tone) => (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => setTemplate({ ...template, tone: tone.id as any })}
                  className={`p-3 rounded-xl border text-xs font-semibold transition text-center ${
                    template.tone === tone.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-accent text-foreground"
                  }`}
                >
                  {tone.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground block mb-1.5">
              Özel Prompt Talimatları (AI Kuralları)
            </label>
            <textarea
              rows={3}
              value={template.custom_instructions}
              onChange={(e) => setTemplate({ ...template, custom_instructions: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
            />
            <p className="text-[11px] text-muted-foreground mt-1">
              Örnek: "Müşteriye adıyla hitap et, asla aşırı uzun yazma, en fazla 3 paragraf oluştur ve toplantı takvimine yönlendir."
            </p>
          </div>
        </div>

        {/* API Anahtarları (Opsiyonel / Özelleştirilebilir) */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <KeyRound className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">Özel API Anahtarları (Opsiyonel)</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Varsayılan olarak sunucu ortam değişkenleri (`.env`) kullanılır. Dilerseniz buraya kendi anahtarlarınızı da tanımlayabilirsiniz.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">
                Google Gemini API Key
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKeys.geminiKey}
                onChange={(e) => setApiKeys({ ...apiKeys, geminiKey: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">
                Resend API Key (E-posta Gönderimi İçin)
              </label>
              <input
                type="password"
                placeholder="re_..."
                value={apiKeys.resendKey}
                onChange={(e) => setApiKeys({ ...apiKeys, resendKey: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-bold transition shadow-md"
          >
            <Save className="h-4 w-4" />
            Tüm Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
