CREATE TABLE public.whitelist_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  twitter_username TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  stage TEXT NOT NULL DEFAULT 'GTD',
  followed BOOLEAN NOT NULL DEFAULT false,
  liked BOOLEAN NOT NULL DEFAULT false,
  shared BOOLEAN NOT NULL DEFAULT false,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX whitelist_entries_twitter_username_key ON public.whitelist_entries (lower(twitter_username));
CREATE UNIQUE INDEX whitelist_entries_wallet_address_key ON public.whitelist_entries (lower(wallet_address));

GRANT INSERT ON public.whitelist_entries TO anon, authenticated;
GRANT ALL ON public.whitelist_entries TO service_role;

ALTER TABLE public.whitelist_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a whitelist entry"
ON public.whitelist_entries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) BETWEEN 1 AND 80
  AND length(trim(twitter_username)) BETWEEN 1 AND 40
  AND length(trim(wallet_address)) BETWEEN 8 AND 120
  AND stage IN ('GTD', 'FCFS')
  AND followed = true
  AND liked = true
  AND shared = true
  AND (note IS NULL OR length(note) <= 300)
);