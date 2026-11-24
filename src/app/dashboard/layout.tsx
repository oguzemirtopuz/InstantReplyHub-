"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Zap, 
  LayoutDashboard, 
  Users, 
  Radio, 
  Sparkles, 
  Settings, 
  Menu, 
  X,
  ExternalLink,
  Bot
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/i18n";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.overview, href: "/dashboard", icon: LayoutDashboard },
    { label: t.nav.leads, href: "/dashboard/leads", icon: Users },
    { label: t.nav.integrations, href: "/dashboard/integrations", icon: Radio },
    { label: t.nav.simulator, href: "/dashboard/simulator", icon: Sparkles },
    { label: t.nav.settings, href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Masaüstü Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/50 backdrop-blur p-4 select-none">
        <div className="flex items-center gap-2 px-2 py-4 mb-4">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-sm">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight leading-tight">
              InstantReplyHub
            </span>
            <span className="text-[11px] text-muted-foreground font-medium">
              SaaS v1.0 • {t.common.active}
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Alt Bilgi & Hızlı Yardım */}
        <div className="mt-auto pt-4 border-t border-border">
          <div className="p-3 rounded-xl bg-muted/60 border border-border/80 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-foreground mb-1">
              <Bot className="h-3.5 w-3.5 text-primary" />
              <span>{t.nav.aiEngineActive}</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t.nav.aiEngineDesc}
            </p>
          </div>
        </div>
      </aside>

      {/* Ana İçerik Alanı */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Üst Bar */}
        <header className="h-16 border-b border-border bg-card/60 backdrop-blur px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-border md:hidden text-foreground hover:bg-accent"
              aria-label="Menüyü aç"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground truncate">
              {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition font-medium mr-1"
            >
              <span>{t.nav.landingPage}</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </header>

        {/* Mobil Menü Çekmecesi */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-card p-4 space-y-2 z-20 animate-in slide-in-from-top-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Sayfa İçeriği */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
