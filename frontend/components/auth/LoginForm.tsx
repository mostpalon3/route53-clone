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
import { useAuth } from '../../hooks/useAuth';

export function LoginForm() {
  const { login } = useAuth();
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
      // Typically we would redirect here or let a layout handle the redirection
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
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              formAction="none"
              onClick={() => {
                setEmail('admin@example.com');
                setPassword('password123');
              }}
            >
              Autofill Mock Details
            </Button>
            <Button variant="primary" loading={loading} formAction="submit">
              Sign in
            </Button>
          </SpaceBetween>
        }
        errorText={error}
      >
        <Container header={<Header variant="h2">Sign in to Route 53 Clone</Header>}>
          <SpaceBetween direction="vertical" size="l">
            {error && <Alert type="error" header="Error">{error}</Alert>}
            <FormField label="Email">
              <Input
                value={email}
                onChange={event => setEmail(event.detail.value)}
                type="email"
                placeholder="admin@example.com"
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
