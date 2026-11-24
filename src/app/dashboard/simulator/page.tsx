"use client";

import * as React from "react";
import { 
  Sparkles, 
  Send, 
  Clock, 
  Bot, 
  Copy, 
  RefreshCw,
} from "lucide-react";
import { Lead } from "@/types";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n";

export default function SimulatorPage() {
  const { t, language } = useLanguage();

  const [formData, setFormData] = React.useState({
    name: language === "tr" ? "Emre Can Tekin" : "Alex Morgan",
    email: language === "tr" ? "emre@startupstudios.com" : "alex@startupstudios.com",
    phone: "+90 533 111 22 33",
    service: language === "tr" ? "Özel AI Entegrasyonu" : "Custom AI Integration",
    message: language === "tr" 
      ? "Şirketimiz için gelen müşteri formlarını anında yapay zeka ile karşılamak istiyoruz. Hangi modelleri destekliyorsunuz ve kurulum ne kadar sürer?"
      : "We want to instantly respond to incoming customer forms with AI. Which models do you support and how fast is onboarding?",
  });

  // Dil değiştiğinde form örneklerini dile göre güncelle
  React.useEffect(() => {
    setFormData({
      name: language === "tr" ? "Emre Can Tekin" : "Alex Morgan",
      email: language === "tr" ? "emre@startupstudios.com" : "alex@startupstudios.com",
      phone: "+90 533 111 22 33",
      service: language === "tr" ? "Özel AI Entegrasyonu" : "Custom AI Integration",
      message: language === "tr" 
        ? "Şirketimiz için gelen müşteri formlarını anında yapay zeka ile karşılamak istiyoruz. Hangi modelleri destekliyorsunuz ve kurulum ne kadar sürer?"
        : "We want to instantly respond to incoming customer forms with AI. Which models do you support and how fast is onboarding?",
    });
  }, [language]);

  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<{
    reply: string;
    model: string;
    seconds: number;
    timestamp: string;
  } | null>(null);

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const startTime = Date.now();

    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          formName: language === "tr" ? "Canlı Simülatör Formu" : "Live Simulator Form",
          language,
        }),
      });

      const data = await res.json();
      const elapsedSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));

      if (!res.ok) {
        throw new Error(data.error || "Yanıt oluşturulamadı");
      }

      setResult({
        reply: data.reply,
        model: data.model || "gemini-1.5-flash",
        seconds: elapsedSeconds,
        timestamp: new Date().toISOString(),
      });

      // LocalStorage'a da ekle
      const stored = localStorage.getItem("irh_leads");
      let currentLeads: Lead[] = stored ? JSON.parse(stored) : [];
      const newLead: Lead = {
        id: `sim-${Date.now()}`,
        form_name: language === "tr" ? "Canlı Simülatör Formu" : "Live Simulator Form",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        status: "responded",
        ai_response: data.reply,
        ai_model: data.model || "gemini-1.5-flash",
        response_time_seconds: elapsedSeconds,
        created_at: new Date(startTime).toISOString(),
        responded_at: new Date().toISOString(),
      };

      currentLeads = [newLead, ...currentLeads];
      localStorage.setItem("irh_leads", JSON.stringify(currentLeads));

      toast.success(`${elapsedSeconds}s: ${t.simulator.secondsNotice}`);
    } catch (err: any) {
      toast.error(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t.simulator.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {t.simulator.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t.simulator.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Alanı */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="font-bold text-base text-foreground">{t.simulator.formTitle}</h3>
            <span className="text-xs text-muted-foreground font-mono">Sandbox</span>
          </div>

          <form onSubmit={handleSimulate} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">
                {t.simulator.clientName}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">
                  {t.simulator.clientEmail}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">
                  {t.simulator.clientPhone}
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">
                {t.simulator.clientService}
              </label>
              <input
                type="text"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">
                {t.simulator.clientMessage}
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-bold transition shadow-md disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  {t.simulator.generatingBtn}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {t.simulator.startBtn}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Canlı Çıktı / Yanıt Alanı */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              {t.simulator.outputTitle}
            </h3>
            {result && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Clock className="h-3 w-3" />
                {result.seconds} {t.simulator.secondsNotice}
              </span>
            )}
          </div>

          {loading ? (
            <div className="h-72 flex flex-col items-center justify-center space-y-3 text-muted-foreground">
              <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="text-xs font-medium">{t.simulator.generatingBtn}</p>
            </div>
          ) : result ? (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                {result.reply}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <span>Model: <code className="font-mono">{result.model}</code></span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result.reply);
                    toast.success(t.common.copied);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-foreground transition font-medium"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {t.simulator.copyReplyBtn}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-72 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border rounded-xl text-muted-foreground">
              <Sparkles className="h-8 w-8 text-muted-foreground mb-3 opacity-60" />
              <p className="font-semibold text-sm text-foreground">{t.simulator.emptyTitle}</p>
              <p className="text-xs mt-1 max-w-xs">
                {t.simulator.emptySubtitle}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
