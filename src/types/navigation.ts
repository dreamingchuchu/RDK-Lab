export type NavigationGroupId = 'overview' | 'research' | 'engineering' | 'thesis' | 'system';

export type NavigationItem = {
  label: string;
  href: string;
  icon?: string;                     // Lucide icon name
};

export type NavigationGroup = {
  id: NavigationGroupId;
  label: string;
  items: NavigationItem[];
};

export type NavigationConfig = {
  brand: {
    name: string;
    subtitle: string;
  };
  groups: NavigationGroup[];
};