// 论文深度分析记录 — 对单篇论文按固定 21 章节模板的深度阅读笔记
// 对应 spec.md 5.16 节业务规则与 6.11 节数据约束
// 21 章节固定模板（编号 0–21），章节顺序与名称固定，禁止增删

// 第 21 章 阅读完成度 — 12 项固定检查表
export type ChecklistItem = {
  item: string;
  completed: boolean;
};

export type ReadingFinalStatus =
  | 'not_started'
  | 'skimming'
  | 'reading'
  | 'deep_reading'
  | 'completed'
  | 'reviewed';

// PaperAnalysis 21 章节结构
export type PaperAnalysis = {
  // === 标识与关联 ===
  id: string;
  paperId: string;
  isExample?: boolean;
  createdAt: string;
  updatedAt?: string;

  // === 第 0 章 论文基本信息（题录复用关联 Paper，此处仅记录阅读信息） ===
  readingInfo: {
    readDate: string;
    readDuration?: string;
    motivation?: string;
    context?: string;
  };

  // === 第 1 章 一句话读懂论文 ===
  oneLiner?: {
    summary?: string;
    thirtySecondPitch?: string;
    myUnderstanding?: string;
  };

  // === 第 2 章 研究背景与研究问题 ===
  background?: {
    whyStudy?: string;
    existingMethods?: string;
    existingProblems?: string;
    realProblem?: string;
    whyWorth?: string;
  };

  // === 第 3 章 论文整体思路 ===
  overallApproach?: {
    logic?: string;
    coreHypothesis?: string;
    causalChain?: string;
    story?: string;
    myJudgment?: string;
  };

  // === 第 4 章 技术路线 ===
  technicalRoute?: {
    overallFlow?: string;
    input?: string;
    middleProcess?: string;
    output?: string;
  };

  // === 第 5 章 核心技术知识 ===
  coreKnowledge?: {
    knowledgeList?: string[];
    mustUnderstand?: string[];
    justKnow?: string[];
    toDeepen?: string[];
    relations?: string;
  };

  // === 第 6 章 方法设计与创新点 ===
  methodInnovation?: {
    improvements?: string[];
    improvementLogic?: string;
    eachImprovementSolves?: string;
    isGenuineImprovement?: string;
  };

  // === 第 7 章 模型/算法结构拆解 ===
  modelStructure?: {
    originalModel?: string;
    improvedModel?: string;
    comparison?: string;
    coreChanges?: string;
  };

  // === 第 8 章 数据集分析 ===
  datasetAnalysis?: {
    basics?: string;
    characteristics?: string;
    impactOnModel?: string;
    suitability?: string;
  };

  // === 第 9 章 实验设计 ===
  experimentDesign?: {
    purpose?: string;
    baselines?: string;
    variables?: string;
    metrics?: string;
  };

  // === 第 10 章 实验结果分析 ===
  resultAnalysis?: {
    keyResult?: string;
    improvement?: string;
    whyImproved?: string;
    metricConflict?: string;
    conclusionSupported?: string;
  };

  // === 第 11 章 消融实验 ===
  ablation?: {
    structure?: string;
    moduleContribution?: string;
    learnings?: string;
  };

  // === 第 12 章 工程实现 ===
  engineering?: {
    hardware?: string;
    softwareEnv?: string;
    deployment?: string;
    keyParams?: string;
    reproduction?: string;
  };

  // === 第 13 章 论文写作方法 ===
  writingMethod?: {
    abstract?: string;
    introduction?: string;
    relatedWork?: string;
    methodSection?: string;
    experimentSection?: string;
    expressionStyle?: string;
  };

  // === 第 14 章 论文创新性分析 ===
  innovationAnalysis?: {
    claimed?: string;
    actual?: string;
    type?: string;
    degree?: string;
  };

  // === 第 15 章 论文不足与局限 ===
  limitations?: {
    authorAdmitted?: string;
    myFindings?: string;
    experimentFlaws?: string;
    improvementDirection?: string;
  };

  // === 第 16 章 对我的项目有什么用 ===
  projectImplications?: {
    borrowableTech?: string;
    experimentDesign?: string;
    paperStructure?: string;
    transferableToRDK?: string;
    researchQuestions?: string;
  };

  // === 第 17 章 我的知识缺口 ===
  knowledgeGaps?: {
    fundamentals?: string;
    deepLearning?: string;
    cv?: string;
    embedded?: string;
    math?: string;
    researchMethod?: string;
  };

  // === 第 18 章 本篇论文的知识树 ===
  knowledgeTree?: string;

  // === 第 19 章 可以"偷走"的东西 ===
  takeaways?: {
    researchIdea?: string;
    technicalRoute?: string;
    experimentDesign?: string;
    paperStructure?: string;
    expressionStyle?: string;
    applyToMyProject?: string;
  };

  // === 第 20 章 最终总结 ===
  finalSummary?: {
    threeSentences?: string;
    trulyLearned?: string;
    notUnderstood?: string;
    nextSteps?: string;
  };

  // === 第 21 章 阅读完成度 ===
  completion: {
    checklist: ChecklistItem[];
    finalStatus?: ReadingFinalStatus;
  };
};

// 12 项固定检查表默认模板（spec.md 6.11 第 97 条）
export const DEFAULT_CHECKLIST_ITEMS: string[] = [
  '能用一句话概括',
  '理解研究问题',
  '理清整体思路与因果链',
  '掌握技术路线输入输出',
  '识别核心技术与知识缺口',
  '区分真正创新与增量改进',
  '理解模型核心改动',
  '分析实验设计合理性',
  '解读实验与消融结果',
  '评估不足与局限',
  '提炼可借鉴内容',
  '明确下一步学习计划',
];

// 21 章节元数据（编号、标题、阅读原则映射）— 用于目录导航与渲染
export type ChapterMeta = {
  order: number;
  title: string;
  key: string;
};

export const PAPER_ANALYSIS_CHAPTERS: ChapterMeta[] = [
  { order: 0, title: '论文基本信息', key: 'readingInfo' },
  { order: 1, title: '一句话读懂论文', key: 'oneLiner' },
  { order: 2, title: '研究背景与研究问题', key: 'background' },
  { order: 3, title: '论文整体思路', key: 'overallApproach' },
  { order: 4, title: '技术路线', key: 'technicalRoute' },
  { order: 5, title: '核心技术知识', key: 'coreKnowledge' },
  { order: 6, title: '方法设计与创新点', key: 'methodInnovation' },
  { order: 7, title: '模型/算法结构拆解', key: 'modelStructure' },
  { order: 8, title: '数据集分析', key: 'datasetAnalysis' },
  { order: 9, title: '实验设计', key: 'experimentDesign' },
  { order: 10, title: '实验结果分析', key: 'resultAnalysis' },
  { order: 11, title: '消融实验', key: 'ablation' },
  { order: 12, title: '工程实现', key: 'engineering' },
  { order: 13, title: '论文写作方法', key: 'writingMethod' },
  { order: 14, title: '论文创新性分析', key: 'innovationAnalysis' },
  { order: 15, title: '论文不足与局限', key: 'limitations' },
  { order: 16, title: '对我的项目有什么用', key: 'projectImplications' },
  { order: 17, title: '我的知识缺口', key: 'knowledgeGaps' },
  { order: 18, title: '本篇论文的知识树', key: 'knowledgeTree' },
  { order: 19, title: '可以"偷走"的东西', key: 'takeaways' },
  { order: 20, title: '最终总结', key: 'finalSummary' },
  { order: 21, title: '阅读完成度', key: 'completion' },
];

// 固定阅读原则（spec.md 5.16.1 第 12 条）
export const READING_PRINCIPLE =
  '为什么做 → 做了什么 → 为什么这么做 → 怎么证明有效 → 是否真的有效 → 怎么实现 → 我能学什么 → 我以后能不能用';