import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "~/src/lib/supabase";
import { Session } from "@supabase/auth-js";
import { AppState } from "react-native";

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

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
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
// rokas.rudzianskas@gmail.com
// rokas2020
