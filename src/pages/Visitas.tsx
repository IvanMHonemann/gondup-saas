import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Navigation,
  Calendar,
  Filter,
  Search,
  ChevronDown
} from 'lucide-react';

interface Visita {
  id: number;
  promotor: string;
  store: string;
  address: string;
  scheduledTime: string;
  completedTime?: string;
  status: 'pendente' | 'em_andamento' | 'concluida' | 'cancelada' | 'atrasada';
  type: string;
  notes?: string;
}

const visitas: Visita[] = [
  { id: 1, promotor: 'Carlos Silva', store: 'Supermercado Central', address: 'Av. Paulista, 1000 - SP', scheduledTime: '08:00', completedTime: '08:15', status: 'concluida', type: 'Reposição', notes: 'Estoque regularizado' },
  { id: 2, promotor: 'Carlos Silva', store: 'Loja Express', address: 'Rua Augusta, 500 - SP', scheduledTime: '09:30', completedTime: '09:45', status: 'concluida', type: 'Merchandising' },
  { id: 3, promotor: 'Carlos Silva', store: 'Mega Store', address: 'Rua Oscar Freire, 200 - SP', scheduledTime: '11:00', status: 'em_andamento', type: 'Auditoria' },
  { id: 4, promotor: 'Ana Oliveira', store: 'Pão de Açúcar', address: 'Av. Brasil, 300 - RJ', scheduledTime: '08:30', completedTime: '08:40', status: 'concluida', type: 'Reposição' },
  { id: 5, promotor: 'Ana Oliveira', store: 'Extra Hiper', address: 'Rua XV de Nov, 150 - RJ', scheduledTime: '10:00', status: 'atrasada', type: 'Merchandising' },
  { id: 6, promotor: 'Ana Oliveira', store: 'Carrefour', address: 'Av. Atlântica, 800 - RJ', scheduledTime: '11:30', status: 'pendente', type: 'Pesquisa' },
  { id: 7, promotor: 'Pedro Santos', store: 'Assaí Atacadista', address: 'Rua do Comércio, 50 - BH', scheduledTime: '09:00', completedTime: '09:20', status: 'concluida', type: 'Reposição' },
  { id: 8, promotor: 'Pedro Santos', store: 'Atacarejo', address: 'Av. Afonso Pena, 200 - BH', scheduledTime: '10:30', status: 'pendente', type: 'Auditoria' },
  { id: 9, promotor: 'Maria Costa', store: 'Drogaria Raia', address: 'Rua Teodoro Sampaio, 100 - SP', scheduledTime: '13:00', status: 'pendente', type: 'Merchandising' },
  { id: 10, promotor: 'Maria Costa', store: 'Farmácia São João', address: 'Av. Interlagos, 400 - SP', scheduledTime: '14:30', status: 'cancelada', type: 'Reposição', notes: 'Loja fechada para reforma' },
  { id: 11, promotor: 'Fernanda Rocha', store: 'MMX Mart', address: 'Rua da Consolação, 700 - SP', scheduledTime: '08:00', completedTime: '08:10', status: 'concluida', type: 'Reposição' },
  { id: 12, promotor: 'Fernanda Rocha', store: 'Hiper Bom', address: 'Av. Tiradentes, 300 - SP', scheduledTime: '09:30', status: 'em_andamento', type: 'Pesquisa' },
];

const statusConfig = {
  pendente: { label: 'Pendente', color: 'bg-slate-100 text-slate-600', icon: Clock },
  em_andamento: { label: 'Em Andamento', color: 'bg-blue-100 text-blue-700', icon: Navigation },
  concluida: { label: 'Concluída', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  cancelada: { label: 'Cancelada', color: 'bg-red-100 text-red-700', icon: XCircle },
  atrasada: { label: 'Atrasada', color: 'bg-amber-100 text-amber-700', icon: AlertCircle },
};

const typeColors: Record<string, string> = {
  'Reposição': 'bg-violet-100 text-violet-700',
  'Merchandising': 'bg-cyan-100 text-cyan-700',
  'Auditoria': 'bg-orange-100 text-orange-700',
  'Pesquisa': 'bg-pink-100 text-pink-700',
};

export default function Visitas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterPromotor, setFilterPromotor] = useState('todos');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const promotores = [...new Set(visitas.map(v => v.promotor))];

  const filtered = visitas.filter((v) => {
    const matchesSearch = v.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.promotor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || v.status === filterStatus;
    const matchesPromotor = filterPromotor === 'todos' || v.promotor === filterPromotor;
    return matchesSearch && matchesStatus && matchesPromotor;
  });

  const stats = {
    total: visitas.length,
    concluidas: visitas.filter(v => v.status === 'concluida').length,
    pendentes: visitas.filter(v => v.status === 'pendente').length,
    atrasadas: visitas.filter(v => v.status === 'atrasada').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Visitas</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500">Total</p>
          <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500">Concluídas</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.concluidas}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500">Pendentes</p>
          <p className="text-2xl font-bold text-slate-600">{stats.pendentes}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-sm text-slate-500">Atrasadas</p>
          <p className="text-2xl font-bold text-amber-600">{stats.atrasadas}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por loja ou promotor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="todos">Todos os status</option>
          <option value="pendente">Pendentes</option>
          <option value="em_andamento">Em Andamento</option>
          <option value="concluida">Concluídas</option>
          <option value="atrasada">Atrasadas</option>
          <option value="cancelada">Canceladas</option>
        </select>
        <select
          value={filterPromotor}
          onChange={(e) => setFilterPromotor(e.target.value)}
          className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="todos">Todos os promotores</option>
          {promotores.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Visit List */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map((visita, index) => {
            const statusInfo = statusConfig[visita.status];
            const StatusIcon = statusInfo.icon;
            const isExpanded = expandedId === visita.id;

            return (
              <motion.div
                key={visita.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : visita.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left"
                >
                  {/* Time */}
                  <div className="text-center min-w-[50px]">
                    <p className="text-sm font-bold text-slate-800">{visita.scheduledTime}</p>
                    {visita.completedTime && (
                      <p className="text-xs text-emerald-600">{visita.completedTime}</p>
                    )}
                  </div>

                  {/* Status indicator */}
                  <div className={`p-2 rounded-lg ${statusInfo.color}`}>
                    <StatusIcon className="w-4 h-4" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate">{visita.store}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {visita.address}
                    </p>
                  </div>

                  {/* Promotor & Type */}
                  <div className="hidden md:flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColors[visita.type]}`}>
                      {visita.type}
                    </span>
                    <span className="text-sm text-slate-600">{visita.promotor}</span>
                  </div>

                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-4 pb-4 ml-[114px]"
                  >
                    <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColors[visita.type]}`}>
                          {visita.type}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600"><strong>Promotor:</strong> {visita.promotor}</p>
                      <p className="text-sm text-slate-600"><strong>Endereço:</strong> {visita.address}</p>
                      {visita.notes && (
                        <p className="text-sm text-slate-600"><strong>Observações:</strong> {visita.notes}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
