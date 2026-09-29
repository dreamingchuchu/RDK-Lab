import type { SearchResult, SearchResultType } from '@/types';
import { loadResearchLogs } from '@/lib/loaders/research-logs';
import { loadPapers } from '@/lib/loaders/papers';
import { loadPaperAnalyses } from '@/lib/loaders/paper-analyses';
import { loadKnowledgeNotes } from '@/lib/loaders/knowledge';
import { loadExperiments } from '@/lib/loaders/experiments';
import { loadIssues } from '@/lib/loaders/issues';
import { loadDecisions } from '@/lib/loaders/decisions';
import type { PaperAnalysis } from '@/types/paper-analysis';

type SearchIndexEntry = {
  type: SearchResultType;
  id: string;
  title: string;
  searchableText: string;
  href: string;
};

let cachedIndex: SearchIndexEntry[] | null = null;

function getAnalysisTitle(analysis: PaperAnalysis): string {
  const paper = loadPapers().find((p) => p.id === analysis.paperId);
  return paper ? `深度分析：${paper.title}` : '论文深度分析';
}

function getAnalysisSearchableText(analysis: PaperAnalysis): string {
  const parts: string[] = [];
  const obj = analysis as Record<string, unknown>;
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === 'string') {
      parts.push(value);
    } else if (Array.isArray(value)) {
      parts.push(value.join(' '));
    } else if (value && typeof value === 'object') {
      const nested = value as Record<string, unknown>;
      for (const nestedKey of Object.keys(nested)) {
        const nestedValue = nested[nestedKey];
        if (typeof nestedValue === 'string') parts.push(nestedValue);
        else if (Array.isArray(nestedValue)) parts.push(nestedValue.join(' '));
      }
    }
  }
  return parts.join(' ').toLowerCase();
}

export function buildSearchIndex(): SearchIndexEntry[] {
  if (cachedIndex) return cachedIndex;

  const entries: SearchIndexEntry[] = [];

  for (const log of loadResearchLogs()) {
    entries.push({
      type: 'log',
      id: log.id,
      title: log.title,
      searchableText: [log.title, log.summary, log.tags.join(' '), log.content].join(' ').toLowerCase(),
      href: `/research-logs/${log.id}`,
    });
  }

  for (const paper of loadPapers()) {
    entries.push({
      type: 'paper',
      id: paper.id,
      title: paper.title,
      searchableText: [paper.title, paper.authors.join(' '), paper.topic, paper.model, paper.notes].join(' ').toLowerCase(),
      href: '/papers',
    });
  }

  for (const analysis of loadPaperAnalyses()) {
    entries.push({
      type: 'paper_analysis',
      id: analysis.id,
      title: getAnalysisTitle(analysis),
      searchableText: getAnalysisSearchableText(analysis),
      href: `/papers/${analysis.paperId}`,
    });
  }

  for (const note of loadKnowledgeNotes()) {
    entries.push({
      type: 'knowledge',
      id: note.id,
      title: note.title,
      searchableText: [note.title, note.what, note.why, note.how, note.myUnderstanding].join(' ').toLowerCase(),
      href: '/knowledge',
    });
  }

  for (const exp of loadExperiments()) {
    entries.push({
      type: 'experiment',
      id: exp.id,
      title: exp.title,
      searchableText: [exp.title, exp.objective, exp.results, exp.conclusion].join(' ').toLowerCase(),
      href: `/experiments/${exp.id}`,
    });
  }

  for (const issue of loadIssues()) {
    entries.push({
      type: 'issue',
      id: issue.id,
      title: issue.title,
      searchableText: [issue.title, issue.symptom, issue.rootCause, issue.solution].join(' ').toLowerCase(),
      href: `/issues/${issue.id}`,
    });
  }

  for (const dec of loadDecisions()) {
    entries.push({
      type: 'decision',
      id: dec.id,
      title: dec.title,
      searchableText: [dec.title, dec.context, dec.decision, dec.reasons].join(' ').toLowerCase(),
      href: `/decisions/${dec.id}`,
    });
  }

  cachedIndex = entries;
  return entries;
}

function generateSnippet(text: string, query: string, maxLength = 80): string {
  const lowerText = text.toLowerCase();
  const idx = lowerText.indexOf(query.toLowerCase());
  if (idx === -1) return text.slice(0, maxLength);
  const start = Math.max(0, idx - 20);
  const end = Math.min(text.length, idx + query.length + 20);
  return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
}

export function searchAll(query: string): SearchResult[] {
  if (!query || query.trim() === '') return [];
  const index = buildSearchIndex();
  const q = query.toLowerCase().trim();

  const results: SearchResult[] = [];
  for (const entry of index) {
    if (entry.title.toLowerCase().includes(q) || entry.searchableText.includes(q)) {
      results.push({
        type: entry.type,
        id: entry.id,
        title: entry.title,
        snippet: generateSnippet(entry.searchableText, q),
        href: entry.href,
      });
    }
  }

  return results;
}

export function groupResults(results: SearchResult[]): Record<SearchResultType, SearchResult[]> {
  const groups: Record<SearchResultType, SearchResult[]> = {
    log: [],
    paper: [],
    paper_analysis: [],
    knowledge: [],
    experiment: [],
    issue: [],
    decision: [],
  };
  for (const r of results) {
    groups[r.type].push(r);
  }
  return groups;
}