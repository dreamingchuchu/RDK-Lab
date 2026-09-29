import type { PaperAnalysis, ChecklistItem } from '@/types/paper-analysis';
import { PAPER_ANALYSIS_CHAPTERS, READING_PRINCIPLE, DEFAULT_CHECKLIST_ITEMS } from '@/types/paper-analysis';
import type { Paper } from '@/types/paper';
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer';
import { Placeholder } from '@/components/common/Placeholder';
import { ExampleBadge } from '@/components/common/ExampleBadge';
import { PaperAnalysisTOC } from './PaperAnalysisTOC';

type PaperAnalysisDetailProps = {
  analysis: PaperAnalysis;
  paper: Paper | null;
};

// 章节字段配置：每个章节包含哪些字段（key → label）
type FieldDef = { label: string; type: 'text' | 'list' };
type ChapterFields = Record<string, FieldDef>;

const CHAPTER_FIELD_MAP: Record<number, ChapterFields> = {
  0: {
    readDate: { label: '阅读日期', type: 'text' },
    readDuration: { label: '阅读时长', type: 'text' },
    motivation: { label: '阅读动机', type: 'text' },
    context: { label: '阅读场合', type: 'text' },
  },
  1: {
    summary: { label: '一句话概括', type: 'text' },
    thirtySecondPitch: { label: '30 秒讲解', type: 'text' },
    myUnderstanding: { label: '我的理解', type: 'text' },
  },
  2: {
    whyStudy: { label: '为什么研究', type: 'text' },
    existingMethods: { label: '现有方法', type: 'text' },
    existingProblems: { label: '现有问题', type: 'text' },
    realProblem: { label: '真正要解决的问题', type: 'text' },
    whyWorth: { label: '为什么值得解决', type: 'text' },
  },
  3: {
    logic: { label: '整体逻辑', type: 'text' },
    coreHypothesis: { label: '核心假设', type: 'text' },
    causalChain: { label: '因果链', type: 'text' },
    story: { label: '故事', type: 'text' },
    myJudgment: { label: '我的判断', type: 'text' },
  },
  4: {
    overallFlow: { label: '总体流程', type: 'text' },
    input: { label: '输入', type: 'text' },
    middleProcess: { label: '中间处理', type: 'text' },
    output: { label: '输出', type: 'text' },
  },
  5: {
    knowledgeList: { label: '知识清单', type: 'list' },
    mustUnderstand: { label: '必须理解', type: 'list' },
    justKnow: { label: '只需知道', type: 'list' },
    toDeepen: { label: '待深入', type: 'list' },
    relations: { label: '知识关系', type: 'text' },
  },
  6: {
    improvements: { label: '改进列表', type: 'list' },
    improvementLogic: { label: '改进逻辑总表', type: 'text' },
    eachImprovementSolves: { label: '每个改进解决什么', type: 'text' },
    isGenuineImprovement: { label: '是否为了改而改', type: 'text' },
  },
  7: {
    originalModel: { label: '原始模型', type: 'text' },
    improvedModel: { label: '改进模型', type: 'text' },
    comparison: { label: '对比', type: 'text' },
    coreChanges: { label: '核心改动', type: 'text' },
  },
  8: {
    basics: { label: '基本情况', type: 'text' },
    characteristics: { label: '特点', type: 'text' },
    impactOnModel: { label: '影响模型设计', type: 'text' },
    suitability: { label: '是否适合', type: 'text' },
  },
  9: {
    purpose: { label: '目的', type: 'text' },
    baselines: { label: '对比对象', type: 'text' },
    variables: { label: '变量', type: 'text' },
    metrics: { label: '指标', type: 'text' },
  },
  10: {
    keyResult: { label: '最重要结果', type: 'text' },
    improvement: { label: '提升多少', type: 'text' },
    whyImproved: { label: '为什么提升', type: 'text' },
    metricConflict: { label: '指标冲突', type: 'text' },
    conclusionSupported: { label: '结论是否被支持', type: 'text' },
  },
  11: {
    structure: { label: '结构', type: 'text' },
    moduleContribution: { label: '每个模块贡献', type: 'text' },
    learnings: { label: '学到什么', type: 'text' },
  },
  12: {
    hardware: { label: '硬件', type: 'text' },
    softwareEnv: { label: '软件环境', type: 'text' },
    deployment: { label: '部署流程', type: 'text' },
    keyParams: { label: '关键参数', type: 'text' },
    reproduction: { label: '复现信息', type: 'text' },
  },
  13: {
    abstract: { label: '摘要写法', type: 'text' },
    introduction: { label: '引言写法', type: 'text' },
    relatedWork: { label: '相关工作写法', type: 'text' },
    methodSection: { label: '方法章节写法', type: 'text' },
    experimentSection: { label: '实验章节写法', type: 'text' },
    expressionStyle: { label: '表达方式', type: 'text' },
  },
  14: {
    claimed: { label: '声称的创新点', type: 'text' },
    actual: { label: '实际创新', type: 'text' },
    type: { label: '创新类型', type: 'text' },
    degree: { label: '创新程度', type: 'text' },
  },
  15: {
    authorAdmitted: { label: '作者承认的不足', type: 'text' },
    myFindings: { label: '我发现的不足', type: 'text' },
    experimentFlaws: { label: '实验不足', type: 'text' },
    improvementDirection: { label: '改进方向', type: 'text' },
  },
  16: {
    borrowableTech: { label: '可借鉴技术', type: 'text' },
    experimentDesign: { label: '可借鉴实验设计', type: 'text' },
    paperStructure: { label: '可借鉴论文结构', type: 'text' },
    transferableToRDK: { label: '可迁移至 RDK 的内容', type: 'text' },
    researchQuestions: { label: '启发的研究问题', type: 'text' },
  },
  17: {
    fundamentals: { label: '基础缺口', type: 'text' },
    deepLearning: { label: '深度学习缺口', type: 'text' },
    cv: { label: '计算机视觉缺口', type: 'text' },
    embedded: { label: '嵌入式缺口', type: 'text' },
    math: { label: '数学缺口', type: 'text' },
    researchMethod: { label: '科研方法缺口', type: 'text' },
  },
  19: {
    researchIdea: { label: '研究思路', type: 'text' },
    technicalRoute: { label: '技术路线', type: 'text' },
    experimentDesign: { label: '实验设计', type: 'text' },
    paperStructure: { label: '论文结构', type: 'text' },
    expressionStyle: { label: '表达方式', type: 'text' },
    applyToMyProject: { label: '应用到我的项目', type: 'text' },
  },
  20: {
    threeSentences: { label: '三句话总结', type: 'text' },
    trulyLearned: { label: '真正学会什么', type: 'text' },
    notUnderstood: { label: '没搞懂的内容', type: 'text' },
    nextSteps: { label: '下一步学习', type: 'text' },
  },
};

// 检查章节是否有内容
function chapterHasContent(analysis: PaperAnalysis, order: number): boolean {
  if (order === 0) return !!analysis.readingInfo;
  if (order === 18) return !!analysis.knowledgeTree;
  if (order === 21) return !!analysis.completion;

  const chapterKey = PAPER_ANALYSIS_CHAPTERS.find((c) => c.order === order)?.key;
  if (!chapterKey) return false;

  const chapterData = (analysis as Record<string, unknown>)[chapterKey];
  if (!chapterData || typeof chapterData !== 'object') return false;

  const fields = CHAPTER_FIELD_MAP[order];
  if (!fields) return false;

  for (const fieldKey of Object.keys(fields)) {
    const value = (chapterData as Record<string, unknown>)[fieldKey];
    if (value !== undefined && value !== null) {
      if (typeof value === 'string' && value.trim() !== '') return true;
      if (Array.isArray(value) && value.length > 0) return true;
    }
  }
  return false;
}

// 渲染单个字段
function renderField(label: string, value: unknown, type: 'text' | 'list'): React.ReactNode {
  if (type === 'list') {
    const items = value as string[] | undefined;
    if (!items || items.length === 0) {
      return (
        <div key={label}>
          <p className="text-xs font-medium text-text-secondary mb-1">{label}</p>
          <Placeholder kind="pending" label="待补充" />
        </div>
      );
    }
    return (
      <div key={label}>
        <p className="text-xs font-medium text-text-secondary mb-1">{label}</p>
        <ul className="space-y-1 mb-3">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-text leading-relaxed flex gap-2">
              <span className="text-text-tertiary">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const text = value as string | undefined;
  if (!text || text.trim() === '') {
    return (
      <div key={label}>
        <p className="text-xs font-medium text-text-secondary mb-1">{label}</p>
        <Placeholder kind="pending" label="待补充" />
      </div>
    );
  }
  return (
    <div key={label}>
      <p className="text-xs font-medium text-text-secondary mb-1">{label}</p>
      <MarkdownRenderer content={text} className="text-sm leading-relaxed" />
    </div>
  );
}

// 渲染普通章节（1-20，排除 18 和 21）
function renderStandardChapter(analysis: PaperAnalysis, order: number): React.ReactNode {
  const chapterKey = PAPER_ANALYSIS_CHAPTERS.find((c) => c.order === order)?.key;
  if (!chapterKey) return null;

  const chapterData = (analysis as Record<string, unknown>)[chapterKey];
  const fields = CHAPTER_FIELD_MAP[order];
  if (!fields) return null;

  if (!chapterData || typeof chapterData !== 'object') {
    return (
      <div className="space-y-3">
        {Object.keys(fields).map((fieldKey) => {
          const fieldDef = fields[fieldKey];
          if (!fieldDef) return null;
          return renderField(fieldDef.label, undefined, fieldDef.type);
        })}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {Object.keys(fields).map((fieldKey) => {
        const fieldDef = fields[fieldKey];
        if (!fieldDef) return null;
        const value = (chapterData as Record<string, unknown>)[fieldKey];
        return renderField(fieldDef.label, value, fieldDef.type);
      })}
    </div>
  );
}

// 渲染第 0 章：论文基本信息（题录复用 + 阅读信息）
function renderChapter0(analysis: PaperAnalysis, paper: Paper | null): React.ReactNode {
  const info = analysis.readingInfo;
  return (
    <div className="space-y-4">
      {paper ? (
        <div className="surface p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">题录信息（复用自 Paper）</p>
          <h3 className="text-base font-semibold text-text mb-1">{paper.title}</h3>
          <p className="text-sm text-text-secondary">{paper.authors.join(', ')} · {paper.year}</p>
          {paper.url && (
            <a href={paper.url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline mt-1 inline-block">
              原文链接 ↗
            </a>
          )}
        </div>
      ) : (
        <div className="surface p-4 border-l-2 border-amber-500">
          <p className="text-sm text-amber-600 dark:text-amber-400">⚠ 关联论文不存在（paperId: {analysis.paperId}）</p>
        </div>
      )}
      <div className="space-y-3">
        {renderField('阅读日期', info.readDate, 'text')}
        {renderField('阅读时长', info.readDuration, 'text')}
        {renderField('阅读动机', info.motivation, 'text')}
        {renderField('阅读场合', info.context, 'text')}
      </div>
    </div>
  );
}

// 渲染第 18 章：知识树（单一 Markdown 字段）
function renderChapter18(analysis: PaperAnalysis): React.ReactNode {
  const tree = analysis.knowledgeTree;
  if (!tree || tree.trim() === '') {
    return <Placeholder kind="pending" label="待补充" />;
  }
  return <MarkdownRenderer content={tree} className="text-sm leading-relaxed" />;
}

// 渲染第 21 章：阅读完成度
function renderChapter21(analysis: PaperAnalysis): React.ReactNode {
  const completion = analysis.completion;
  const checklist: ChecklistItem[] = completion?.checklist ?? [];
  const completedCount = checklist.filter((c) => c.completed).length;
  const totalCount = DEFAULT_CHECKLIST_ITEMS.length;

  return (
    <div className="space-y-4">
      {/* 完成度统计 */}
      <div className="surface p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary">阅读完成度</p>
          <p className="text-sm font-semibold text-text">
            {completedCount} / {totalCount}
          </p>
        </div>
        <div className="w-full h-1.5 bg-surface-hover rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
        {completedCount === totalCount ? (
          <p className="text-xs text-accent mt-2">✓ 阅读完成</p>
        ) : (
          <p className="text-xs text-text-tertiary mt-2">
            已完成 {completedCount} 项，剩余 {totalCount - completedCount} 项
          </p>
        )}
      </div>

      {/* 检查表 */}
      <div className="space-y-2">
        {DEFAULT_CHECKLIST_ITEMS.map((item, i) => {
          const checked = checklist[i]?.completed ?? false;
          return (
            <div key={i} className="flex items-center gap-2 py-1">
              <span
                className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${
                  checked
                    ? 'bg-accent border-accent text-white'
                    : 'border-border text-transparent'
                }`}
              >
                ✓
              </span>
              <span className={`text-sm ${checked ? 'text-text' : 'text-text-tertiary'}`}>{item}</span>
            </div>
          );
        })}
      </div>

      {/* 最终状态 */}
      {completion?.finalStatus && (
        <div>
          <p className="text-xs font-medium text-text-secondary mb-1">最终阅读状态</p>
          <p className="text-sm text-text">{completion.finalStatus}</p>
        </div>
      )}
    </div>
  );
}

export function PaperAnalysisDetail({ analysis, paper }: PaperAnalysisDetailProps) {
  const filledChapters = new Set<number>();
  for (const ch of PAPER_ANALYSIS_CHAPTERS) {
    if (chapterHasContent(analysis, ch.order)) {
      filledChapters.add(ch.order);
    }
  }

  return (
    <div className="max-w-content">
      {/* 头部 */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <span>RESEARCH</span>
          <span>/</span>
          <span>PAPER ANALYSIS</span>
          {analysis.isExample && <ExampleBadge />}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {paper ? paper.title : '关联论文不存在'}
        </h1>
        {paper && (
          <p className="text-sm text-text-secondary mt-1">
            {paper.authors.join(', ')} · {paper.year}
          </p>
        )}
      </header>

      {/* 阅读原则横幅 */}
      <div className="surface p-3 mb-8 border-l-2 border-accent">
        <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-1">阅读原则</p>
        <p className="text-sm text-text leading-relaxed">{READING_PRINCIPLE}</p>
      </div>

      {/* 主体：左侧目录 + 右侧章节 */}
      <div className="grid grid-cols-[180px_1fr] gap-8">
        <PaperAnalysisTOC filledChapters={filledChapters} />

        <div className="space-y-12 min-w-0">
          {PAPER_ANALYSIS_CHAPTERS.map((ch) => (
            <section key={ch.order} id={`chapter-${ch.order}`} className="scroll-mt-8">
              <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-border">
                <span className="text-xs font-mono text-text-tertiary">
                  {String(ch.order).padStart(2, '0')}
                </span>
                <h2 className="text-lg font-semibold tracking-tight">{ch.title}</h2>
              </div>
              {ch.order === 0 && renderChapter0(analysis, paper)}
              {ch.order === 18 && renderChapter18(analysis)}
              {ch.order === 21 && renderChapter21(analysis)}
              {ch.order !== 0 && ch.order !== 18 && ch.order !== 21 && renderStandardChapter(analysis, ch.order)}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}