import {
  Users,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const statsData = [
  { label: 'Promotores Ativos', value: '47', change: '+3', trend: 'up', icon: Users, color: 'bg-blue-500' },
  { label: 'Visitas Hoje', value: '128', change: '+12%', trend: 'up', icon: MapPin, color: 'bg-emerald-500' },
  { label: 'Visitas Concluídas', value: '96', change: '+8%', trend: 'up', icon: CheckCircle2, color: 'bg-violet-500' },
  { label: 'Pendências', value: '12', change: '-5', trend: 'down', icon: AlertTriangle, color: 'bg-amber-500' },
];

const weeklyVisits = [
  { day: 'Seg', visitas: 45, concluidas: 40 },
  { day: 'Ter', visitas: 52, concluidas: 48 },
  { day: 'Qua', visitas: 38, concluidas: 35 },
  { day: 'Qui', visitas: 65, concluidas: 60 },
  { day: 'Sex', visitas: 58, concluidas: 52 },
  { day: 'Sáb', visitas: 30, concluidas: 28 },
  { day: 'Dom', visitas: 15, concluidas: 14 },
];

const monthlyPerformance = [
  { month: 'Jan', performance: 72 },
  { month: 'Fev', performance: 78 },
  { month: 'Mar', performance: 85 },
  { month: 'Abr', performance: 82 },
  { month: 'Mai', performance: 90 },
  { month: 'Jun', performance: 88 },
];

const recentActivities = [
  { id: 1, promotor: 'Carlos Silva', action: 'Concluiu visita', store: 'Supermercado Central', time: '5 min atrás', status: 'success' },
  { id: 2, promotor: 'Ana Oliveira', action: 'Check-in realizado', store: 'Loja Express', time: '12 min atrás', status: 'info' },
  { id: 3, promotor: 'Pedro Santos', action: 'Rota iniciada', store: '8 pontos previstos', time: '25 min atrás', status: 'info' },
  { id: 4, promotor: 'Maria Costa', action: 'Relatório enviado', store: 'Região Norte', time: '1h atrás', status: 'success' },
  { id: 5, promotor: 'João Lima', action: 'Atraso na rota', store: 'Ponto 3 de 6', time: '1h30 atrás', status: 'warning' },
];

const topPromotores = [
  { name: 'Carlos Silva', visits: 156, rate: 98, avatar: 'CS' },
  { name: 'Ana Oliveira', visits: 142, rate: 95, avatar: 'AO' },
  { name: 'Maria Costa', visits: 138, rate: 93, avatar: 'MC' },
  { name: 'Pedro Santos', visits: 125, rate: 91, avatar: 'PS' },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Este mês</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow animate-slideUp"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-2.5 rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-emerald-500" />
                )}
                <span className="text-sm font-medium text-emerald-600">{stat.change}</span>
                <span className="text-sm text-slate-400">vs. semana anterior</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Visits Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 animate-slideUp" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Visitas da Semana</h3>
              <p className="text-sm text-slate-500">Planejadas vs Concluídas</p>
            </div>
            <TrendingUp className="w-5 h-5 text-primary-500" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyVisits}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="visitas" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Planejadas" />
              <Bar dataKey="concluidas" fill="#22c55e" radius={[4, 4, 0, 0]} name="Concluídas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 animate-slideUp" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Performance Mensal</h3>
              <p className="text-sm text-slate-500">Taxa de conclusão (%)</p>
            </div>
            <Clock className="w-5 h-5 text-violet-500" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} domain={[60, 100]} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Area
                type="monotone"
                dataKey="performance"
                stroke="#8b5cf6"
                fill="url(#purpleGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-100 animate-slideUp" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Atividades Recentes</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-emerald-500' :
                  activity.status === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700">{activity.promotor}</p>
                  <p className="text-xs text-slate-500 truncate">{activity.action} • {activity.store}</p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Promotores */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 animate-slideUp" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Promotores</h3>
          <div className="space-y-4">
            {topPromotores.map((promotor, index) => (
              <div key={promotor.name} className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-400 w-5">#{index + 1}</span>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                  {promotor.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{promotor.name}</p>
                  <p className="text-xs text-slate-500">{promotor.visits} visitas</p>
                </div>
                <span className="text-sm font-semibold text-emerald-600">{promotor.rate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
