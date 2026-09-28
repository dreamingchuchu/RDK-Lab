'use client';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { useMemo } from 'react';
import { Placeholder } from './Placeholder';

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code ?? []), ['className']],
    pre: [...(defaultSchema.attributes?.pre ?? []), ['className']],
    span: [...(defaultSchema.attributes?.span ?? []), ['className']],
    div: [...(defaultSchema.attributes?.div ?? []), ['className']],
  },
};

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const html = useMemo(() => {
    if (!content || content.trim() === '') return '';
    try {
      const file = unified()
        .use(remarkParse as never)
        .use(remarkGfm as never)
        .use(remarkRehype as never, { allowDangerousHtml: true })
        .use(rehypeRaw as never)
        .use(rehypeSanitize as never, schema)
        .use(rehypeStringify as never)
        .processSync(content);
      return String(file);
    } catch {
      return content;
    }
  }, [content]);

  if (!html) {
    return <Placeholder kind="pending" label="正文待补充" />;
  }

  return (
    <div
      className={`prose ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}