-- Create payouts table
CREATE TABLE public.payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES public.profiles(id),
    amount DECIMAL(12, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, rejected
    payment_method TEXT,
    transaction_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bots table
CREATE TABLE public.bots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'offline', -- online, offline, busy
    config JSONB DEFAULT '{}'::jsonb,
    last_seen TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create number_pool table
CREATE TABLE public.number_pool (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bot_id UUID REFERENCES public.bots(id) ON DELETE SET NULL,
    number TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active', -- active, cooling, banned
    payout_rate DECIMAL(10, 4) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create banned_keywords table
CREATE TABLE public.banned_keywords (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword TEXT NOT NULL UNIQUE,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add balance-related fields to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS balance DECIMAL(12, 2) DEFAULT 0.0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_payout_at TIMESTAMP WITH TIME ZONE;

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payouts TO authenticated;
GRANT ALL ON public.payouts TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.bots TO authenticated;
GRANT ALL ON public.bots TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.number_pool TO authenticated;
GRANT ALL ON public.number_pool TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.banned_keywords TO authenticated;
GRANT ALL ON public.banned_keywords TO service_role;

-- Enable RLS
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.number_pool ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banned_keywords ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can manage all payouts" ON public.payouts
    FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Agents can view their own payouts" ON public.payouts
    FOR SELECT USING (agent_id = auth.uid());

CREATE POLICY "Admins can manage bots" ON public.bots
    FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can manage number pool" ON public.number_pool
    FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can manage banned keywords" ON public.banned_keywords
    FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_payouts_updated_at BEFORE UPDATE ON public.payouts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_number_pool_updated_at BEFORE UPDATE ON public.number_pool FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();