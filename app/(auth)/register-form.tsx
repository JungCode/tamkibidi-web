'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useRegisterMutation } from '../../src/shared/register.schemas';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { tokens } from '../lib/tokens';

export function RegisterForm() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerMutation, { error, loading }] = useRegisterMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await registerMutation({
      variables: { input: { email, password, userName } },
    });
    if (result.data?.register) {
      tokens.set(
        result.data.register.accessToken,
        result.data.register.refreshToken,
      );
      router.push('/');
    }
  }

  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="pointer-events-none absolute -top-28 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(111,121,255,0.18)_0%,rgba(111,121,255,0)_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,183,134,0.12)_0%,rgba(255,183,134,0)_70%)] blur-3xl" />

      <Card className="relative rounded-4xl border-white/10 bg-[#11161f] px-2 py-2 shadow-[0_32px_90px_rgba(0,0,0,0.5)]">
        <CardHeader className="pb-2">
          <p className="text-xs font-bold tracking-[0.22em] text-[#9097ff] uppercase">
            Get started
          </p>
          <CardTitle className="text-3xl font-black text-white">
            Create account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="reg-username">Username</Label>
              <Input
                id="reg-username"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="your_handle"
                required
                type="text"
                value={userName}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reg-email">Email address</Label>
              <Input
                id="reg-email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reg-password">Password</Label>
              <Input
                id="reg-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                type="password"
                value={password}
              />
            </div>

            <Button
              className="mt-2 h-12 w-full rounded-2xl text-base font-bold shadow-[0_16px_50px_rgba(111,121,255,0.28)] transition hover:-translate-y-0.5"
              disabled={loading}
              size="lg"
              type="submit"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </Button>

            <p className="text-center text-xs text-[#6b7494]">
              By creating an account you agree to our terms of service.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
