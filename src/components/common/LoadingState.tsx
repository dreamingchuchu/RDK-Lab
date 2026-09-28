export function LoadingState({ message = '加载中…' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <span className="inline-block w-4 h-4 border-2 border-border border-t-accent rounded-full animate-spin" />
        {message}
      </div>
    </div>
  );
}