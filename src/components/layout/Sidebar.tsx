'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import type { NavigationConfig } from '@/types/navigation';
import { BrandHeader } from './BrandHeader';
import { Icon } from '@/components/common/Icon';

type SidebarProps = {
  config: NavigationConfig;
};

export function Sidebar({ config }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sidebar-collapsed');
      if (stored === 'true') setCollapsed(true);
    } catch {
      // localStorage 不可用时忽略
    }
  }, []);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem('sidebar-collapsed', String(next));
    } catch {
      // 忽略
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* 移动端遮罩 */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 移动端顶部栏 */}
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between h-14 px-4 border-b border-border bg-surface md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="打开导航菜单"
          className="inline-flex items-center justify-center w-8 h-8 rounded text-text-secondary hover:text-text"
        >
          <PanelLeftOpen className="w-4 h-4" />
        </button>
        <span className="font-mono text-sm font-semibold text-text">{config.brand.name}</span>
        <div className="w-8" />
      </div>

      {/* 侧边栏 */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full border-r border-border bg-surface
          transition-transform duration-200
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:z-10
          ${collapsed ? 'md:w-14' : 'md:w-64'}
        `}
        style={{ width: collapsed ? undefined : undefined }}
      >
        <div className="flex flex-col h-full">
          <BrandHeader name={config.brand.name} subtitle={config.brand.subtitle} collapsed={collapsed} />

          <nav className="flex-1 overflow-y-auto py-4" aria-label="主导航">
            {config.groups.map((group) => (
              <div key={group.id} className="mb-4">
                {!collapsed && (
                  <p className="px-4 mb-1 text-xs font-medium uppercase tracking-wider text-text-tertiary">
                    {group.label}
                  </p>
                )}
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          title={collapsed ? item.label : undefined}
                          className={`
                            flex items-center gap-2 px-3 mx-2 py-1.5 text-sm rounded transition-colors
                            ${collapsed ? 'justify-center mx-2' : ''}
                            ${active
                              ? 'font-medium text-text bg-accent-soft'
                              : 'text-text-secondary hover:text-text hover:bg-surface-hover'}
                          `}
                          aria-current={active ? 'page' : undefined}
                        >
                          <Icon name={item.icon} className="w-4 h-4 shrink-0" />
                          {!collapsed && <span className="truncate">{item.label}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* 折叠按钮 */}
          <div className="hidden md:flex items-center justify-end p-2 border-t border-border">
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label={collapsed ? '展开侧边栏' : '折叠侧边栏'}
              className="inline-flex items-center justify-center w-8 h-8 rounded text-text-secondary hover:text-text hover:bg-surface-hover transition-colors"
            >
              {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </aside>

      {/* 移动端关闭按钮（侧边栏内） */}
      {mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="关闭导航菜单"
          className="fixed top-4 right-4 z-50 md:hidden inline-flex items-center justify-center w-8 h-8 rounded text-text-secondary hover:text-text"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      )}
    </>
  );
}