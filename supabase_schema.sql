-- ============================================================================
-- RE+ 26 Executive Briefing & 進能服台灣落地戰略平台
-- Supabase PostgreSQL Schema & Row Level Security (RLS) Policy Script
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.replus26_action_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  category text NOT NULL,
  title text NOT NULL,
  replus_tech text NOT NULL,
  owner_team text NOT NULL,
  horizon text NOT NULL,
  priority text NOT NULL DEFAULT 'P1',
  status text NOT NULL DEFAULT '待啟動',
  progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  target_kpi text,
  notes text,
  updated_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.replus26_tech_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  target_name text NOT NULL,
  target_type text NOT NULL,
  reviewer_name text NOT NULL,
  department text NOT NULL,
  tw_fit_score integer NOT NULL CHECK (tw_fit_score BETWEEN 1 AND 5),
  urgency_score integer NOT NULL CHECK (urgency_score BETWEEN 1 AND 5),
  comment text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.replus26_action_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.replus26_tech_evaluations ENABLE ROW LEVEL SECURITY;

-- Public Read Access (for GitHub Pages executive briefing viewing)
CREATE POLICY "replus26_read_actions"
  ON public.replus26_action_items FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "replus26_read_evals"
  ON public.replus26_tech_evaluations FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated Write Access (zero service_role key on frontend)
CREATE POLICY "replus26_insert_actions"
  ON public.replus26_action_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "replus26_update_actions"
  ON public.replus26_action_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "replus26_delete_actions"
  ON public.replus26_action_items FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "replus26_insert_evals"
  ON public.replus26_tech_evaluations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "replus26_delete_evals"
  ON public.replus26_tech_evaluations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
