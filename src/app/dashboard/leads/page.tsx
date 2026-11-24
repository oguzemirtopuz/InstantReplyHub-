"use client";

import * as React from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Eye, 
  Sparkles, 
  Clock, 
  MailCheck, 
  Check, 
  Copy,
  AlertCircle,
  FileSpreadsheet
} from "lucide-react";
import { INITIAL_LEADS } from "@/lib/data-store";
import { Lead } from "@/types";
import { formatDate, formatSeconds } from "@/lib/utils";
import { toast } from "sonner";

export default function LeadsManagementPage() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
  const [processingId, setProcessingId] = React.useState<string | null>(null);

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
    }
  }, []);

  const saveLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
    localStorage.setItem("irh_leads", JSON.stringify(newLeads));
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      (lead.message && lead.message.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "all" ? true : lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Manuel AI Yanıt Tetikleme
  const triggerManualAIResponse = async (lead: Lead) => {
    setProcessingId(lead.id);
    toast.info("Gemini AI ile kişiselleştirilmiş yanıt hazırlanıyor...");

    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          message: lead.message,
          formName: lead.form_name,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yanıt oluşturulamadı");

      const updated = leads.map((l) =>
        l.id === lead.id
          ? {
              ...l,
              status: "responded" as const,
              ai_response: data.reply,
              ai_model: data.model || "gemini-1.5-flash",
              response_time_seconds: 3,
              responded_at: new Date().toISOString(),
            }
          : l
      );

      saveLeads(updated);
      toast.success(`${lead.name} için AI yanıtı oluşturuldu ve kaydedildi!`);
      if (selectedLead && selectedLead.id === lead.id) {
        setSelectedLead(updated.find((u) => u.id === lead.id) || null);
      }
    } catch (err: any) {
      toast.error(err.message || "Bir hata oluştu");
    } finally {
      setProcessingId(null);
    }
  };

  // Silme
  const handleDelete = (id: string) => {
    if (confirm("Bu lead kaydını silmek istediğinize emin misiniz?")) {
      const updated = leads.filter((l) => l.id !== id);
      saveLeads(updated);
      toast.success("Lead silindi.");
      if (selectedLead && selectedLead.id === id) setSelectedLead(null);
    }
  };

  // CSV Dışa Aktarımı
  const exportCSV = () => {
    if (leads.length === 0) {
      toast.error("Dışa aktarılacak lead bulunmuyor.");
      return;
    }

    const headers = ["ID", "Müşteri Adı", "E-posta", "Telefon", "Kaynak Form", "Durum", "Yanıt Süresi (sn)", "Tarih"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      l.email,
      l.phone || "",
      `"${l.form_name.replace(/"/g, '""')}"`,
      l.status,
      l.response_time_seconds || 0,
      l.created_at,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `InstantReplyHub_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("CSV dosyası başarıyla indirildi!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Lead Yönetimi</h2>
          <p className="text-sm text-muted-foreground">Tüm gelen form kayıtlarını inceleyin, filtreleyin ve AI yanıtlarını yönetin.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:bg-accent text-sm font-semibold transition shadow-sm"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            CSV Olarak İndir
          </button>
        </div>
      </div>

      {/* Arama ve Filtreleme Çubuğu */}
      <div className="p-4 rounded-2xl border border-border bg-card flex flex-col sm:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="İsim, e-posta veya mesaj ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Tüm Durumlar ({leads.length})</option>
            <option value="responded">Yanıtlananlar ({leads.filter((l) => l.status === "responded").length})</option>
            <option value="pending">Bekleyenler ({leads.filter((l) => l.status === "pending").length})</option>
          </select>
        </div>
      </div>

      {/* Lead Tablosu */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
              <tr>
                <th className="py-3 px-4 font-semibold">Müşteri</th>
                <th className="py-3 px-4 font-semibold">Kaynak Form</th>
                <th className="py-3 px-4 font-semibold">Mesaj Özeti</th>
                <th className="py-3 px-4 font-semibold">Durum</th>
                <th className="py-3 px-4 font-semibold">Yanıt Süresi</th>
                <th className="py-3 px-4 font-semibold">Tarih</th>
                <th className="py-3 px-4 font-semibold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    Aramanıza uygun lead bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-accent/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-foreground">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">{lead.email}</div>
                    </td>
                    <td className="py-3 px-4 text-xs font-medium text-muted-foreground">
                      {lead.form_name}
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground max-w-xs truncate">
                      {lead.message || "-"}
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
                      <div className="flex items-center justify-end gap-1.5">
                        {lead.status === "pending" && (
                          <button
                            onClick={() => triggerManualAIResponse(lead)}
                            disabled={processingId === lead.id}
                            title="AI Yanıtı Üret"
                            className="p-1.5 rounded-lg border border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition text-xs"
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedLead(lead)}
                          title="İncele"
                          className="p-1.5 rounded-lg border border-border hover:bg-accent text-foreground transition"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          title="Sil"
                          className="p-1.5 rounded-lg border border-border hover:bg-destructive/10 hover:text-destructive transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detay Modal */}
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
                  Gelen Form Mesajı
                </label>
                <div className="mt-1 p-3 rounded-xl bg-muted/40 border border-border text-sm text-foreground leading-relaxed">
                  {selectedLead.message || "Mesaj yok."}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    AI Tarafından Gönderilen Yanıt
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

            <div className="flex justify-between items-center pt-2 border-t border-border">
              {selectedLead.status === "pending" ? (
                <button
                  onClick={() => triggerManualAIResponse(selectedLead)}
                  disabled={processingId === selectedLead.id}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition"
                >
                  <Sparkles className="h-4 w-4" />
                  Şimdi AI Yanıtı Oluştur & Gönder
                </button>
              ) : <div />}

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (selectedLead.ai_response) {
                      navigator.clipboard.writeText(selectedLead.ai_response);
                      toast.success("AI Yanıt metni kopyalandı!");
                    }
                  }}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-accent text-sm font-semibold transition"
                >
                  Metni Kopyala
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
        </div>
      )}
    </div>
  );
}
