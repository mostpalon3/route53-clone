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

export function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await signup(username, email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs" alignItems="center">
            <Link href="/login" style={{ color: '#0972d3', textDecoration: 'none', marginRight: '16px' }}>
              Already have an account? Sign in
            </Link>
            <Button variant="primary" loading={loading} formAction="submit">
              Sign up
            </Button>
          </SpaceBetween>
        }
        errorText={error}
      >
        <Container header={<Header variant="h2">Create a new account</Header>}>
          <SpaceBetween direction="vertical" size="l">
            {error && <Alert type="error" header="Error">{error}</Alert>}
            <FormField label="Username">
              <Input
                value={username}
                onChange={event => setUsername(event.detail.value)}
                type="text"
                placeholder="johndoe"
                disabled={loading}
              />
            </FormField>
            <FormField label="Email">
              <Input
                value={email}
                onChange={event => setEmail(event.detail.value)}
                type="email"
                placeholder="john@example.com"
                disabled={loading}
              />
            </FormField>
            <FormField label="Password">
              <Input
                value={password}
                onChange={event => setPassword(event.detail.value)}
                type="password"
                placeholder="********"
                disabled={loading}
              />
            </FormField>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}
