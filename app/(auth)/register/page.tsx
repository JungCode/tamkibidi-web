import type { Metadata } from 'next';

import { RegisterForm } from '../register-form';

export const metadata: Metadata = {
  description: 'Create a Tamkybidi account to start trading game assets.',
  title: 'Create account',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
