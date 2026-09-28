import { notFound } from 'next/navigation';
import { loadIssues, loadIssueById } from '@/lib/loaders/issues';
import { IssueDetail } from '@/components/engineering/IssueDetail';

export const metadata = { title: 'Issue Detail — RDK Lab' };

export function generateStaticParams() {
  const issues = loadIssues();
  return issues.map((i) => ({ id: i.id }));
}

export default function IssueDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const issue = loadIssueById(params.id);
  if (!issue) notFound();

  return <IssueDetail issue={issue} />;
}