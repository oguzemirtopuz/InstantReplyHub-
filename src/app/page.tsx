import Link from "next/link";
import { ArrowRight, Bot, Zap, Clock, ShieldCheck, CheckCircle2, Sparkles, Send, BarChart3 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Üst Navigasyon */}
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-sm">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              InstantReplyHub
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition shadow-sm"
            >
              Panoya Git
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Bölümü */}
      <main className="flex-1">
        <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold mb-8 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Destekli Satış ve Lead Dönüşüm Motoru</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-tight sm:leading-none">
            Lead'iniz <span className="text-primary underline decoration-primary/40 underline-offset-8">Saniyeler İçinde</span> Yanıtlansın, Satışınız Katlansın.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Landing page ve formlarınızı (Typeform, Tally, Webflow) dakikalar içinde bağlayın.
            Gelen her potansiyel müşteriye yapay zeka ile kişiselleştirilmiş, samimi ve satış odaklı ilk e-postayı <strong>5 saniye içinde</strong> gönderin.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition shadow-lg shadow-primary/20"
            >
              Hemen Ücretsiz Başla
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/dashboard/simulator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold border border-border bg-card hover:bg-accent transition"
            >
              Canlı AI Simülatörünü Dene
            </Link>
          </div>

          {/* İstatistik Göstergesi */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl border border-border bg-card/50 shadow-sm text-center">
              <div className="text-3xl font-black text-primary">5 Saniye</div>
              <div className="text-sm text-muted-foreground mt-1">Ortalama İlk Yanıt Süresi</div>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card/50 shadow-sm text-center">
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">%82+</div>
              <div className="text-sm text-muted-foreground mt-1">Dönüşüm Artışı (İlk 5 Dk İçinde)</div>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card/50 shadow-sm text-center">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">7/24</div>
              <div className="text-sm text-muted-foreground mt-1">Sıfır İnsan Müdahalesi ile Otomasyon</div>
            </div>
          </div>
        </section>

        {/* Özellikler */}
        <section className="py-20 bg-muted/40 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Nasıl Çalışır?</h2>
              <p className="mt-3 text-muted-foreground">3 basit adımda gelen her lead'i sıcak bir satış fırsatına dönüştürün.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Formunu Bağla</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Webflow, Typeform, Tally veya özel sitenizin form webhook'unu tek tıkla entegre edin. Kodlama gerekmez.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Bot className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. AI Kişiselleştirsin</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Gemini AI, müşterinin bütçesini, ilgilendiği hizmeti ve mesajını analiz ederek şablon değil, insansı ve ikna edici bir e-posta hazırlar.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Send className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Anında Yanıtla & Kazan</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Müşteri henüz sitenizden çıkmadan gelen kutusuna sıcak teklifinizi veya toplantı bağlantınızı ulaştırın.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Alt Bilgi */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 InstantReplyHub. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/dashboard/leads" className="hover:underline">Lead Yönetimi</Link>
            <Link href="/dashboard/simulator" className="hover:underline">Simülatör</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
