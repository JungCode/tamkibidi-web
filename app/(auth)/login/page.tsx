import type { Metadata } from 'next';

import { LoginForm } from '../../../src/features/auth/components/login-form';

export const metadata: Metadata = {
  description: 'Sign in to your Tamkybidi account to access the exchange.',
  title: 'Sign in',
};

export default function LoginPage() {
  return <LoginForm />;
}
