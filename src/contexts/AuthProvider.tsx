import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "~/src/lib/supabase";
import { Session } from "@supabase/auth-js";

type AuthContextType = {
  session: Session | null;
  user: any | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    });
  }, []);

  if (loading) {
    return null;
  }

  return <AuthContext.Provider value={{
    session,
    user: session?.user ?? null,
    isAuthenticated: !!session,
  }}>
    {children}
  </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
