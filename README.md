# InstantReplyHub 🚀
> **Lead'iniz Saniyeler İçinde Yanıtlansın, Satışınız Katlansın.**

InstantReplyHub; landing page, Typeform, Tally ve Webflow formlarınızdan gelen potansiyel müşterileri (lead) anında yapay zeka (Google Gemini 1.5 Flash) ile analiz eden, kişiselleştirilmiş sıcak satış e-postaları üreten ve Resend üzerinden 5 saniyenin altında otomatik yanıtlayan modern bir B2B SaaS platformudur.

---

## 🌟 Öne Çıkan Özellikler

- ⚡ **5 Saniyenin Altında Yanıt:** Form gönderildiği an webhook tetiklenir, yapay zeka müşterinin mesajını ve talebini analiz ederek anında e-posta yanıtı oluşturur.
- 🤖 **Gemini 1.5 Flash Motoru:** Şablon cümleler yerine samimi, şirketinizin profilini yansıtan ve randevu/demo linkinizi (CTA) içeren insansı metinler.
- 📡 **Evrensel Webhook Desteği:** Typeform, Tally, Webflow veya özel HTML formlarından gelen verileri otomatik normalize eden akıllı API katmanı.
- 📊 **SaaS Dashboard & Analitik:** Toplam lead, yanıtlanma oranı, ortalama yanıt süresi ve tahmini dönüşüm metrikleri.
- 🧪 **Canlı AI Simülatörü:** Kod yazmadan veya form kurmadan panel üzerinden canlı lead simülasyonu yapma imkanı.
- 📁 **CSV & Veri Yönetimi:** Gelen tüm lead kayıtlarını inceleme, filtreleme ve tek tıkla CSV olarak dışa aktarma.
- 🔒 **Supabase & RLS Güvenliği:** PostgreSQL veri şeması, çoklu kullanıcı güvenliği ve esnek API anahtarı yönetimi.
- 🌓 **Modern UI/UX:** Next.js 14 App Router, TypeScript, Tailwind CSS ve Dark/Light mode desteği.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Sonner Toast
- **Yapay Zeka (AI):** `@google/generative-ai` (Gemini 1.5 Flash)
- **E-posta Altyapısı:** Resend API
- **Veritabanı & Auth:** Supabase (PostgreSQL) & Row Level Security (RLS)
- **Deployment:** Vercel

---

## 🚀 Hızlı Başlangıç (Local Geliştirme)

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Çevresel Değişkenleri Ayarlayın
`.env.example` dosyasını `.env.local` olarak kopyalayın:
```bash
cp .env.example .env.local
```

Aşağıdaki anahtarları tanımlayın:
```env
# Supabase (Opsiyonel: tanımlanmadığında demo modunda yerel çalışır)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Google Gemini API (https://aistudio.google.com)
GEMINI_API_KEY=AIzaSy...

# Resend API (https://resend.com)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

---

## 📡 Webhook Kullanımı

Form platformunuzdan (Typeform, Tally, Webflow vb.) aşağıdaki adrese **POST** isteği gönderin:

```http
POST /api/webhook/{webhook_token}
Content-Type: application/json

{
  "name": "Ahmet Yılmaz",
  "email": "ahmet@sirketiniz.com",
  "phone": "+90 532 111 22 33",
  "message": "Fiyat teklifi ve entegrasyon süresini öğrenmek istiyorum.",
  "service": "Kurumsal SaaS Paketi"
}
```

---

## 🧪 Testleri Çalıştırma

```bash
node scripts/test-webhook.mjs
npm run build
```

---

## 🚢 Vercel Üzerinde Canlıya Alma

1. Repoyu GitHub'a pushlayın.
2. [Vercel](https://vercel.com) üzerinde projeyi import edin.
3. `.env.example` içerisindeki ortam değişkenlerini Vercel Dashboard > Project Settings > Environment Variables bölümüne ekleyin.
4. "Deploy" butonuna basın.
