"use client";

import Link from "next/link";
import { ArrowRight, Bot, Zap, Sparkles, Send } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useLanguage();

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

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition shadow-sm"
            >
              {t.nav.overview}
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
            <span>{t.landing.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-tight sm:leading-none">
            {t.landing.heroTitlePrefix}
            <span className="text-primary underline decoration-primary/40 underline-offset-8">
              {t.landing.heroTitleHighlight}
            </span>
            {t.landing.heroTitleSuffix}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.landing.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition shadow-lg shadow-primary/20"
            >
              {t.landing.ctaStart}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/dashboard/simulator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold border border-border bg-card hover:bg-accent transition"
            >
              {t.landing.ctaSimulator}
            </Link>
          </div>

          {/* İstatistik Göstergesi */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl border border-border bg-card/50 shadow-sm text-center">
              <div className="text-3xl font-black text-primary">{t.landing.metricAvgTime}</div>
              <div className="text-sm text-muted-foreground mt-1">{t.landing.metricAvgTimeDesc}</div>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card/50 shadow-sm text-center">
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {t.landing.metricBoost}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{t.landing.metricBoostDesc}</div>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card/50 shadow-sm text-center">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">
                {t.landing.metricAutomation}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{t.landing.metricAutomationDesc}</div>
            </div>
          </div>
        </section>

        {/* Özellikler */}
        <section className="py-20 bg-muted/40 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight">{t.landing.howItWorksTitle}</h2>
              <p className="mt-3 text-muted-foreground">{t.landing.howItWorksSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t.landing.step1Title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.landing.step1Desc}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Bot className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t.landing.step2Title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.landing.step2Desc}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Send className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t.landing.step3Title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.landing.step3Desc}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Alt Bilgi */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{t.landing.footerCopyright}</p>
          <div className="flex gap-6">
            <Link href="/dashboard" className="hover:underline">{t.nav.overview}</Link>
            <Link href="/dashboard/leads" className="hover:underline">{t.nav.leads}</Link>
            <Link href="/dashboard/simulator" className="hover:underline">{t.nav.simulator}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
