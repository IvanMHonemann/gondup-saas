import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Promotores from './pages/Promotores';
import Visitas from './pages/Visitas';
import Relatorios from './pages/Relatorios';
import Configuracoes from './pages/Configuracoes';
import LoginPage from './pages/LoginPage';

export type Page = 'dashboard' | 'promotores' | 'visitas' | 'relatorios' | 'configuracoes';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'promotores':
        return <Promotores />;
      case 'visitas':
        return <Visitas />;
      case 'relatorios':
        return <Relatorios />;
      case 'configuracoes':
        return <Configuracoes />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-full bg-slate-100">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onLogout={() => setIsLoggedIn(false)}
      />
      <main
        className="flex-1 overflow-auto transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '16rem' : '4rem' }}
      >
        <div className="animate-fadeIn">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
