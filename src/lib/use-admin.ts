import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AdminState = {
  loading: boolean;
  session: Session | null;
  isAdmin: boolean;
};

async function checkAdmin(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  return Boolean(data);
}

export function useAdmin(): AdminState {
  const [state, setState] = useState<AdminState>({
    loading: true,
    session: null,
    isAdmin: false,
  });

  useEffect(() => {
    let active = true;

    const resolve = async (session: Session | null) => {
      if (!session?.user) {
        if (active) setState({ loading: false, session: null, isAdmin: false });
        return;
      }
      let admin = await checkAdmin(session.user.id);
      if (!admin) {
        // The first account to sign in becomes the newsroom admin.
        const { data } = await supabase.rpc("claim_admin");
        admin = data === true ? await checkAdmin(session.user.id) : false;
      }
      if (active) setState({ loading: false, session, isAdmin: admin });
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void resolve(session);
    });
    void supabase.auth.getSession().then(({ data }) => resolve(data.session));

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
