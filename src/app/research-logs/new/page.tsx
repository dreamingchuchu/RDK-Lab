import { NotebookPen } from 'lucide-react';
import { CopyButton } from '@/components/common/CopyButton';

export const metadata = { title: 'New Research Log — RDK Lab' };

const template = `# YYYY-MM-DD

## Today's Goal

## Planned Tasks

- [ ] 

## What I Learned

### Concept

**What is it?**

**Why does it matter?**

**How does it work?**

**How is it related to my thesis?**

**My own understanding:**

## Practical Work

**Environment:**
- Hardware:
- OS:
- Python:
- SDK:
- Model:
- Dataset:

**Commands:**
\`\`\`bash

\`\`\`

**Results:**

## Problems

**Symptom:**

**Error:**

**Attempts:**

**Root Cause:**

**Solution:**

## What I Actually Understood

## Unresolved Questions

## Impact on Thesis

- Technology route:
- Application:
- Dataset:
- Model:
- Experiment:
- System:

## Conclusion

## Next Step
`;

export default function NewLogPage() {
  return (
    <div className="max-w-content">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <NotebookPen className="w-3.5 h-3.5" />
          RESEARCH
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">New Research Log</h1>
        <p className="text-sm text-text-secondary mt-1">
          复制下方 Markdown 模板，填写后在 <code className="font-mono text-xs">data/research/research-logs.json</code> 中新增条目。
        </p>
      </header>

      <div className="surface p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary">Template</p>
          <CopyButton text={template} />
        </div>
        <pre className="text-xs font-mono text-text-secondary overflow-x-auto leading-relaxed whitespace-pre-wrap">{template}</pre>
      </div>

      <div className="text-xs text-text-tertiary space-y-1">
        <p>使用步骤：</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>复制上方模板</li>
          <li>填写各章节内容</li>
          <li>在 <code className="font-mono">data/research/research-logs.json</code> 的 logs 数组中新增对象</li>
          <li>运行 <code className="font-mono">npm run build</code> 重新构建</li>
        </ol>
      </div>
    </div>
  );
}