import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Save,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

type Tab = 'perfil' | 'notificacoes' | 'seguranca' | 'aparencia' | 'sistema';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'perfil', label: 'Perfil', icon: User },
  { id: 'notificacoes', label: 'Notificações', icon: Bell },
  { id: 'seguranca', label: 'Segurança', icon: Shield },
  { id: 'aparencia', label: 'Aparência', icon: Palette },
  { id: 'sistema', label: 'Sistema', icon: Database },
];

interface ToggleSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState<Tab>('perfil');
  const [notifications, setNotifications] = useState<ToggleSetting[]>([
    { id: 'email', label: 'Notificações por e-mail', description: 'Receber resumos diários por e-mail', enabled: true },
    { id: 'push', label: 'Notificações push', description: 'Alertas em tempo real no navegador', enabled: true },
    { id: 'visitas', label: 'Alertas de visita', description: 'Notificar quando promotor concluir visita', enabled: true },
    { id: 'atrasos', label: 'Alertas de atraso', description: 'Notificar quando rota estiver atrasada', enabled: false },
    { id: 'relatorios', label: 'Relatórios semanais', description: 'Receber relatório consolidado toda segunda', enabled: true },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, enabled: !n.enabled } : n
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'perfil':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                AD
              </div>
              <div>
                <button className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors">
                  Alterar foto
                </button>
                <p className="text-xs text-slate-500 mt-1">JPG, PNG ou GIF. Máximo 2MB.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo</label>
                <input type="text" defaultValue="Administrador" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                <input type="email" defaultValue="admin@promotores.com" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                <input type="tel" defaultValue="(11) 99999-0000" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cargo</label>
                <input type="text" defaultValue="Gerente de Operações" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Empresa</label>
                <input type="text" defaultValue="Promotores SaaS LTDA" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
          </div>
        );

      case 'notificacoes':
        return (
          <div className="space-y-4">
            {notifications.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(item.id)}
                  className="flex-shrink-0"
                >
                  {item.enabled ? (
                    <ToggleRight className="w-10 h-10 text-primary-500" />
                  ) : (
                    <ToggleLeft className="w-10 h-10 text-slate-300" />
                  )}
                </button>
              </div>
            ))}
          </div>
        );

      case 'seguranca':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Alterar Senha</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Senha atual</label>
                  <input type="password" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nova senha</label>
                  <input type="password" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar nova senha</label>
                  <input type="password" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="••••••••" />
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Autenticação em dois fatores</h3>
              <p className="text-sm text-slate-500 mb-4">Adicione uma camada extra de segurança à sua conta.</p>
              <button className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">
                Ativar 2FA
              </button>
            </div>
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Sessões ativas</h3>
              <p className="text-sm text-slate-500 mb-4">Gerencie seus dispositivos conectados.</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Chrome - Windows</p>
                    <p className="text-xs text-slate-500">São Paulo, BR • Agora</p>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Atual</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Safari - iPhone</p>
                    <p className="text-xs text-slate-500">São Paulo, BR • 2h atrás</p>
                  </div>
                  <button className="text-xs text-red-600 hover:underline">Encerrar</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'aparencia':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Tema</h3>
              <div className="grid grid-cols-3 gap-4">
                <button className="p-4 border-2 border-primary-500 rounded-xl bg-white text-center">
                  <div className="w-full h-16 bg-white border border-slate-200 rounded-lg mb-2" />
                  <span className="text-sm font-medium text-slate-700">Claro</span>
                </button>
                <button className="p-4 border-2 border-slate-200 rounded-xl bg-white text-center hover:border-slate-300 transition-colors">
                  <div className="w-full h-16 bg-slate-800 rounded-lg mb-2" />
                  <span className="text-sm font-medium text-slate-700">Escuro</span>
                </button>
                <button className="p-4 border-2 border-slate-200 rounded-xl bg-white text-center hover:border-slate-300 transition-colors">
                  <div className="w-full h-16 bg-gradient-to-b from-white to-slate-800 rounded-lg mb-2" />
                  <span className="text-sm font-medium text-slate-700">Auto</span>
                </button>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Idioma</h3>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-slate-400" />
                <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Português (Brasil)</option>
                  <option>English</option>
                  <option>Español</option>
                </select>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Densidade</h3>
              <div className="flex gap-3">
                <button className="px-4 py-2 border-2 border-primary-500 text-primary-600 text-sm font-medium rounded-lg">
                  Confortável
                </button>
                <button className="px-4 py-2 border-2 border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:border-slate-300">
                  Compacto
                </button>
              </div>
            </div>
          </div>
        );

      case 'sistema':
        return (
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Informações do Sistema</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Versão</p>
                  <p className="font-medium text-slate-800">2.4.1</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Plano</p>
                  <p className="font-medium text-slate-800">Enterprise</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Última atualização</p>
                  <p className="font-medium text-slate-800">15/06/2025</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Licença válida até</p>
                  <p className="font-medium text-slate-800">15/06/2026</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Dados e Armazenamento</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-700">Armazenamento utilizado</p>
                    <p className="text-sm text-slate-500">2.4 GB de 10 GB</p>
                  </div>
                  <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="w-[24%] h-full bg-primary-500 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-700">Promotores cadastrados</p>
                    <p className="text-sm text-slate-500">47 de 100 (plano)</p>
                  </div>
                  <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="w-[47%] h-full bg-violet-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Integrações</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Database className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">API de Roteirização</p>
                      <p className="text-xs text-slate-500">Conectado</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Ativo</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Database className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Google Maps</p>
                      <p className="text-xs text-slate-500">Conectado</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Ativo</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Configurações</h1>
        <p className="text-slate-500 mt-1">Gerencie suas preferências e configurações</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-2 flex lg:flex-col gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 bg-white rounded-xl border border-slate-100 shadow-sm p-6"
        >
          {renderContent()}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg shadow-sm transition-colors">
              <Save className="w-4 h-4" />
              Salvar alterações
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
