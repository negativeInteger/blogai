import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useCallback } from "react";

export const useSupabase = () => {
  const { getToken } = useAuth();

  const getSupabaseClient = useCallback(async () => {
    const token = await getToken({ template: "supabase" });

    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );
  }, [getToken]);

  return { getSupabaseClient };
};
