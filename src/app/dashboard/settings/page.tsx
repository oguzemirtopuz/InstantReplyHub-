"use client";

import * as React from "react";
import { 
  Building, 
  Bot, 
  KeyRound, 
  Save, 
} from "lucide-react";
import { DEFAULT_AI_TEMPLATE } from "@/lib/data-store";
import { AITemplate } from "@/types";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n";

export default function SettingsPage() {
  const { t } = useLanguage();
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
    toast.success(t.common.save);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {t.settings.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t.settings.subtitle}
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Şirket ve İletişim Bilgileri */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Building className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">{t.settings.companySection}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">
                {t.settings.companyName}
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
                {t.settings.ctaLink}
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
              {t.settings.companyDesc}
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
            <h3 className="font-bold text-base text-foreground">{t.settings.aiSection}</h3>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground block mb-1.5">
              {t.settings.toneLabel}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "friendly", label: t.settings.toneFriendly },
                { id: "professional", label: t.settings.toneProfessional },
                { id: "consultative", label: t.settings.toneConsultative },
                { id: "urgent", label: t.settings.toneUrgent },
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
              {t.settings.customInstructionsLabel}
            </label>
            <textarea
              rows={3}
              value={template.custom_instructions}
              onChange={(e) => setTemplate({ ...template, custom_instructions: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
            />
            <p className="text-[11px] text-muted-foreground mt-1">
              {t.settings.customInstructionsHint}
            </p>
          </div>
        </div>

        {/* API Anahtarları (Opsiyonel) */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <KeyRound className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">{t.settings.apiKeysSection}</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            {t.settings.apiKeysNotice}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">
                {t.settings.geminiKeyLabel}
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
                {t.settings.resendKeyLabel}
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
            {t.settings.saveAllBtn}
          </button>
        </div>
      </form>
    </div>
  );
}
