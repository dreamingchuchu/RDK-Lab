'use client';

import { useSearchParams } from 'next/navigation';
import { searchAll } from '@/lib/search';
import { SearchResults } from '@/components/common/SearchResults';

export function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const results = query ? searchAll(query) : [];

  return (
    <>
      {query ? (
        <p className="text-sm text-text-secondary mt-2 mb-6">
          关键词 “<span className="font-mono text-text">{query}</span>” — 共 {results.length} 条结果
        </p>
      ) : (
        <p className="text-sm text-text-tertiary mt-2">输入关键词进行全局搜索。可通过命令面板（Cmd/Ctrl+K）或 URL 参数 ?q= 触发。</p>
      )}

      {query && <SearchResults results={results} />}
    </>
  );
}