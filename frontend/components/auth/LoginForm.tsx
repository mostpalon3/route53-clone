"use client";

import React, { useState } from 'react';
import Form from '@cloudscape-design/components/form';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Alert from '@cloudscape-design/components/alert';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form
        actions={
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:justify-end">
            <div className="sm:mr-4">
              <Link href="/signup" style={{ color: '#0972d3', textDecoration: 'none' }}>
                Don't have an account? Sign up
              </Link>
            </div>
            <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
              <Button
                formAction="none"
                onClick={() => {
                  setEmail('admin@example.com');
                  setPassword('password123');
                }}
              >
                Autofill
              </Button>
              <Button variant="primary" loading={loading} formAction="submit">
                Sign in
              </Button>
            </div>
          </div>
        }
        errorText={error}
      >
        <Container header={<Header variant="h2">Sign in to Route 53 Clone</Header>}>
          <SpaceBetween direction="vertical" size="l">
            <Alert type="info">Note: Due to cold start of render it will take little bit time at start</Alert>
            {error && <Alert type="error" header="Error">{error}</Alert>}
            <FormField label="Email">
              <Input
                value={email}
                onChange={event => setEmail(event.detail.value)}
                type="email"
                placeholder="Email"
                disabled={loading}
              />
            </FormField>
            <FormField label="Password">
              <Input
                value={password}
                onChange={event => setPassword(event.detail.value)}
                type="password"
                placeholder="Password"
                disabled={loading}
              />
            </FormField>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}
