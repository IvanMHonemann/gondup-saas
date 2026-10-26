import {
  LayoutDashboard,
  Users,
  MapPin,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const menuItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'promotores', label: 'Promotores', icon: Users },
  { id: 'visitas', label: 'Visitas', icon: MapPin },
  { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
];

export default function Sidebar({ currentPage, onNavigate, isOpen, onToggle, onLogout }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    if (isMobile) setMobileOpen(false);
  };

  // Mobile view
  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 h-14 bg-slate-900 flex items-center justify-between px-4 z-40 shadow-lg">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-slate-700 text-white transition-colors"
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">Promotores</span>
          </div>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>

        {/* Mobile Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
            onClick={() => setMobileOpen(false)}
            style={{ top: '3.5rem' }}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`fixed top-14 left-0 h-[calc(100%-3.5rem)] bg-gradient-to-b from-slate-900 to-slate-800 text-white z-50 flex flex-col shadow-xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ width: '16rem' }}
        >
          <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="p-2 border-t border-slate-700">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-all"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">Sair</span>
            </button>
          </div>
        </aside>
      </>
    );
  }

  // Desktop view
  return (
    <aside
      className="fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white z-50 flex flex-col shadow-xl transition-all duration-300"
      style={{ width: isOpen ? '16rem' : '4rem' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {isOpen && (
          <div className="flex items-center gap-2 animate-fadeIn">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">Promotores</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-slate-700 transition-colors"
          aria-label={isOpen ? 'Recolher menu' : 'Expandir menu'}
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
              title={!isOpen ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-all"
          title={!isOpen ? 'Sair' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">Sair</span>}
        </button>
      </div>
    </aside>
  );
}
