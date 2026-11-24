"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Eye, 
  RefreshCw,
  MailCheck,
  SendHorizontal
} from "lucide-react";
import { INITIAL_LEADS, calculateMetrics } from "@/lib/data-store";
import { Lead } from "@/types";
import { formatDate, formatSeconds } from "@/lib/utils";
import { toast } from "sonner";

export default function DashboardOverviewPage() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
  const [copiedToken, setCopiedToken] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("irh_leads");
    if (stored) {
      try {
        setLeads(JSON.parse(stored));
      } catch {
        setLeads(INITIAL_LEADS);
      }
    } else {
      setLeads(INITIAL_LEADS);
      localStorage.setItem("irh_leads", JSON.stringify(INITIAL_LEADS));
    }
  }, []);

  const metrics = calculateMetrics(leads);

  const copyWebhookUrl = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://app.instantreplyhub.com";
    const url = `${origin}/api/webhook/wh_tok_tf_98231a4f`;
    navigator.clipboard.writeText(url);
    setCopiedToken(true);
    toast.success("Webhook URL panoya kopyalandı!");
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Karşılama ve Hızlı Webhook Banner'ı */}
      <div className="rounded-2xl border border-border bg-gradient-to-r from-primary/10 via-card to-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            AI Otomasyon Motoru Aktif
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Hoş Geldiniz! Lead Yanıt Sistemi Devrede 🚀
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            Landing sayfanızdan veya formlarınızdan gelen her bildirim anında Gemini AI ile işlenir ve müşterinize kişiselleştirilmiş ilk teklif iletilir.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={copyWebhookUrl}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-accent text-sm font-semibold transition shadow-sm"
          >
            {copiedToken ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            Webhook Linkini Kopyala
          </button>
          <Link
            href="/dashboard/simulator"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            Lead Simülatörü Aç
          </Link>
        </div>
      </div>

      {/* İstatistik Metrik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-4">
            <span className="text-sm font-medium">Toplam Gelen Lead</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-foreground">{metrics.totalLeads}</div>
            <div className="text-xs text-muted-foreground">Bugün gelen: {metrics.todayLeads} lead</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-4">
            <span className="text-sm font-medium">Otomatik Yanıtlanan</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-foreground">{metrics.respondedLeads}</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              %{metrics.responseRatePercent} başarı oranı
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-4">
            <span className="text-sm font-medium">Ortalama Yanıt Süresi</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-foreground">
              {formatSeconds(metrics.avgResponseTimeSeconds)}
            </div>
            <div className="text-xs text-muted-foreground">Sektör ortalaması 4+ saat</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-4">
            <span className="text-sm font-medium">Tahmini Dönüşüm Artışı</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-foreground">+%84</div>
            <div className="text-xs text-muted-foreground">5 dk altı dönüş avantajı</div>
          </div>
        </div>
      </div>

      {/* Son Lead'ler Listesi */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">Son Gelen Lead'ler</h3>
            <p className="text-xs text-muted-foreground">Formlarınızdan otomatik yakalanan ve işlenen talepler</p>
          </div>
          <Link
            href="/dashboard/leads"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            Tümünü Gör ({leads.length})
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
              <tr>
                <th className="py-3 px-4 font-semibold">Müşteri / E-posta</th>
                <th className="py-3 px-4 font-semibold">Kaynak Form</th>
                <th className="py-3 px-4 font-semibold">Durum</th>
                <th className="py-3 px-4 font-semibold">Yanıt Süresi</th>
                <th className="py-3 px-4 font-semibold">Tarih</th>
                <th className="py-3 px-4 font-semibold text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="hover:bg-accent/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-foreground">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground font-medium">
                    {lead.form_name}
                  </td>
                  <td className="py-3 px-4">
                    {lead.status === "responded" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <MailCheck className="h-3 w-3" />
                        Yanıtlandı
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <Clock className="h-3 w-3" />
                        Bekliyor
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-xs font-medium text-foreground">
                    {lead.response_time_seconds ? formatSeconds(lead.response_time_seconds) : "-"}
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-xs font-medium text-foreground transition"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      İncele
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detay Modal / Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full p-6 shadow-xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h4 className="text-lg font-bold text-foreground">{selectedLead.name}</h4>
                <p className="text-xs text-muted-foreground">{selectedLead.email} • {selectedLead.phone || "Telefon yok"}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg border border-border hover:bg-accent text-muted-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Gelen Müşteri Mesajı / Talep
                </label>
                <div className="mt-1 p-3 rounded-xl bg-muted/40 border border-border text-sm text-foreground leading-relaxed">
                  {selectedLead.message || "Mesaj belirtilmemiş."}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    AI Tarafından Oluşturulan & Gönderilen E-posta
                  </label>
                  {selectedLead.ai_model && (
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Model: {selectedLead.ai_model}
                    </span>
                  )}
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                  {selectedLead.ai_response || "Henüz yanıt üretilmedi."}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-border">
              <button
                onClick={() => {
                  if (selectedLead.ai_response) {
                    navigator.clipboard.writeText(selectedLead.ai_response);
                    toast.success("AI Yanıt metni kopyalandı!");
                  }
                }}
                className="px-4 py-2 rounded-xl border border-border hover:bg-accent text-sm font-semibold transition"
              >
                Yanıtı Kopyala
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
