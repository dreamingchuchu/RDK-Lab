import { Suspense } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { SearchContent } from '@/components/common/SearchContent';

export const metadata = { title: 'Search — RDK Lab' };

export default function SearchPage() {
  return (
    <div className="max-w-content">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <SearchIcon className="w-3.5 h-3.5" />
          SYSTEM
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Search</h1>
      </header>

      <Suspense fallback={<p className="text-sm text-text-tertiary">加载中…</p>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}