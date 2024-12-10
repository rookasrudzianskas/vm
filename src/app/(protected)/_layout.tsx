import { Redirect, Slot } from 'expo-router';
import { useAuth } from "~/src/contexts/AuthProvider";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  return <Slot />;
}
