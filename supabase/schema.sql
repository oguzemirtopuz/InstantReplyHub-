-- InstantReplyHub Supabase PostgreSQL Şeması ve RLS Güvenlik Kuralları

-- 1. UUID Uzantısı
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Organizations (Organizasyonlar / Şirketler)
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    plan VARCHAR(50) DEFAULT 'free', -- 'free', 'starter', 'pro'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Integrations (Form ve Webhook Entegrasyonları)
CREATE TABLE IF NOT EXISTS public.integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL, -- 'typeform', 'tally', 'webflow', 'google_forms', 'custom'
    webhook_token VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    auto_reply_enabled BOOLEAN DEFAULT TRUE,
    target_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. AI Templates (Prompt Kuralları ve Şablonlar)
CREATE TABLE IF NOT EXISTS public.ai_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) DEFAULT 'Standart Şablon',
    tone VARCHAR(50) DEFAULT 'friendly', -- 'friendly', 'professional', 'urgent', 'consultative'
    company_name VARCHAR(255),
    company_description TEXT,
    cta_text TEXT,
    custom_instructions TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Leads (Gelen Müşteri Talepleri)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    integration_id UUID REFERENCES public.integrations(id) ON DELETE SET NULL,
    form_name VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    custom_fields JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'responded', 'failed'
    ai_response TEXT,
    ai_model VARCHAR(50),
    response_time_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    responded_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT
);

-- 6. Email Logs (Gönderilen E-posta Günlükleri)
CREATE TABLE IF NOT EXISTS public.email_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    recipient VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'sent', -- 'sent', 'failed'
    provider_id VARCHAR(100), -- Resend mesaj ID'si
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_leads_org ON public.leads(organization_id);
CREATE INDEX IF NOT EXISTS idx_leads_integration ON public.leads(integration_id);
CREATE INDEX IF NOT EXISTS idx_integrations_token ON public.integrations(webhook_token);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLİTİKALARI
-- =========================================================================

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Organizations RLS
CREATE POLICY "Kullanıcılar sadece kendi organizasyonlarını görebilir"
    ON public.organizations FOR ALL
    USING (auth.uid() = user_id);

-- Integrations RLS
CREATE POLICY "Kullanıcılar kendi entegrasyonlarını yönetebilir"
    ON public.integrations FOR ALL
    USING (
        organization_id IN (
            SELECT id FROM public.organizations WHERE user_id = auth.uid()
        )
    );

-- AI Templates RLS
CREATE POLICY "Kullanıcılar kendi şablonlarını yönetebilir"
    ON public.ai_templates FOR ALL
    USING (
        organization_id IN (
            SELECT id FROM public.organizations WHERE user_id = auth.uid()
        )
    );

-- Leads RLS
CREATE POLICY "Kullanıcılar kendi leadlerini görüntüleyebilir ve güncelleyebilir"
    ON public.leads FOR ALL
    USING (
        organization_id IN (
            SELECT id FROM public.organizations WHERE user_id = auth.uid()
        )
    );

-- Webhook Servis Rolü için Özel Erişim (Backend API insert)
CREATE POLICY "Servis rolü lead ekleyebilir"
    ON public.leads FOR INSERT
    WITH CHECK (true);
