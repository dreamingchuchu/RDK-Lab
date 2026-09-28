export function ProjectHeader() {
  return (
    <header className="mb-10">
      <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary mb-2">
        Graduation Project Research Log
      </p>
      <h1 className="text-2xl font-semibold tracking-tight mb-1">RDK LAB</h1>
      <p className="text-base text-text-secondary mb-3">
        基于 RDK 嵌入式 AI 智算平台的图像检测应用
      </p>
      <p className="text-sm font-mono text-text-tertiary">
        Image Detection Applications Based on the RDK Embedded AI Computing Platform
      </p>
      <div className="flex items-center gap-4 mt-4 text-sm text-text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-status-active" />
          研究中
        </span>
        <span className="text-text-tertiary">|</span>
        <span className="font-mono">2026.09 — 2027.05</span>
      </div>
    </header>
  );
}