import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  PieChart,
  Target
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const performanceByRegion = [
  { region: 'Zona Sul', visitas: 320, meta: 350 },
  { region: 'Zona Norte', visitas: 280, meta: 300 },
  { region: 'Zona Leste', visitas: 250, meta: 280 },
  { region: 'Zona Oeste', visitas: 310, meta: 300 },
  { region: 'Centro', visitas: 180, meta: 200 },
];

const dailyTrend = [
  { date: '01/06', concluidas: 42, planejadas: 50 },
  { date: '05/06', concluidas: 48, planejadas: 52 },
  { date: '10/06', concluidas: 55, planejadas: 58 },
  { date: '15/06', concluidas: 50, planejadas: 55 },
  { date: '20/06', concluidas: 62, planejadas: 65 },
  { date: '25/06', concluidas: 58, planejadas: 60 },
  { date: '30/06', concluidas: 65, planejadas: 68 },
];

const visitTypes = [
  { name: 'Reposição', value: 45, color: '#8b5cf6' },
  { name: 'Merchandising', value: 30, color: '#06b6d4' },
  { name: 'Auditoria', value: 15, color: '#f59e0b' },
  { name: 'Pesquisa', value: 10, color: '#ec4899' },
];

const monthlyGoals = [
  { month: 'Jan', achieved: 85, target: 100 },
  { month: 'Fev', achieved: 92, target: 100 },
  { month: 'Mar', achieved: 88, target: 100 },
  { month: 'Abr', achieved: 95, target: 100 },
  { month: 'Mai', achieved: 91, target: 100 },
  { month: 'Jun', achieved: 97, target: 100 },
];

const summaryCards = [
  { label: 'Taxa de Conclusão', value: '94.2%', change: '+2.1%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Visitas/Mês', value: '1.247', change: '+8.5%', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Tempo Médio', value: '23min', change: '-3min', icon: Calendar, color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Satisfação', value: '4.6/5', change: '+0.2', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
];

export default function Relatorios() {
  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Relatórios</h1>
          <p className="text-slate-500 mt-1">Análise de desempenho e métricas</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>Junho 2025</option>
            <option>Maio 2025</option>
            <option>Abril 2025</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm animate-slideUp"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${card.bg}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{card.value}</p>
              <p className="text-sm text-slate-500 mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by Region */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm animate-slideUp" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Performance por Região</h3>
              <p className="text-sm text-slate-500">Visitas realizadas vs Meta</p>
            </div>
            <BarChart3 className="w-5 h-5 text-primary-500" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={performanceByRegion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="region" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="visitas" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Realizadas" />
              <Bar dataKey="meta" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Meta" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Visit Types Pie */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm animate-slideUp" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Tipos de Visita</h3>
              <p className="text-sm text-slate-500">Distribuição por categoria</p>
            </div>
            <PieChart className="w-5 h-5 text-violet-500" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RePieChart>
              <Pie
                data={visitTypes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {visitTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Legend />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Trend */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm animate-slideUp" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Tendência Diária</h3>
              <p className="text-sm text-slate-500">Junho 2025</p>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Line type="monotone" dataKey="planejadas" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" name="Planejadas" />
              <Line type="monotone" dataKey="concluidas" stroke="#22c55e" strokeWidth={2} name="Concluídas" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Goals */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm animate-slideUp" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Metas Mensais</h3>
              <p className="text-sm text-slate-500">% atingido por mês</p>
            </div>
            <Target className="w-5 h-5 text-amber-500" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyGoals}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="achieved" fill="#3b82f6" radius={[4, 4, 0, 0]} name="% Atingido" />
              <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Meta" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
