"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      // Supabase ayarlanmadıysa yerel oturumla devam et
      localStorage.setItem("irh_user", JSON.stringify({ email }));
      toast.success("Demo oturumu açıldı!");
      router.push("/dashboard");
      return;
    }

    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Kayıt başarılı! Lütfen e-postanızı onaylayın veya panele geçin.");
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Giriş yapıldı!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message || "Giriş işlemi başarısız oldu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    localStorage.setItem("irh_user", JSON.stringify({ email: "demo@instantreplyhub.com" }));
    toast.success("Demo kullanıcısı olarak giriş yapıldı!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-md">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              InstantReplyHub
            </span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {isRegister ? "Yeni Hesap Oluşturun" : "Hesabınıza Giriş Yapın"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Formlarınızdan gelen her lead'i saniyeler içinde karşılayın.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-border bg-card shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="ornek@sirketiniz.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-bold transition shadow-sm disabled:opacity-50"
            >
              {isRegister ? "Kayıt Ol & Başla" : "Giriş Yap"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-border w-full" />
            <span className="bg-card px-3 text-xs text-muted-foreground uppercase">veya</span>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-border bg-background hover:bg-accent text-sm font-semibold transition"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            Hemen Demo Olarak Giriş Yap
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-primary hover:underline font-semibold"
            >
              {isRegister
                ? "Zaten hesabınız var mı? Giriş yapın"
                : "Hesabınız yok mu? Yeni hesap oluşturun"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
