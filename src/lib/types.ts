export type ProductType = 'business' | 'skills' | 'academy'
export type QualificationStatus = 'lead' | 'mql' | 'sql'
export type ActivityType = 'email' | 'whatsapp' | 'call' | 'meeting' | 'note' | 'stage_change'
export type ActivityDirection = 'inbound' | 'outbound'
export type LifecycleStage = 'subscriber' | 'lead' | 'marketingqualifiedlead' | 'salesqualifiedlead' | 'opportunity' | 'customer' | 'evangelist' | 'other'

export interface Pipeline {
  id: string
  name: string
  product: ProductType
  created_at: string
}

export interface Stage {
  id: string
  pipeline_id: string
  name: string
  display_order: number
  probability: number
  is_won: boolean
  is_lost: boolean
  created_at: string
}

export interface Contact {
  id: string
  hubspot_id: number | null
  first_name: string
  last_name: string | null
  email: string | null
  phone: string | null
  whatsapp: string | null
  company: string | null
  cargo: string | null
  numero_de_liderados: string | null
  faixa_de_faturamento: string | null
  renda_mensal: string | null
  motivo_para_aprender_ia: string | null
  objetivo_com_a_comunidade: string | null
  produto_interesse: ProductType[] | null
  manychat_id: string | null
  whatsapp_opt_in: boolean
  // HubSpot fields
  lifecycle_stage: string | null
  lead_status: string | null
  marketing_status: string | null
  fonte_registro: string | null
  hubspot_owner: string | null
  // Location
  city: string | null
  state: string | null
  address: string | null
  zip_code: string | null
  country: string | null
  // Web/Social
  website_url: string | null
  linkedin_url: string | null
  area_atuacao: string | null
  // Conversion
  first_conversion: string | null
  first_conversion_date: string | null
  last_activity_at: string | null
  // UTM
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  owner_id: string | null
  created_at: string
  updated_at: string
}

// contacts_full view type (includes aggregated deal + activity data)
export interface ContactFull extends Contact {
  full_name: string
  deals_count: number
  active_deals_count: number
  won_deals_count: number
  lost_deals_count: number
  total_deal_value: number
  won_deal_value: number
  last_deal_name: string | null
  last_deal_stage: string | null
  last_deal_product: string | null
  last_deal_amount: number | null
  activities_count: number
  last_activity_type: string | null
  last_activity_subject: string | null
  last_activity_date: string | null
  days_since_creation: number
  days_since_last_activity: number | null
}

export interface Deal {
  id: string
  hubspot_id: number | null
  name: string
  contact_id: string | null
  pipeline_id: string
  stage_id: string
  product: ProductType
  amount: number | null
  qualification_status: QualificationStatus
  canal_origem: string | null
  motivo_perda: string | null
  ultimo_contato: string | null
  stage_entered_at: string
  owner_id: string | null
  closed_at: string | null
  is_won: boolean | null
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  contact_id: string | null
  deal_id: string | null
  type: ActivityType
  direction: ActivityDirection | null
  subject: string | null
  body: string | null
  metadata: Record<string, unknown> | null
  created_by: string | null
  created_at: string
}

export interface EmailTemplate {
  id: string
  product: ProductType
  sequence_order: number
  subject: string
  body_html: string
  delay_days: number
  created_at: string
}

export interface StaleAlertConfig {
  pipeline_id: string
  stage_id: string
  threshold_days: number
}

export interface Database {
  public: {
    Tables: {
      pipelines: { Row: Pipeline; Insert: Omit<Pipeline, 'id' | 'created_at'>; Update: Partial<Omit<Pipeline, 'id'>> }
      stages: { Row: Stage; Insert: Omit<Stage, 'id' | 'created_at'>; Update: Partial<Omit<Stage, 'id'>> }
      contacts: { Row: Contact; Insert: Omit<Contact, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<Contact, 'id'>> }
      deals: { Row: Deal; Insert: Omit<Deal, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<Deal, 'id'>> }
      activities: { Row: Activity; Insert: Omit<Activity, 'id' | 'created_at'>; Update: Partial<Omit<Activity, 'id'>> }
      email_templates: { Row: EmailTemplate; Insert: Omit<EmailTemplate, 'id' | 'created_at'>; Update: Partial<Omit<EmailTemplate, 'id'>> }
    }
  }
}

export interface QualificationCriteria {
  product: ProductType
  level: 'mql' | 'sql'
  rules: QualificationRule[]
}

export interface QualificationRule {
  field: keyof Contact
  operator: 'in' | 'not_null' | 'equals'
  values?: string[]
}

export interface DealWithRelations extends Deal {
  contact?: Contact
  stage?: Stage
  pipeline?: Pipeline
}

export interface ContactWithDeals extends Contact {
  deals?: DealWithStage[]
}

export interface DealWithStage extends Deal {
  stages?: Stage
}
