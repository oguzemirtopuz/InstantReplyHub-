"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-16 h-9" />;
  }

  return (
    <div className="flex items-center rounded-xl border border-border bg-card p-0.5 shadow-sm">
      <button
        onClick={() => setLanguage("tr")}
        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
          language === "tr"
            ? "bg-primary text-primary-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Türkçe"
      >
        TR
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
          language === "en"
            ? "bg-primary text-primary-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
