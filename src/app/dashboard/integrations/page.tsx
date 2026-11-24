"use client";

import * as React from "react";
import { 
  Plus, 
  Copy, 
  Check, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  Code2, 
} from "lucide-react";
import { INITIAL_INTEGRATIONS } from "@/lib/data-store";
import { Integration, IntegrationPlatform } from "@/types";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n";

export default function IntegrationsPage() {
  const { t } = useLanguage();
  const [integrations, setIntegrations] = React.useState<Integration[]>([]);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newFormName, setNewFormName] = React.useState("");
  const [newPlatform, setNewPlatform] = React.useState<IntegrationPlatform>("typeform");

  React.useEffect(() => {
    const stored = localStorage.getItem("irh_integrations");
    if (stored) {
      try {
        setIntegrations(JSON.parse(stored));
      } catch {
        setIntegrations(INITIAL_INTEGRATIONS);
      }
    } else {
      setIntegrations(INITIAL_INTEGRATIONS);
    }
  }, []);

  const saveIntegrations = (items: Integration[]) => {
    setIntegrations(items);
    localStorage.setItem("irh_integrations", JSON.stringify(items));
  };

  const getWebhookUrl = (token: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://app.instantreplyhub.com";
    return `${origin}/api/webhook/${token}`;
  };

  const copyUrl = (token: string, id: string) => {
    navigator.clipboard.writeText(getWebhookUrl(token));
    setCopiedId(id);
    toast.success(t.common.copied);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleAutoReply = (id: string) => {
    const updated = integrations.map((item) =>
      item.id === id ? { ...item, auto_reply_enabled: !item.auto_reply_enabled } : item
    );
    saveIntegrations(updated);
    toast.success(t.common.save);
  };

  const deleteIntegration = (id: string) => {
    if (confirm(t.common.delete + "?")) {
      const updated = integrations.filter((item) => item.id !== id);
      saveIntegrations(updated);
      toast.success(t.common.delete);
    }
  };

  const handleAddIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFormName.trim()) return;

    const token = `wh_tok_${Math.random().toString(36).substring(2, 10)}`;
    const newInt: Integration = {
      id: `int-${Date.now()}`,
      name: newFormName.trim(),
      platform: newPlatform,
      webhook_token: token,
      is_active: true,
      auto_reply_enabled: true,
      created_at: new Date().toISOString(),
    };

    saveIntegrations([...integrations, newInt]);
    setNewFormName("");
    setShowAddModal(false);
    toast.success(t.integrations.modalSubmit);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{t.integrations.title}</h2>
          <p className="text-sm text-muted-foreground">
            {t.integrations.subtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition shadow-sm"
        >
          <Plus className="h-4 w-4" />
          {t.integrations.addNewForm}
        </button>
      </div>

      {/* Entegrasyon Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div key={item.id} className="p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary capitalize">
                  {item.platform}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleAutoReply(item.id)}
                    className="p-1 text-muted-foreground hover:text-foreground"
                    title={item.auto_reply_enabled ? t.common.inactive : t.common.active}
                  >
                    {item.auto_reply_enabled ? (
                      <ToggleRight className="h-6 w-6 text-emerald-600" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-muted-foreground" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteIntegration(item.id)}
                    className="p-1 text-muted-foreground hover:text-destructive"
                    title={t.common.delete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-foreground">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{t.common.date}: {formatDate(item.created_at)}</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {t.integrations.webhookTargetUrl}
                </label>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-muted/50 border border-border">
                  <input
                    type="text"
                    readOnly
                    value={getWebhookUrl(item.webhook_token)}
                    className="w-full text-xs font-mono bg-transparent outline-none text-muted-foreground select-all"
                  />
                  <button
                    onClick={() => copyUrl(item.webhook_token, item.id)}
                    className="p-1 rounded hover:bg-accent text-foreground"
                    title={t.common.copy}
                  >
                    {copiedId === item.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>{t.integrations.autoReplyLabel}:</span>
              <span className={`font-semibold ${item.auto_reply_enabled ? "text-emerald-600" : "text-amber-600"}`}>
                {item.auto_reply_enabled ? t.common.active : t.common.inactive}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Webhook Kullanım Kılavuzu & Örnek Kod */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-lg text-foreground">{t.integrations.docsTitle}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t.integrations.docsDesc}
        </p>

        <div className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto">
          <pre>{`// POST /api/webhook/wh_tok_xxx
// Content-Type: application/json

{
  "name": "Alex Morgan",
  "email": "alex@company.com",
  "phone": "+1 555 123 4567",
  "message": "Looking for automated AI lead responses and custom integrations.",
  "service": "Enterprise SaaS"
}`}</pre>
        </div>
      </div>

      {/* Yeni Entegrasyon Ekleme Modalı */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h4 className="text-lg font-bold text-foreground">{t.integrations.modalTitle}</h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg border border-border hover:bg-accent text-muted-foreground"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddIntegration} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">
                  {t.integrations.modalFormName}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Landing Page Contact Form"
                  value={newFormName}
                  onChange={(e) => setNewFormName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">
                  {t.integrations.modalFormPlatform}
                </label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as IntegrationPlatform)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="typeform">Typeform</option>
                  <option value="tally">Tally</option>
                  <option value="webflow">Webflow</option>
                  <option value="google_forms">Google Forms</option>
                  <option value="custom">Custom Webhook / API</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-accent text-sm font-semibold transition"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition"
                >
                  {t.integrations.modalSubmit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
