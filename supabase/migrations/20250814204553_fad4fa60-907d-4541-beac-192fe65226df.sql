-- Create table for project leads/quotes captured through the form
CREATE TABLE public.project_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  
  -- Project details
  project_title TEXT NOT NULL,
  project_type TEXT NOT NULL,
  project_description TEXT NOT NULL,
  
  -- Scope and features
  features JSONB DEFAULT '[]'::jsonb,
  platforms JSONB DEFAULT '[]'::jsonb,
  
  -- Budget and timeline
  budget TEXT NOT NULL,
  timeline TEXT NOT NULL,
  
  -- Additional information
  has_existing_brand TEXT NOT NULL,
  additional_info TEXT,
  preferred_contact TEXT NOT NULL,
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'new',
  priority TEXT NOT NULL DEFAULT 'medium',
  assigned_to UUID,
  
  -- Metadata
  source TEXT DEFAULT 'website_form',
  ip_address INET,
  user_agent TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('new', 'contacted', 'in_progress', 'quoted', 'won', 'lost', 'archived')),
  CONSTRAINT valid_priority CHECK (priority IN ('low', 'medium', 'high', 'urgent'))
);

-- Enable Row Level Security
ALTER TABLE public.project_leads ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin full access for project_leads" 
ON public.project_leads 
FOR ALL 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_project_leads_status ON public.project_leads(status);
CREATE INDEX idx_project_leads_priority ON public.project_leads(priority);
CREATE INDEX idx_project_leads_created_at ON public.project_leads(created_at DESC);
CREATE INDEX idx_project_leads_email ON public.project_leads(email);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_project_leads_updated_at
BEFORE UPDATE ON public.project_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create table for email notifications log
CREATE TABLE public.email_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_lead_id UUID REFERENCES public.project_leads(id) ON DELETE CASCADE,
  
  -- Email details
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  template_name TEXT NOT NULL,
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  CONSTRAINT valid_notification_status CHECK (status IN ('pending', 'sent', 'failed', 'retrying'))
);

-- Enable RLS and policies for email notifications
ALTER TABLE public.email_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access for email_notifications" 
ON public.email_notifications 
FOR ALL 
USING (true);

-- Create index for email notifications
CREATE INDEX idx_email_notifications_status ON public.email_notifications(status);
CREATE INDEX idx_email_notifications_created_at ON public.email_notifications(created_at DESC);