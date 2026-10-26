import { useState, useEffect, useRef } from 'react';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Star,
  Edit2,
  Trash2,
  X,
  UserCheck,
  UserX,
  AlertTriangle,
  Check
} from 'lucide-react';

interface Promotor {
  id: number;
  name: string;
  email: string;
  phone: string;
  region: string;
  status: 'ativo' | 'inativo' | 'ferias';
  visits: number;
  rating: number;
  avatar: string;
  joinDate: string;
}

const initialPromotores: Promotor[] = [
  { id: 1, name: 'Carlos Silva', email: 'carlos@email.com', phone: '(11) 99999-1234', region: 'Zona Sul - SP', status: 'ativo', visits: 156, rating: 4.8, avatar: 'CS', joinDate: '2023-03-15' },
  { id: 2, name: 'Ana Oliveira', email: 'ana@email.com', phone: '(11) 98888-5678', region: 'Zona Norte - SP', status: 'ativo', visits: 142, rating: 4.6, avatar: 'AO', joinDate: '2023-05-20' },
  { id: 3, name: 'Pedro Santos', email: 'pedro@email.com', phone: '(21) 97777-9012', region: 'Centro - RJ', status: 'ativo', visits: 125, rating: 4.4, avatar: 'PS', joinDate: '2023-07-10' },
  { id: 4, name: 'Maria Costa', email: 'maria@email.com', phone: '(11) 96666-3456', region: 'Zona Oeste - SP', status: 'ativo', visits: 138, rating: 4.7, avatar: 'MC', joinDate: '2023-01-08' },
  { id: 5, name: 'João Lima', email: 'joao@email.com', phone: '(31) 95555-7890', region: 'Leste - BH', status: 'ferias', visits: 98, rating: 4.2, avatar: 'JL', joinDate: '2023-09-01' },
  { id: 6, name: 'Fernanda Rocha', email: 'fernanda@email.com', phone: '(11) 94444-1122', region: 'Zona Leste - SP', status: 'ativo', visits: 110, rating: 4.5, avatar: 'FR', joinDate: '2023-11-15' },
  { id: 7, name: 'Roberto Alves', email: 'roberto@email.com', phone: '(21) 93333-3344', region: 'Barra - RJ', status: 'inativo', visits: 67, rating: 3.8, avatar: 'RA', joinDate: '2024-01-10' },
  { id: 8, name: 'Luciana Mendes', email: 'luciana@email.com', phone: '(41) 92222-5566', region: 'Centro - CWB', status: 'ativo', visits: 134, rating: 4.6, avatar: 'LM', joinDate: '2023-06-20' },
];

const statusConfig = {
  ativo: { label: 'Ativo', color: 'bg-emerald-100 text-emerald-700', icon: UserCheck },
  inativo: { label: 'Inativo', color: 'bg-red-100 text-red-700', icon: UserX },
  ferias: { label: 'Férias', color: 'bg-amber-100 text-amber-700', icon: Star },
};

export default function Promotores() {
  const [promotores, setPromotores] = useState<Promotor[]>(initialPromotores);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [editingPromotor, setEditingPromotor] = useState<Promotor | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    if (openMenuId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filtered = promotores.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'todos' || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: number) => {
    setPromotores(promotores.filter(p => p.id !== id));
    setShowDeleteConfirm(null);
    setOpenMenuId(null);
    setToast({ message: 'Promotor excluído com sucesso', type: 'success' });
  };

  const handleEdit = (promotor: Promotor) => {
    setEditingPromotor(promotor);
    setFormData({
      name: promotor.name,
      email: promotor.email,
      phone: promotor.phone,
      region: promotor.region,
    });
    setShowModal(true);
    setOpenMenuId(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.region) {
      setToast({ message: 'Preencha todos os campos obrigatórios', type: 'error' });
      return;
    }

    if (editingPromotor) {
      // Update existing
      setPromotores(promotores.map(p =>
        p.id === editingPromotor.id
          ? { ...p, name: formData.name, email: formData.email, phone: formData.phone, region: formData.region }
          : p
      ));
      setToast({ message: 'Promotor atualizado com sucesso', type: 'success' });
    } else {
      // Create new
      const newPromotor: Promotor = {
        id: Math.max(...promotores.map(p => p.id)) + 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        region: formData.region,
        status: 'ativo',
        visits: 0,
        rating: 0,
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        joinDate: new Date().toISOString().split('T')[0],
      };
      setPromotores([...promotores, newPromotor]);
      setToast({ message: 'Promotor cadastrado com sucesso', type: 'success' });
    }

    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPromotor(null);
    setFormData({ name: '', email: '', phone: '', region: '' });
  };

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg animate-slideUp ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Promotores</h1>
          <p className="text-slate-500 mt-1">{promotores.length} promotores cadastrados</p>
        </div>
        <button
          onClick={() => { setEditingPromotor(null); setFormData({ name: '', email: '', phone: '', region: '' }); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Promotor
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome, região ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="todos">Todos os status</option>
            <option value="ativo">Ativos</option>
            <option value="inativo">Inativos</option>
            <option value="ferias">Férias</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-slate-100 shadow-sm text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700">Nenhum promotor encontrado</h3>
          <p className="text-sm text-slate-500 mt-1">Tente ajustar os filtros ou cadastre um novo promotor.</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((promotor, index) => {
          const statusInfo = statusConfig[promotor.status];
          return (
            <div
              key={promotor.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all group animate-slideUp"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                    {promotor.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{promotor.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {promotor.region}
                    </p>
                  </div>
                </div>
                <div className="relative" ref={openMenuId === promotor.id ? menuRef : null}>
                  <button
                    onClick={() => setOpenMenuId(openMenuId === promotor.id ? null : promotor.id)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Menu de ações"
                  >
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                  {openMenuId === promotor.id && (
                    <div className="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10 animate-scaleIn">
                      <button
                        onClick={() => handleEdit(promotor)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Editar
                      </button>
                      <button
                        onClick={() => { setShowDeleteConfirm(promotor.id); setOpenMenuId(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Excluir
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
                <div className="flex items-center gap-0.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-medium text-slate-600">{promotor.rating}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">{promotor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{promotor.phone}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">{promotor.visits} visitas realizadas</span>
                <span className="text-xs text-slate-400">Desde {new Date(promotor.joinDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Novo/Edit Promotor */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl animate-scaleIn"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                {editingPromotor ? 'Editar Promotor' : 'Novo Promotor'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Nome do promotor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Região *</label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Ex: Zona Sul - SP"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-mail *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
                >
                  {editingPromotor ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm !== null && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setShowDeleteConfirm(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl animate-scaleIn text-center"
          >
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Confirmar exclusão</h3>
            <p className="text-sm text-slate-500 mb-6">
              Tem certeza que deseja excluir este promotor? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
