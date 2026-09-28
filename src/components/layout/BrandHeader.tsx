type BrandHeaderProps = {
  name: string;
  subtitle: string;
  collapsed: boolean;
};

export function BrandHeader({ name, subtitle, collapsed }: BrandHeaderProps) {
  if (collapsed) {
    return (
      <div className="flex items-center justify-center h-14 border-b border-border">
        <span className="font-mono text-sm font-semibold text-text">{name.slice(0, 3)}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center h-14 px-4 border-b border-border">
      <span className="font-mono text-sm font-semibold tracking-tight text-text">{name}</span>
      <span className="text-xs text-text-tertiary truncate">{subtitle}</span>
    </div>
  );
}