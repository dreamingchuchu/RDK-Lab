import {
  LayoutDashboard,
  Map,
  NotebookPen,
  FileText,
  BookOpen,
  FlaskConical,
  CircleAlert,
  GitBranch,
  GraduationCap,
  FolderArchive,
  Search,
  Info,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Map,
  NotebookPen,
  FileText,
  BookOpen,
  FlaskConical,
  CircleAlert,
  GitBranch,
  GraduationCap,
  FolderArchive,
  Search,
  Info,
};

type IconProps = {
  name?: string;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  const Component = name ? iconMap[name] : undefined;
  if (!Component) return null;
  return <Component className={className} aria-hidden="true" />;
}