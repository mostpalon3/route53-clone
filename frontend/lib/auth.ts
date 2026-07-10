import { User } from '../types/auth';

const SESSION_KEY = 'route53_session';

export const saveSession = (user: User): void => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save session', error);
  }
};

export const loadSession = (): User | null => {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) as User : null;
  } catch (error) {
    console.error('Failed to load session', error);
    return null;
  }
};

export const removeSession = (): void => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to remove session', error);
  }
};
