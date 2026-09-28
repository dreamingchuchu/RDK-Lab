import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { loadNavigation } from '@/lib/loaders/navigation';

export const metadata: Metadata = {
  title: 'RDK Lab — Graduation Project Research Log',
  description:
    '基于 RDK 嵌入式 AI 智算平台的图像检测应用毕业设计研究记录系统',
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = loadNavigation();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased">
        <Sidebar config={navigation} />
        <div className="md:pl-64">
          <div className="flex items-center justify-end h-14 px-4 border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10 md:hidden">
            <ThemeToggle />
          </div>
          <header className="hidden md:flex items-center justify-end h-12 px-6 border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
            <ThemeToggle />
          </header>
          <main className="px-4 md:px-8 py-6 md:py-8 max-w-content mx-auto pt-20 md:pt-8">
            {children}
          </main>
        </div>
        <CommandPalette />
      </body>
    </html>
  );
}