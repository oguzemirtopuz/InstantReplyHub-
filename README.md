# ⚡ InstantReplyHub — Autonomous AI Lead Responder & Instant Conversion Engine

<div align="center">

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini_1.5_Flash-8E75C2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Resend](https://img.shields.io/badge/Email-Resend_API-000000?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase_RLS-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Bilingual](https://img.shields.io/badge/Language-EN%20%7C%20TR-blue?style=for-the-badge)](README.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<h1>🚀 InstantReplyHub</h1>
<h3>Reply to inbound leads in under 5 seconds. Convert warm interest before it cools down.</h3>

<p><em>Not a static "we received your message" auto-responder. An autonomous B2B sales qualification & tailored email dispatch engine powered by Gemini 1.5 Flash.</em></p>

</div>

---

> **The 5-Minute Law of Lead Response:**  
> Studies show that contacting a prospect within **5 minutes** of form submission yields a **21x increase in qualification likelihood** compared to a 30-minute delay. Yet, the median response time for B2B companies is **42 hours**.  
> **InstantReplyHub permanently solves this asymmetry.** It hooks directly into your Typeform, Tally, Webflow, or custom forms via universal webhooks, analyzes the prospect's intent with Google Gemini AI, and dispatches a personalized, human-like sales proposal to their inbox in **under 5 seconds**.

---

## 🎯 What Problem Does This Solve?

1. **The Inbound Black Hole:** Potential customers submit high-intent inquiry forms and wait hours (or days) for a human rep to notice, research, and manually type a reply. By then, they’ve already hired a competitor.
2. **Generic Robot Auto-Responders:** Traditional auto-responders (*"Thank you for contacting us, ticket #4812 created"*) kill momentum. They communicate zero value and generate zero bookings.
3. **Complex CRM Overhead:** Setting up Zapier + Make + OpenAI + HubSpot workflows is fragile, expensive, and breaks constantly upon schema changes.
4. **Bilingual Disconnect:** Global agencies and startups operate across borders but lack dynamic language detection to respond in native English or Turkish seamlessly.

---

## 👥 Who This Is For

| Target Audience | The InstantReplyHub Advantage |
|---|---|
| **Digital Marketing & SEO Agencies** | Capture high-ticket client inquiries instantly and book discovery calls automatically before clients leave the landing page. |
| **B2B SaaS & Tech Startups** | Eliminate qualification friction. Provide instant roadmap feedback and calendar links to inbound trial leads. |
| **Solo Founders & Indie Hackers** | Run a 24/7 autonomous sales department with zero human reps required. |
| **Consultants & Freelancers** | Convert inbound service requests into paid consultations with tailored discovery questions. |

---

## 🔥 The Hook: What Makes InstantReplyHub Different

| Dimension | Generic Auto-Responder | Human Sales Rep | ⚡ InstantReplyHub |
|---|---|---|---|
| **Turnaround Time** | Immediate (0s) | 4 to 48 hours | **Sub-5 seconds (<5s)** |
| **Personalization** | ❌ None (Static template) | ✅ High (Manual research) | **✅ High (Gemini AI contextual extraction)** |
| **Call to Action (CTA)** | ❌ None | ⚠️ Dependent on rep skill | **✅ Guaranteed demo/meeting booking injection** |
| **Availability** | 24/7 | Business hours only | **24/7/365 uninterrupted** |
| **Cost per Lead** | Free | \$30–\$75/hour | **<$0.001 per lead** |
| **Resilience & Fallback**| None | Prone to human fatigue | **Fail-safe offline mode (Zero-crash guarantee)** |

---

## ⚡ The 4-Stage Autonomous Pipeline

```
  📥 Inbound Form Submission (Typeform / Tally / Webflow / Custom)
                           │
                           ▼
 ┌─────────────────────────────────────────────────────────────┐
 │ Stage 1: Universal Webhook Normalization                     │
 │ • Extracts name, email, phone, message & intent             │
 │ • Normalizes schema across all form platform providers      │
 │ • Detects language context (EN vs. TR)                      │
 └─────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
 ┌─────────────────────────────────────────────────────────────┐
 │ Stage 2: Gemini 1.5 Flash Cognitive Sales Engine            │
 │ • Ingests company profile, tone of voice, and custom rules  │
 │ • Contextualizes prospect's pain point and specific request │
 │ • Synthesizes a consultative, persuasive proposal body     │
 └─────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
 ┌─────────────────────────────────────────────────────────────┐
 │ Stage 3: Instant Dispatch & Logging                         │
 │ • Resend API delivers personalized email to lead's inbox    │
 │ • Logs turnaround latency, status & payload to database     │
 │ • Multi-tenant Supabase PostgreSQL with RLS isolation       │
 └─────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
 ┌─────────────────────────────────────────────────────────────┐
 │ Stage 4: Real-Time SaaS Analytics & Lead Management         │
 │ • Live overview dashboard with response time benchmarks     │
 │ • Manual AI re-generation trigger, CSV export & simulator   │
 └─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Architecture & Core Features

### 1. Universal Webhook Ingestion Engine (`/api/webhook/[token]`)
- **Schema-Agnostic Normalizer:** Automatically unpacks payloads from Tally (`data.fields`), Typeform (`form_response.answers`), Webflow, and raw JSON.
- **Language Auto-Detection:** Determines whether the customer communicated in English or Turkish and instructs the AI to reply in the identical language.
- **Payload Guard:** Rejects malformed requests (`400 Bad Request`) without leaking server errors or compromising performance.

### 2. Dual-Language AI Engine (`src/lib/gemini.ts`)
- **Context-Aware Reasoning:** Ingests company profile, USP, target calendar link (Cal.com, Calendly), and customer service category.
- **Tone Customizer:** Select from *Friendly & Energetic*, *Corporate & Formal*, *Expert Consultant*, or *Fast & Sales-Driven*.
- **Smart Fallback Engine:** If an API key is missing or quota is temporarily exhausted, the engine defaults gracefully to a dynamic smart template—guaranteeing **zero broken user experiences**.

### 3. Production SaaS Dashboard (`/dashboard`)
- **Executive Metrics:** Total leads, auto-responded count, average response time (seconds), and calculated conversion lift.
- **Lead Management Table (`/dashboard/leads`):** Search, status filtering (Pending / Responded), modal drawer inspection, manual AI re-triggering, and single-click CSV export.
- **Live AI Simulator (`/dashboard/simulator`):** Test the entire pipeline directly inside the browser with a live stopwatch and visual output before wiring production forms.
- **Bilingual Interface (`src/lib/i18n.tsx`):** Seamless `TR | EN` toggle with persistent state across the landing page, dashboard, and settings.
- **Dark / Light Theme:** First-class color tokens using Tailwind CSS and `next-themes`.

---

## 💻 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.6 (Strict Mode)
- **Styling:** Tailwind CSS, PostCSS, Lucide Icons, Sonner Toasts
- **AI Model:** Google Gemini 1.5 Flash (`@google/generative-ai`)
- **Email Delivery:** Resend API
- **Database & Auth:** Supabase (PostgreSQL with Row Level Security)
- **Internationalization:** Native reactive React i18n context (`EN` / `TR`)
- **Deployment Target:** Vercel

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- A [Google Gemini API Key](https://aistudio.google.com/) *(optional for demo mode)*
- A [Resend API Key](https://resend.com/) *(optional for simulated delivery)*

### 1. Clone & Install

```bash
git clone https://github.com/oguzemirtopuz/InstantReplyHub-.git
cd InstantReplyHub-
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory (refer to `.env.example`):

```env
# Supabase Configuration (Optional: runs in local demo mode if omitted)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Gemini API
GEMINI_API_KEY=AIzaSy...

# Resend Email Service
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 Webhook Integration Guide

Connect your form by sending an HTTP `POST` request to your unique endpoint:

```http
POST https://your-domain.com/api/webhook/{webhook_token}
Content-Type: application/json

{
  "name": "Sarah Jenkins",
  "email": "sarah@enterprise.com",
  "phone": "+1 (555) 019-2834",
  "service": "Enterprise AI Automation",
  "message": "We receive 150+ form leads weekly and need autonomous sub-5s response dispatch."
}
```

### Example Curl Test

```bash
curl -X POST http://localhost:3000/api/webhook/wh_tok_tf_98231a4f \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Morgan",
    "email": "alex@company.com",
    "message": "Interested in custom AI workflow onboarding.",
    "service": "B2B SaaS"
  }'
```

---

## 🧪 Verification & Automated Testing

InstantReplyHub comes with automated logic and end-to-end normalization test suites:

```bash
# Run unit & webhook normalization checks
node scripts/test-webhook.mjs

# Run dual-language end-to-end AI logic validation
npx tsx scripts/test-e2e.mjs

# Validate production Next.js compilation
npm run build
```

---

## 🛡️ Reliability & Fault Tolerance

- **Zero-Crash Resilience:** Missing API keys degrade to smart fallback templates rather than throwing unhandled exceptions.
- **Defensive Parsing:** Malformed, nested, or missing form fields are sanitized cleanly with default fallbacks.
- **Multi-Tenant Row Level Security:** PostgreSQL RLS ensures each user and organization can only view and mutate their own leads and integration keys.

---

## 👤 Author

**Oğuz Emir Topuz**  
*Autonomous AI Systems · Deployed SaaS · Developer Tools*  
- 🐙 GitHub: [@oguzemirtopuz](https://github.com/oguzemirtopuz)  
- 📧 Email: [oguzemirtopuz10@gmail.com](mailto:oguzemirtopuz10@gmail.com)  
- 🌐 Website: [oguzemirtopuz.github.io](https://oguzemirtopuz.github.io/)  
- 🎮 Steam: [Cropocalypse](https://store.steampowered.com/app/4259600/Cropocalypse/)  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
