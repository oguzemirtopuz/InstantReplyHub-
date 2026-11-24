export type LeadStatus = 'pending' | 'processing' | 'responded' | 'failed';

export type IntegrationPlatform = 'typeform' | 'tally' | 'webflow' | 'google_forms' | 'custom';

export interface Lead {
  id: string;
  organization_id?: string;
  integration_id?: string;
  form_name: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  custom_fields?: Record<string, any>;
  status: LeadStatus;
  ai_response?: string;
  ai_model?: string;
  response_time_seconds?: number;
  created_at: string;
  responded_at?: string;
  error_message?: string;
}

export interface Integration {
  id: string;
  organization_id?: string;
  name: string;
  platform: IntegrationPlatform;
  webhook_token: string;
  is_active: boolean;
  auto_reply_enabled: boolean;
  target_email?: string;
  created_at: string;
}

export interface AITemplate {
  id: string;
  organization_id?: string;
  name: string;
  tone: 'friendly' | 'professional' | 'urgent' | 'consultative';
  company_name: string;
  company_description: string;
  cta_text: string;
  custom_instructions: string;
  updated_at: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  respondedLeads: number;
  avgResponseTimeSeconds: number;
  responseRatePercent: number;
  todayLeads: number;
}
