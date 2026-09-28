import type { NavigationConfig } from '@/types/navigation';
import navigationData from '../../../data/config/navigation.json';

const defaultConfig: NavigationConfig = {
  brand: { name: 'RDK LAB', subtitle: 'Graduation Project Research Log' },
  groups: [],
};

export function loadNavigation(): NavigationConfig {
  try {
    return navigationData as NavigationConfig;
  } catch {
    return defaultConfig;
  }
}