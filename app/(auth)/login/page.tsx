import type { Metadata } from 'next';

import { LoginForm } from '../login-form';

export const metadata: Metadata = {
  description: 'Sign in to your Tamkybidi account to access the exchange.',
  title: 'Sign in',
};

export default function LoginPage() {
  return <LoginForm />;
}
