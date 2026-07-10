import { IconProps } from '@cloudscape-design/components/icon';

export interface NavigationItem {
  id: string;
  text: string;
  href: string;
  iconName?: IconProps.Name;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'dashboard', text: 'Dashboard', href: '/dashboard', iconName: 'insert-row' },
  { id: 'hosted-zones', text: 'Hosted Zones', href: '/hosted-zones', iconName: 'treeview-expand' },
  { id: 'traffic-policies', text: 'Traffic Policies', href: '/traffic-policies', iconName: 'share' },
  { id: 'health-checks', text: 'Health Checks', href: '/health-checks', iconName: 'status-positive' },
  { id: 'resolver', text: 'Resolver', href: '/resolver', iconName: 'multiscreen' },
  { id: 'profiles', text: 'Profiles', href: '/profiles', iconName: 'user-profile' },
];
