# RDK Lab

> Personal Research Laboratory — 毕业设计研究记录系统

基于 RDK 嵌入式 AI 智算平台的图像检测应用毕业设计研究记录网站。不是一个博客，而是一个结构化的个人研究实验室，用于记录研究过程、管理动态计划、追踪实验与论文进度。

## Project Background

- **题目（中文）**：基于RDK嵌入式AI智算平台的图像检测应用
- **题目（英文）**：Image Detection Applications Based on the RDK Embedded AI Computing Platform
- **研究周期**：2026.09 — 2027.05
- **当前阶段**：Platform Pre-research（平台预研）

## Technology Stack

- **框架**：Next.js 14（App Router，静态导出）
- **语言**：TypeScript（strict mode）
- **样式**：Tailwind CSS（CSS 变量主题切换）
- **图标**：Lucide React
- **图表**：Recharts
- **Markdown**：remark + rehype 管道
- **部署**：GitHub Pages（静态导出 + basePath）

## Repository Structure

```
RDK/
├── data/                    # 研究数据（与 UI 分离）
│   ├── config/              # 导航配置
│   ├── roadmap/             # 阶段与里程碑
│   ├── research/            # 研究日志、论文、知识笔记
│   ├── engineering/         # 实验、问题、决策
│   └── thesis/              # 论文章节、素材
├── src/
│   ├── app/                 # 页面层（App Router）
│   ├── components/          # UI 组件层
│   ├── lib/                 # 数据访问层（loaders/search/utils）
│   ├── types/               # TypeScript 类型定义
│   └── styles/              # 设计 token 与全局样式
├── .github/workflows/       # GitHub Pages 部署
├── next.config.ts           # 静态导出配置
└── package.json
```

## How to Run Locally

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

## How to Build

```bash
# 类型检查
npm run type-check

# Lint
npm run lint

# 生产构建（生成 out/ 目录）
npm run build
```

## How to Deploy

### GitHub Pages（自动）

1. 将代码推送至 GitHub 仓库的 `main` 分支
2. GitHub Actions 自动触发构建与部署
3. 访问 `https://<username>.github.io/<repo-name>/`

basePath 从仓库名自动推断，无需手动配置。

### 手动部署

```bash
# 根域部署
npm run build

# 子路径部署
BASE_PATH=/your-repo-name npm run build
# 然后将 out/ 目录内容部署至对应路径
```

## Data Structure

所有研究内容存放于 `/data` 目录下的 JSON 文件，与 UI 组件物理分离。修改 JSON 并重新构建即可更新网站内容。

| 数据文件 | 内容 | 对应页面 |
|---------|------|---------|
| `data/config/navigation.json` | 侧边栏导航配置 | 全局 |
| `data/roadmap/stages.json` | 研究阶段与任务 | Roadmap |
| `data/roadmap/milestones.json` | 里程碑时间线 | Dashboard |
| `data/research/research-logs.json` | 研究日志 | Research Log |
| `data/research/papers.json` | 论文库 | Papers |
| `data/research/knowledge-notes.json` | 知识笔记 | Knowledge |
| `data/engineering/experiments.json` | 实验记录 | Experiments |
| `data/engineering/issues.json` | 问题追踪 | Issues |
| `data/engineering/decisions.json` | 决策日志 | Decisions |
| `data/thesis/thesis-chapters.json` | 论文章节进度 | Thesis Progress |
| `data/thesis/materials.json` | 素材管理 | Materials |

## How to Add a New Daily Research Log

1. 复制 `/research-logs/new` 页面中的模板
2. 填写各章节内容
3. 在 `data/research/research-Dlogs.json` 的 `logs` 数组中新增对象：
```json
{
  "id": "log-004",
  "date": "2026-09-28",
  "title": "日志标题",
  "summary": "一句话摘要",
  "tags": ["tag1", "tag2"],
  "stage": "stage-01",
  "relatedExperiments": [],
: [],
  "relatedIssues": [],
  "content": "Markdown 正文",
  "isExample": false
}
```
4. 运行 `npm run build` 重新构建

## How to Add a New Experiment

在 `data/engineering/experiments.json` 的 `experiments` 数组中新增对象。**注意：未测量的 metrics 字段必须为 `null`，禁止编造任何数值。**

```json
{
  "id": "exp-003",
  "title": "实验标题",
  "date": "2026-10-01",
  "status": "planned",
  "objective": "实验目标",
  "metrics": {
    "fps": null,
    "latency": null,
    "map": null,
    "precision": null,
    "recall": null,
    "cpuUsage": null,
    "memory": null,
    "bpuUsage": null,
    "modelSize": null
  },
  "results": "",
  "conclusion": "",
  "relatedIssues": [],
  "relatedDecisions": [],
  "isExample": false
}
```

## How to Update the Roadmap

在 `data/roadmap/stages.json` 中修改阶段状态、进度、任务。**注意：`planAdjustment.plannedDate` 保留原始计划日期，不静默覆盖历史；实际日期记录在 `actualDate`，调整原因记录在 `reason`。**

## Research Methodology

本系统遵循以下原则：

1. **数据完整性**：未测量的实验指标显示为“未测量”占位符，绝不编造 FPS、精度、性能等数值
2. **应用方向候选性**：应用方向以候选列表呈现，不写死任一场景为最终确定
3. **计划历史保留**：Plan / Actual / Adjustment 三元组，不静默覆盖历史计划
4. **数据与 UI 分离**：所有内容存放 JSON 文件，组件不硬编码业务内容
5. **示例数据可识别**：所有示例数据标记 `isExample: true`

## Screenshots

（待补充 — 部署后截取各页面截图）

## Notes

- 当前展示的数据均为示例数据（标记 `isExample: true`），请在实际使用中替换为真实研究记录
- 支持 Light/Dark 模式切换（右上角图标）
- 命令面板：按 `Cmd/Ctrl + K` 唤起