import { Redirect, Slot } from 'expo-router';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  return <Slot />;
}
