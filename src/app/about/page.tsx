import { Info } from 'lucide-react';

export const metadata = { title: 'About — RDK Lab' };

export default function AboutPage() {
  return (
    <div className="max-w-content">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <Info className="w-3.5 h-3.5" />
          SYSTEM
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">About</h1>
      </header>

      <section className="mb-8">
        <h2 className="section-title">项目简介</h2>
        <p className="text-base leading-relaxed text-text-secondary mb-3">
          RDK Lab 是一个个人毕业设计研究记录系统，用于记录基于 RDK 嵌入式 AI 智算平台的图像检测应用研究全过程。
        </p>
        <p className="text-base leading-relaxed text-text-secondary">
          系统设计理念为 <em>Personal Research Laboratory</em>，强调研究可用性与信息架构优先于视觉效果，支持动态调整研究方向与计划。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="section-title">毕业设计信息</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex gap-4">
            <dt className="w-32 text-text-tertiary shrink-0">题目（中文）</dt>
            <dd className="text-text">基于RDK嵌入式AI智算平台的图像检测应用</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-32 text-text-tertiary shrink-0">题目（英文）</dt>
            <dd className="text-text">Image Detection Applications Based on the RDK Embedded AI Computing Platform</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-32 text-text-tertiary shrink-0">研究周期</dt>
            <dd className="text-text">2026.09 — 2027.05</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-32 text-text-tertiary shrink-0">当前阶段</dt>
            <dd className="text-text">Platform Pre-research（平台预研）</dd>
          </div>
        </dl>
      </section>

      <section className="mb-8">
        <h2 className="section-title">技术栈</h2>
        <ul className="grid grid-cols-2 gap-2 text-sm text-text-secondary">
          <li>• Next.js 14（App Router，静态导出）</li>
          <li>• TypeScript（strict mode）</li>
          <li>• Tailwind CSS（CSS 变量主题）</li>
          <li>• Lucide React（图标）</li>
          <li>• Recharts（实验图表）</li>
          <li>• remark + rehype（Markdown 渲染）</li>
          <li>• Shiki（代码高亮）</li>
          <li>• GitHub Pages（部署）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="section-title">使用说明</h2>
        <div className="space-y-3 text-sm text-text-secondary">
          <p>
            <strong className="text-text">数据更新：</strong>
            所有研究内容存放于 <code className="font-mono text-xs px-1 py-0.5 bg-surface-hover rounded">/data</code> 目录下的 JSON 文件，修改文件并重新构建即可更新网站内容，无需改动组件代码。
          </p>
          <p>
            <strong className="text-text">命令面板：</strong>
            按 <kbd className="font-mono text-xs px-1.5 py-0.5 border border-border rounded">Cmd/Ctrl + K</kbd> 唤起命令面板，可快速导航或搜索。
          </p>
          <p>
            <strong className="text-text">主题切换：</strong>
            点击右上角图标切换 Light/Dark 模式，偏好自动持久化。
          </p>
          <p>
            <strong className="text-text">示例数据：</strong>
            当前展示的数据均为示例数据（标记 isExample），请在实际使用中替换为真实研究记录。
          </p>
        </div>
      </section>

      <section>
        <h2 className="section-title">数据完整性声明</h2>
        <p className="text-sm text-text-secondary">
          本系统严格遵守数据完整性原则：未测量的实验指标显示为“未测量”占位符，绝不编造任何数值结果。应用方向以候选列表呈现，不预设任一场景为最终确定。
        </p>
      </section>
    </div>
  );
}