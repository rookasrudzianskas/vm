import { Redirect, Slot } from 'expo-router';
import { useAuth } from "~/src/contexts/AuthProvider";

export default async function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return <Slot />;
}
